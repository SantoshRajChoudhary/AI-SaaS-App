import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const user = await clerkClient.users.getUser(userId);

    // Read metadata safely
    const plan = user.privateMetadata?.plan || "free";
    const free_usage = user.privateMetadata?.free_usage || 0;

    // Attach to request
    req.plan = plan;
    req.free_usage = free_usage;

    next();

  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Authentication failed"
    });
  }
};
