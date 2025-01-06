import { PageLayout } from "@/components/common/layout/layout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@ui/components/button";
import { useTranslations } from "use-intl";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const t = useTranslations();

  return (
    <PageLayout className="grid grid-cols-4 items-center">
      <Button asChild variant="ghost" className="">
        <Link to="/pokemon">{t("pokemon", { count: 2 })}</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/move">{t("move", { count: 2 })}</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/ability">{t("ability", { count: 2 })}</Link>
      </Button>
      <Button asChild variant="ghost" className="">
        <Link to="/item">{t("item", { count: 2 })}</Link>
      </Button>
    </PageLayout>
  );
}
