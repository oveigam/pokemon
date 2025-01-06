import type { RouterContext } from "@/router";
import { deleteSession } from "@/services/session/session.api";
import { updateLanguage, updateTheme } from "@/services/user/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouter, type LinkProps } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
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
} from "@ui/components/dropdown-menu";
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
} from "@ui/components/sidebar";
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
import type { ReactNode } from "react";
import { useTranslations } from "use-intl";
import { PokeballIcon } from "../icon/pokeball-icon";
import { getI18nQuery } from "@/services/i18n/i18n.query";

type CtxUser = NonNullable<RouterContext["session"]>["user"];

export function AppSidebar({ user }: { user?: CtxUser }) {
  const router = useRouter();

  const t = useTranslations();
  const { isMobile } = useSidebar();

  const queryClient = useQueryClient();

  const { mutate: delSession } = useMutation({
    mutationFn: deleteSession,
    onSuccess() {
      router.invalidate();
    },
  });

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
                  <span className="truncate font-semibold">{t("title")}</span>
                  <span className="truncate text-xs">{t("home")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("application")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuLink to="/pokemon" icon={<PokeballIcon />} label={t("pokemon")} />
              <SidebarMenuLink to="/move" icon={<Swords />} label={t("move")} />
              <SidebarMenuLink to="/ability" icon={<Sprout />} label={t("ability")} />
              <SidebarMenuLink to="/item" icon={<ShoppingBasket />} label={t("item")} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
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
                          {t("profile")}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <SunMoon />
                      {t("theme")}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onSelect={() => {
                            setTheme({ data: { theme: "light" } });
                          }}
                        >
                          <Sun />
                          {t("light-theme")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setTheme({ data: { theme: "dark" } });
                          }}
                        >
                          <Moon />
                          {t("dark-theme")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setTheme({ data: { theme: "system" } });
                          }}
                        >
                          <Monitor />
                          {t("system-theme")}
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Languages />
                      {t("language")}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onSelect={() => {
                            setLanguage({ data: { lng: "en" } });
                          }}
                        >
                          {t("english")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setLanguage({ data: { lng: "es" } });
                          }}
                        >
                          {t("spanish")}
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user ? (
                  <DropdownMenuItem
                    onSelect={() => {
                      delSession({});
                    }}
                  >
                    <LogOut />
                    {t("logout")}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <LogIn />
                    {t("signin")}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
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
          <span className="truncate font-semibold">{t("unidentified")}</span>
          <span className="truncate text-xs">{t("options")}</span>
        </div>
      </>
    );
  }
};
