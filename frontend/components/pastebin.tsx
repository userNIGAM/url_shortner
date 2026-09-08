"use client";

import { useState } from "react";

export default function PasteBin() {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        
    } catch (error) {
        
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} placeholder="Enter text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
