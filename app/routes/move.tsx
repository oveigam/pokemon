import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/move")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/move"!</div>;
}
