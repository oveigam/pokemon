import { PageLayout } from "@/components/common/layout/layout";
import { signUpUser } from "@/services/user/user.api";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@ui/components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/components/card";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { useTranslations } from "use-intl";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  const t = useTranslations();

  return (
    <PageLayout className="flex items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signUpUser({ data: new FormData(e.currentTarget) });
        }}
      >
        <Card className="min-w-96">
          <CardHeader>
            <CardTitle>{t("action.signup")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <Label htmlFor="name">{t("user.name")}</Label>
              <Input id="name" name="name" />
            </div>

            <div>
              <Label htmlFor="email">{t("user.email")}</Label>
              <Input id="email" name="email" />
            </div>

            <div>
              <Label htmlFor="password">{t("user.password")}</Label>
              <Input id="password" name="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">{t("action.create")}</Button>
          </CardFooter>
        </Card>
      </form>
    </PageLayout>
  );
}
