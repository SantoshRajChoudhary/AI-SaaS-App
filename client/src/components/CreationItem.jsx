import { useState } from "react";
import Markdown from "react-markdown";

function CreationItem({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="p-4 max-w-5xl border border-gray-300 rounded-lg bg-white text-sm cursor-pointer max-h-100 overflow-auto"
      aria-labelledby={`creation-${item.id}`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left focus:outline-none"
        aria-expanded={expanded}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            {/* ✅ Proper heading */}
            <h2
              id={`creation-${item.id}`}
              className="font-medium text-slate-800"
            >
              {item.prompt}
            </h2>

            <p className="text-gray-400">
              {item.type} ·{" "}
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>

          <span className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] rounded-full px-3 py-1 text-xs">
            {item.type}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-3">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt={`AI generated image for prompt: ${item.prompt}`}
              className="w-1/2 max-w-md mx-auto rounded-md"
              loading="lazy"
            />
          ) : (
            <div className="h-full overflow-y-scroll text-sm text-slate-700 mx-3">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default CreationItem;
