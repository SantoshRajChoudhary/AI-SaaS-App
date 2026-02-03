import { Sparkles, Hash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { Helmet } from "react-helmet-async";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function BlogTitles() {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}. Do it within 200 tokens`;
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      {/* ✅ SEO METADATA */}
      <Helmet>
        <title>AI Blog Title Generator | OneSolution.ai</title>
        <meta
          name="description"
          content="Generate catchy, SEO-friendly blog titles using our AI Blog Title Generator. Get headline ideas for technology, business, health, travel, and more."
        />
      </Helmet>

      <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-5 items-start text-slate-700 transition-all duration-500 ease-in-out">

        {/* Left column */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-5 bg-white border border-gray-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#8d38eb]" />
            {/* ✅ SINGLE H1 */}
            <h1 className="text-xl font-semibold">
              AI Blog Title Generator
            </h1>
          </div>

          <p className="mt-6 text-sm font-medium">Keyword</p>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full border border-gray-200 p-2 rounded-md mt-2 text-sm outline-none"
            placeholder="The future of artificial intelligence..."
            required
          />

          <p className="mt-6 text-sm font-medium">Category</p>
          <div className="mt-2 text-xs flex flex-wrap gap-3">
            {blogCategories.map((item, index) => (
              <span
                onClick={() => setSelectedCategory(item)}
                key={index}
                className={`text-xs border rounded-full md:px-7 md:py-2 px-4 py-2 cursor-pointer ${
                  selectedCategory === item
                    ? "bg-purple-50 text-purple-700 border-purple-300"
                    : "text-gray-500 border-gray-300"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className="mt-6 flex gap-3 w-full bg-gradient-to-r from-[#d270f8] to-[#8e36eb] rounded-lg p-2 justify-center items-center text-white cursor-pointer text-sm"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Hash className="w-5" />
            )}
            <p>Generate Title</p>
          </button>
        </form>

        {/* Right column */}
        <div className="w-full max-w-xl border border-gray-200 rounded-lg bg-white p-5 min-h-96 max-h-[600px] flex flex-col">
          <div className="flex items-center gap-1">
            <Hash className="w-5 h-5 text-[#8d38eb]" />
            {/* 🔄 H1 → H2 */}
            <h2 className="text-xl font-semibold">
              Generated Titles
            </h2>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Hash className="w-10 h-10" />
                <p>
                  Enter keywords and click "Generate Title" to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogTitles;
