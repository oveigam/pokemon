import { Link, useLocation, type LinkProps } from "@tanstack/react-router";
import { Fragment } from "react";
import { useTranslations } from "use-intl";

import {
  Breadcrumb as _Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/components/breadcrumb";

import type { TranslateKeys } from "@/i18n/i18n";

export const Breadcrumb = () => {
  const t = useTranslations();
  const location = useLocation();

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <_Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <BreadcrumbPage>{t("navigation.home")}</BreadcrumbPage>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.length > 0 && <BreadcrumbSeparator />}

        {paths.map((path, idx) => {
          const isLast = idx === paths.length - 1;
          const hasNext = idx + 1 < paths.length;

          const key = `navigation.${path}` as TranslateKeys;
          const link = `/${path}` as LinkProps["to"];
          const name = t.has(key) ? t(key) : path;

          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={link}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {hasNext && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </_Breadcrumb>
  );
};
