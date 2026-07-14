import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Streamdown } from 'streamdown';

/**
 * All content in this page are only for example, replace with your own feature implementation
 * When building pages, remember your instructions in Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  console.log("Home component rendered");

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Example: lucide-react for icons */}
        <Loader2 className="animate-spin" aria-hidden="true" />
        <h1 className="sr-only">Welcome to Corner Dog Cafe</h1>
        <p className="sr-only">Explore our menu and order your favorite items.</p>
        Example Page
        {/* Example: Streamdown for markdown rendering */}
        <Streamdown>Any **markdown** content</Streamdown>
        <Button variant="default" aria-label="Example button">Example Button</Button>
      </main>
    </div>
  );
}
