"use client";

import { useState } from "react";

function PromptInput() {
  const [input, setInput] = useState("");

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md ld:divide-x">
        <textarea
          name="prompt"
          className="flex-1 p-4 outline-none rounded-md"
          placeholder="Enter your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`p-4 font-bold ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={input.length === 0}
          type="submit"
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          User Suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-white text-violet-400 transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed md:rounded-bl-none disabled:bg-gray-400"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}
export default PromptInput;
