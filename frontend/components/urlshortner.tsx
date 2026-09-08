"use client";
import { useState, type FormEvent } from "react";

export default function UrlShortner() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const theurl = "https://www.youtube.com/watch?v=ygPvw_CX5Zo";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setShortenedUrl("");

    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setShortenedUrl(data.shortUrl);
    } catch (error) {
      error instanceof Error ? error.message : "Something went wrong";
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-md">
      <div className="mb-4">
        <h2 className="font-bold text-center p-3">URL Shortner</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">Enter Url :</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-md p-2 mt-2 w-full cursor-pointer"
          >
            {loading ? "Shortening..." : "Submit"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {shortenedUrl && (
          <div>
            <p>
              Shortened URL
              <a
                href={shortenedUrl}
                className="text-blue-500 hover:text-blue-700 mt-2 block"
                // target="_blank"
              >
                {shortenedUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
