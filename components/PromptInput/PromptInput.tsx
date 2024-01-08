"use client";

import { fetchSuggestion } from "@/lib";
import axios from "axios";
import { FormEvent, useState } from "react";
import useSWR from "swr";

function PromptInput() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestion, { revalidateOnFocus: false });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    // what will be sent to the API
    const p = useSuggestion ? suggestion : inputPrompt;
    const res = await axios.post(
      "/api/generateImage",
      JSON.stringify({ prompt: p }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = res;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md ld:divide-x"
        onSubmit={handleSubmit}
      >
        <textarea
          name="prompt"
          className="flex-1 p-4 outline-none rounded-md"
          placeholder={
            (loading && "Thinking of a suggestion...") ||
            suggestion ||
            "Enter your prompt here..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`p-4 font-bold ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!input.length}
          type="submit"
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-white text-violet-400 transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed md:rounded-bl-none disabled:bg-gray-400"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "Thinking of a suggestion..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}
export default PromptInput;
