import { Sparkles, Edit } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { Helmet } from "react-helmet-async";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function WriteArticle() {

  const articlelength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articlelength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
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
        <title>AI Article Writer Tool | OneSolution.ai</title>
        <meta
          name="description"
          content="Write high-quality, SEO-optimized articles using our AI Article Writer. Generate short, medium, or long articles instantly with OneSolution.ai."
        />
      </Helmet>

      <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-5 items-start text-slate-700 transition-all duration-500 ease-in-out">

        {/* Left column */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-5 bg-white border border-gray-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#4A7AFF]" />
            {/* ✅ ONE H1 */}
            <h1 className="text-xl font-semibold">AI Article Writer</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Article Topic</p>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full border border-gray-200 p-2 rounded-md mt-2 text-sm outline-none"
            placeholder="The future of artificial intelligence..."
            required
          />

          <p className="mt-6 text-sm font-medium">Article Length</p>
          <div className="mt-2 text-xs flex flex-wrap gap-3">
            {articlelength.map((item, index) => (
              <span
                onClick={() => setSelectedLength(item)}
                key={index}
                className={`text-xs border rounded-full px-3 py-2 cursor-pointer ${
                  selectedLength.text === item.text
                    ? "bg-blue-50 text-blue-700 border-blue-300"
                    : "text-gray-500 border-gray-300"
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className="mt-6 flex gap-3 w-full bg-gradient-to-r from-[#226BFF] to-[#65ADFF] rounded-lg p-2 justify-center items-center text-white cursor-pointer text-sm"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Edit className="w-5" />
            )}
            <p>Generate article</p>
          </button>
        </form>

        {/* Right column */}
        <div className="w-full max-w-xl border border-gray-200 rounded-lg bg-white p-5 min-h-96 max-h-[600px] flex flex-col">
          <div className="flex items-center gap-1">
            <Edit className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Generated Article</h2>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Edit className="w-10 h-10" />
                <p>Enter a topic and click "Generate article" to get started</p>
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

export default WriteArticle;
