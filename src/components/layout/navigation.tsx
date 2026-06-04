"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  NAV_LINKS,
  LOCALE_LABELS,
  LOCALE_FLAGS,
  TRANSPARENT_NAV_ROUTES,
} from "@/shared/constants/navigation";
import { useLockBodyScroll, useOutsideClick } from "@/shared/hooks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { ServiceNavItem } from "@/shared/types/service";

type NavigationProps = {
  services: ServiceNavItem[];
};

export function Navigation({ services }: NavigationProps) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isTransparentPage = (
    TRANSPARENT_NAV_ROUTES as readonly string[]
  ).includes(pathname);

  useEffect(() => {
    if (!isTransparentPage) return;

    function onScroll() {
      setScrolled(window.scrollY > 10);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparentPage]);

  useOutsideClick(headerRef, () => setMobileOpen(false), {
    enabled: mobileOpen,
  });

  useLockBodyScroll({ enabled: mobileOpen });

  function switchLocale() {
    const next: Locale = locale === "en" ? "ka" : "en";
    router.replace(pathname, { locale: next });
  }

  const showSolid = !isTransparentPage || scrolled;

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-brown backdrop-blur-md"
          : "bg-brown/30 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-white.png"
            alt={t("brand")}
            width={114}
            height={58}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              if (key === "about") {
                return (
                  <ServicesDropdown key="services-dropdown" t={t} services={services} locale={locale} />
                );
              }

              return (
                <NavigationMenuItem key={key}>
                  <NavigationMenuLink
                    href={`/${locale}${href === "/" ? "" : href}`}
                    className="bg-transparent px-2.5 py-2 text-base font-semibold uppercase tracking-wide text-white/50 transition-colors hover:bg-transparent hover:text-white focus:bg-transparent"
                  >
                    {t(`nav.${key}`)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right section */}
        <div className="hidden items-center gap-5 lg:flex">
          <button
            onClick={switchLocale}
            className="flex cursor-pointer items-center gap-1.5 text-xl font-semibold text-light"
          >
            <LocaleFlag locale={locale} />
            <span>{LOCALE_LABELS[locale]}</span>
          </button>

          <Link
            href="/calculator"
            className="rounded-full border border-white bg-white/15 px-10 py-2.5 text-base font-semibold text-light backdrop-blur-[25px] transition-colors hover:bg-white/25"
          >
            {t("nav.calculator")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex cursor-pointer flex-col gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-base font-semibold uppercase tracking-wide text-white/70 transition-colors hover:text-white"
            >
              {t(`nav.${key}`)}
            </Link>
          ))}

          <div className="border-t border-white/20 pt-3">
            <p className="py-3 text-base font-semibold uppercase tracking-wide text-white/70">
              {t("nav.services")}
            </p>
            {services.map(({ name, slug }) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 border-t border-white/20 pt-4">
            <button
              onClick={switchLocale}
              className="flex cursor-pointer items-center gap-1.5 font-semibold text-light"
            >
              <LocaleFlag locale={locale} className="size-4" />
              <span>{LOCALE_LABELS[locale]}</span>
            </button>

            <Link
              href="/calculator"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-white bg-white/15 px-6 py-2 text-sm font-semibold text-light backdrop-blur-[25px]"
            >
              {t("nav.calculator")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}

function LocaleFlag({
  locale,
  className = "size-7",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <Image
      src={LOCALE_FLAGS[locale]}
      alt=""
      width={28}
      height={28}
      className={`shrink-0 object-cover ${className}`}
      aria-hidden
    />
  );
}

function ServicesDropdown({
  t,
  services,
  locale,
}: {
  t: ReturnType<typeof useTranslations<"common">>;
  services: ServiceNavItem[];
  locale: string;
}) {
  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent px-2.5 py-2 text-base font-semibold uppercase tracking-wide text-white/50 transition-colors hover:bg-transparent hover:text-white focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent">
          {t("nav.services")}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="grid w-[280px] gap-1 p-2">
          {services.map(({ name, slug }) => (
            <NavigationMenuLink
              key={slug}
              href={`/${locale}/services/${slug}`}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-light transition-colors hover:bg-white/10 focus:bg-white/10"
            >
              {name}
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href={`/${locale}/about`}
          className="bg-transparent px-2.5 py-2 text-base font-semibold uppercase tracking-wide text-white/50 transition-colors hover:bg-transparent hover:text-white focus:bg-transparent"
        >
          {t("nav.about")}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
}
