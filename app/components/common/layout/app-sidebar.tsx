import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouter, type LinkProps } from "@tanstack/react-router";
import {
  ChevronsUpDown,
  Home,
  KeyRound,
  Languages,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  ShoppingBasket,
  Sprout,
  Sun,
  SunMoon,
  Swords,
  UserPen,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTranslations } from "use-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/core/avatar";
import { Button } from "@ui/components/core/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/core/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ui/components/core/dropdown-menu";
import { Input } from "@ui/components/core/input";
import { Label } from "@ui/components/core/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@ui/components/core/sidebar";
import { TextInput } from "@ui/components/input/text.input";

import type { RouterContext } from "@/router";
import { getI18nQuery } from "@/services/i18n/i18n.query";
import { deleteSession } from "@/services/session/session.api";
import { signInUser, updateLanguage, updateTheme } from "@/services/user/user.api";

import { PokeballIcon } from "../icon/pokeball-icon";

type CtxUser = NonNullable<RouterContext["session"]>["user"];

export function AppSidebar({ user }: { user?: CtxUser }) {
  const router = useRouter();

  const t = useTranslations();
  const { isMobile } = useSidebar();

  const [open, setOpen] = useState(false);

  const { mutate: login } = useMutation({
    mutationFn: signInUser,
    onSuccess() {
      router.invalidate();
    },
  });

  const { mutate: delSession } = useMutation({
    mutationFn: deleteSession,
    onSuccess() {
      router.invalidate();
    },
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild
            >
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold">{t("app.title")}</span>
                  <span className="truncate text-xs">{t("navigation.home")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("app.application")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuLink
                to="/pokemon"
                icon={<PokeballIcon />}
                label={t("navigation.pokemon")}
              />
              <SidebarMenuLink to="/move" icon={<Swords />} label={t("navigation.move")} />
              <SidebarMenuLink to="/ability" icon={<Sprout />} label={t("navigation.ability")} />
              <SidebarMenuLink to="/item" icon={<ShoppingBasket />} label={t("navigation.item")} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <UserHeader user={user} />
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <UserHeader user={user} />
                    </div>
                  </DropdownMenuLabel>

                  {user && (
                    <>
                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link to="/user/profile">
                            <UserPen />
                            {t("app.profile")}
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <ThemeSubMenu />
                    <LanguageSubMenu />
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  {user ? (
                    <DropdownMenuItem
                      onSelect={() => {
                        delSession({});
                      }}
                    >
                      <LogOut />
                      {t("action.logout")}
                    </DropdownMenuItem>
                  ) : (
                    <DialogTrigger asChild>
                      <DropdownMenuItem>
                        <LogIn />
                        {t("action.signin")}
                      </DropdownMenuItem>
                    </DialogTrigger>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("action.signin")}</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                login(
                  { data: new FormData(e.currentTarget) },
                  {
                    onSuccess() {
                      setOpen(false);
                    },
                  },
                );
              }}
            >
              <div className="flex flex-col gap-2">
                <TextInput label={t("user.email")} name="email" type="email" />
                <TextInput label={t("user.password")} name="password" type="password" />
              </div>

              <DialogFooter className="mt-4">
                <Button type="submit">{t("action.signin")}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
}

const SidebarMenuLink = ({
  to,
  icon,
  label,
}: {
  to: NonNullable<LinkProps["to"]>;
  icon: ReactNode;
  label: string;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={to}
          activeProps={{
            "data-active": true,
            // "aria-disabled": true,
          }}
        >
          {icon}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const UserHeader = ({ user }: { user?: CtxUser }) => {
  const t = useTranslations();

  if (user) {
    return (
      <>
        <Avatar className="h-8 w-8 rounded-lg">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.name}</span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <KeyRound className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{t("app.unidentified")}</span>
          <span className="truncate text-xs">{t("app.options")}</span>
        </div>
      </>
    );
  }
};

const ThemeSubMenu = () => {
  const router = useRouter();
  const t = useTranslations();

  const { mutate: setTheme } = useMutation({
    mutationFn: updateTheme,
    onMutate({ data: { theme } }) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark", "system");
      root.classList.add(theme);
    },
    onSuccess() {
      router.invalidate();
    },
  });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunMoon />
        {t("app.theme")}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onSelect={() => {
              setTheme({ data: { theme: "light" } });
            }}
          >
            <Sun />
            {t("app.light")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setTheme({ data: { theme: "dark" } });
            }}
          >
            <Moon />
            {t("app.dark")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setTheme({ data: { theme: "system" } });
            }}
          >
            <Monitor />
            {t("app.system")}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const LanguageSubMenu = () => {
  const router = useRouter();
  const t = useTranslations();

  const queryClient = useQueryClient();

  const { mutate: setLanguage } = useMutation({
    mutationFn: updateLanguage,
    onMutate({ data: { lng } }) {
      queryClient.prefetchQuery(getI18nQuery(lng));
    },
    onSuccess() {
      router.invalidate();
    },
  });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Languages />
        {t("app.language")}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onSelect={() => {
              setLanguage({ data: { lng: "en" } });
            }}
          >
            {t("app.english")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setLanguage({ data: { lng: "es" } });
            }}
          >
            {t("app.spanish")}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const LogInForm = () => {
  return (
    <div>
      <h1>hola</h1>
    </div>
  );
};
