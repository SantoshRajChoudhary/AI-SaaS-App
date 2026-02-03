import { Sparkles, Image, Download } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function GenerateImages() {
  const imageStyles = [
    "Realistic Style",
    "Ghibli Style",
    "Anime Style",
    "Cartoon Style",
    "Fantasy Style",
    "3D Style",
    "Portrait Style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic Style");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Generate an image of ${input} in ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setContent(data.content);
        setDownloadUrl(data.downloadUrl);
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
        <title>AI Image Generator Tool | OneSolution.ai</title>
        <meta
          name="description"
          content="Generate stunning images using our AI Image Generator. Choose styles like anime, realistic, cartoon, or 3D and download images instantly."
        />
      </Helmet>

      <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-5 items-start text-slate-700 transition-all duration-500 ease-in-out">

        {/* Left column */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-5 bg-white border border-gray-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#01ad26]" />
            {/* ✅ SINGLE H1 */}
            <h1 className="text-xl font-semibold">AI Image Generator</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Describe Your Image</p>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className="w-full border border-gray-200 p-2 rounded-md mt-2 text-sm outline-none"
            placeholder="Describe what you want to see in the image..."
            required
          />

          <p className="mt-6 text-sm font-medium">Style</p>
          <div className="mt-2 text-xs flex flex-wrap gap-3">
            {imageStyles.map((item, index) => (
              <span
                onClick={() => setSelectedStyle(item)}
                key={index}
                className={`text-xs border rounded-full md:px-7 md:py-2 px-4 py-2 cursor-pointer ${
                  selectedStyle === item
                    ? "bg-green-50 text-green-700 border-green-300"
                    : "text-gray-500 border-gray-300"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className="w-9 h-5 rounded-full bg-slate-300 peer-checked:bg-green-500 transition"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
            </label>
            <p className="text-sm">Make this image public</p>
          </div>

          <button
            disabled={loading}
            className="mt-6 flex gap-3 w-full bg-gradient-to-r from-[#01ad26] to-[#00ff51] rounded-lg p-2 justify-center items-center text-white cursor-pointer text-sm"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5" />
            )}
            <p>Generate Image</p>
          </button>
        </form>

        {/* Right column */}
        <div className="w-full max-w-xl border z-50 border-gray-200 rounded-lg bg-white p-5 min-h-96 max-h-[600px] flex flex-col">
          <div className="flex items-center gap-1">
            <Image className="w-5 h-5 text-[#01ad26]" />
            {/* 🔄 H1 → H2 */}
            <h2 className="text-xl font-semibold">Generated Image</h2>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Image className="w-10 h-10" />
                <p>
                  Describe an image and click "Generate Image" to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="relative mt-3 h-full">
              <a
                href={downloadUrl}
                download
                className="absolute top-2 right-2 bg-white border rounded px-2 py-1 text-xs shadow hover:bg-gray-100"
              >
                <Download className="w-3 h-4" />
              </a>

              {/* ✅ SEO-friendly ALT */}
              <img
                src={content}
                alt="AI generated image preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GenerateImages;
