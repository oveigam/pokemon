import { dal } from "@/.server/data/_dal";
import { PageLayout } from "@/components/common/layout/layout";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Button } from "@ui/components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/components/card";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { useTranslations } from "use-intl";
import { setCookie } from "vinxi/http";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

const signup = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Data should be FormData");
    }
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    if (!name || !email || !password) {
      throw new Error("Fields are required");
    }

    return { name, email, password };
  })
  .handler(async ({ data }) => {
    const user = await dal.user.signupUser({
      email: data.email.toString(),
      name: data.name.toString(),
      password: data.password.toString(),
    });

    const session = await dal.session.createSession(user.id);
    setCookie("authentication", session.token); // TODO set maxAge, etc.

    throw redirect({ to: "/", replace: true });
  });

function SignUpPage() {
  const t = useTranslations();

  return (
    <PageLayout className="flex items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signup({ data: new FormData(e.currentTarget) });
        }}
      >
        <Card className="min-w-96">
          <CardHeader>
            <CardTitle>{t("signup")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" name="name" />
            </div>

            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" name="email" />
            </div>

            <div>
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" name="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">{t("create")}</Button>
          </CardFooter>
        </Card>
      </form>
    </PageLayout>
  );
}
