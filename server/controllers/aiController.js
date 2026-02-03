import { genAI } from "../configs/gemini.js";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

/* ---------------- ARTICLE ---------------- */
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(402).json({
        success: false,
        message: "Free limit reached. Upgrade to continue."
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro"
    });

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 }
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Article generation failed"
    });
  }
};

/* ---------------- BLOG TITLES ---------------- */
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(402).json({
        success: false,
        message: "Free limit reached"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro"
    });

    const result = await model.generateContent(
      `Generate 5 blog titles for: ${prompt}`
    );

    const content = result.response.text();

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 }
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Blog title generation failed"
    });
  }
};

/* ---------------- IMAGE GENERATION ---------------- */
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Premium only feature"
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Image generation failed"
    });
  }
};

/* ---------------- REMOVE IMAGE BACKGROUND ---------------- */
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Premium only feature"
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [{ effect: "background_removal" }]
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Background removed', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Background removal failed"
    });
  }
};

/* ---------------- REMOVE IMAGE OBJECT ---------------- */
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Premium only feature"
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }]
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed ${object}`}, ${imageUrl}, 'image')
    `;

    res.json({ success: true, content: imageUrl });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Object removal failed"
    });
  }
};

/* ---------------- RESUME REVIEW ---------------- */
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Premium only feature"
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const model = genAI.getGenerativeModel({
      model: "gemini-pro"
    });

    const result = await model.generateContent(
      `Review this resume:\n\n${pdfData.text}`
    );

    const content = result.response.text();

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
    `;

    res.json({ success: true, content });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Resume review failed"
    });
  }
};
