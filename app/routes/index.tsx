import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <h1 className="text-rose-600">Hello pokemon</h1>
    </main>
  );
}
