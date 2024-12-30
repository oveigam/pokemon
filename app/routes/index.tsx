import { PageLayout } from "@/modules/common/components/layout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@ui/components/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <PageLayout className="grid grid-cols-4">
      <Button asChild variant="ghost" className="">
        <Link to="/pokemon">Pokemons</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/move">Moves</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/ability">Abilities</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/item">Items</Link>
      </Button>
    </PageLayout>
  );
}
