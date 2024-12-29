import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@ui/components/button";
import { cn } from "@ui/util/class-name";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center">
      <h1 className={cn("text-rose-600")}>Hello pokemon</h1>
      <Button>Button</Button>
    </main>
  );
}
