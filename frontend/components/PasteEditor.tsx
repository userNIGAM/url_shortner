"use client";
import { useState } from "react";
import { createPaste } from "@/lib/pasteApi";
interface PasteEditorProps {
  onCreated: (id: string) => void;
}
export default function PasteEditor({ onCreated }: PasteEditorProps) {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("text");
  const [expiration, setExpiration] = useState("never");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please enter some content.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const paste = await createPaste({ content, language, expiration });
      onCreated(paste.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {" "}
      {/* Editor */}{" "}
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
        {" "}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          {" "}
          <span className="text-sm text-gray-400"> Paste Editor </span>{" "}
          <span className="text-xs text-gray-600">
            {" "}
            {content.length} characters{" "}
          </span>{" "}
        </div>{" "}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="// Write your code or text here..."
          spellCheck={false}
          className=" min-h-112.5 w-full resize-y bg-gray-950 p-5 font-mono text-sm leading-6 text-gray-100 outline-none placeholder:text-gray-700 "
        />{" "}
      </div>{" "}
      {/* Options */}{" "}
      <div className="flex flex-wrap gap-5">
        {" "}
        {/* Language */}{" "}
        <div>
          {" "}
          <label
            htmlFor="language"
            className="mb-2 block text-sm text-gray-400"
          >
            {" "}
            Language{" "}
          </label>{" "}
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className=" rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 "
          >
            {" "}
            <option value="text"> Plain Text </option>{" "}
            <option value="javascript"> JavaScript </option>{" "}
            <option value="typescript"> TypeScript </option>{" "}
            <option value="python"> Python </option>{" "}
            <option value="java"> Java </option>{" "}
            <option value="cpp"> C++ </option>{" "}
            <option value="html"> HTML </option>{" "}
            <option value="css"> CSS </option>{" "}
            <option value="json"> JSON </option>{" "}
            <option value="sql"> SQL </option>{" "}
          </select>{" "}
        </div>{" "}
        {/* Expiration */}{" "}
        <div>
          {" "}
          <label
            htmlFor="expiration"
            className="mb-2 block text-sm text-gray-400"
          >
            {" "}
            Expiration{" "}
          </label>{" "}
          <select
            id="expiration"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className=" rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 "
          >
            {" "}
            <option value="never"> Never </option>{" "}
            <option value="10m"> 10 Minutes </option>{" "}
            <option value="1h"> 1 Hour </option>{" "}
            <option value="1d"> 1 Day </option>{" "}
            <option value="7d"> 7 Days </option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      {/* Error */}{" "}
      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-400">
          {" "}
          {error}{" "}
        </div>
      )}{" "}
      {/* Submit */}{" "}
      <button
        type="submit"
        disabled={loading}
        className=" rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 "
      >
        {" "}
        {loading ? "Creating Paste..." : "Create Paste"}{" "}
      </button>{" "}
    </form>
  );
}
