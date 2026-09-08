"use client";
import { useRouter } from "next/navigation";
import PasteEditor from "@/components/PasteEditor";
export default function HomePage() {
  const router = useRouter();
  const handleCreated = (id: string): void => {
    router.push(`/p/${id}`);
  };
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {" "}
      {/* Navbar */}{" "}
      <header className="border-b border-gray-800">
        {" "}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          {" "}
          <h1 className="text-xl font-bold"> Pastebin </h1>{" "}
          <span className="text-sm text-gray-500">
            {" "}
            Share code. Share text.{" "}
          </span>{" "}
        </div>{" "}
      </header>{" "}
      {/* Main Content */}{" "}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {" "}
        <div className="mb-8">
          {" "}
          <h2 className="text-4xl font-bold"> Create a Paste </h2>{" "}
          <p className="mt-3 text-gray-400">
            {" "}
            Store and share text or code with a simple link.{" "}
          </p>{" "}
        </div>{" "}
        <PasteEditor onCreated={handleCreated} />{" "}
      </section>{" "}
    </main>
  );
}
