import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@ui/components/button";
import { useTranslations } from "use-intl";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const t = useTranslations();

  return (
    <div className="grid flex-1 grid-cols-4 items-center">
      <Button asChild variant="ghost" className="">
        <Link to="/pokemon">{t("navigation.pokemon")}</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/move">{t("navigation.move")}</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/ability">{t("navigation.ability")}</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/item">{t("navigation.item")}</Link>
      </Button>
    </div>
  );
}
