import UrlShortner from "@/components/urlshortner";
import PasteBinPage from "./pastebin/page";

export default function Home() {
  return (
    <div>
      <UrlShortner />
      <hr />
      <hr />
      <hr />
      <PasteBinPage />
    </div>
  );
}
