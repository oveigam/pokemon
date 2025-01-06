import { Link, useLocation, useRouteContext, useRouter } from "@tanstack/react-router";
import { deleteSession } from "@/.server/functions/session.fn";
import { updateLanguage, updateTheme } from "@/.server/functions/user.fn";
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
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Home,
  KeyRound,
  Languages,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  ShoppingBasket,
  Sparkles,
  Sprout,
  Sun,
  SunMoon,
  Swords,
  UserPen,
} from "lucide-react";
import { PokeballIcon } from "../icon/pokeball-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@ui/components/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import type { RouterContext } from "@/router";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "use-intl";

type CtxUser = NonNullable<RouterContext["session"]>["user"];

export function AppSidebar({ user }: { user?: CtxUser }) {
  const router = useRouter();

  const t = useTranslations();
  const { isMobile } = useSidebar();

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
      // i18n.changeLanguage(lng);
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/pokemon">
                    <PokeballIcon />
                    <span>{t("pokemon", { count: 2 })}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/move">
                    <Swords />
                    <span>{t("move", { count: 2 })}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/ability">
                    <Sprout />
                    <span>{t("ability", { count: 2 })}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/item">
                    <ShoppingBasket />
                    <span>{t("item", { count: 2 })}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
