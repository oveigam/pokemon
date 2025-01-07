import { createFileRoute } from "@tanstack/react-router";
import { useTranslations } from "use-intl";

import { Button } from "@ui/components/core/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/components/core/card";
import { Input } from "@ui/components/core/input";
import { Label } from "@ui/components/core/label";
import { TextInput } from "@ui/components/input/text.input";

import { signUpUser } from "@/services/user/user.api";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-center">
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
            <TextInput label={t("user.name")} name="name" />
            <TextInput label={t("user.email")} name="email" type="email" />
            <TextInput label={t("user.password")} name="password" type="password" />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">{t("action.create")}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
