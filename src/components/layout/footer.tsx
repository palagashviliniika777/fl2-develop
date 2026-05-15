import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  FOOTER_NAV_KEYS,
  SOCIAL_LINKS,
  getFooterHref,
} from "@/shared/constants/footer";
import { CopyEmail } from "./copy-email";

export async function Footer() {
  const t = await getTranslations("common");
  const email = t("footer.email");

  return (
    <footer className="bg-brown text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto_auto] lg:gap-24">
          <div className="max-w-lg">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.png"
                alt={t("brand")}
                width={114}
                height={58}
              />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white lg:text-[18px]">
              {t("footer.description")}
            </p>
            <div className="mt-8 space-y-1 text-sm text-white lg:text-[18px]">
              <p>
                <a
                  href={`tel:${t("footer.phone").replace(/\s/g, "")}`}
                  className="text-white transition-opacity hover:opacity-80"
                >
                  {t("footer.phone")}
                </a>
              </p>
              <p>
                <CopyEmail
                  email={email}
                  className="cursor-pointer text-white transition-opacity hover:opacity-80"
                />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:contents">
            <div>
              <h3 className="text-base font-bold text-white lg:text-[20px]">
                {t("footer.quickNav")}
              </h3>
              <ul className="mt-5 flex flex-col gap-1">
                {FOOTER_NAV_KEYS.map((key) => (
                  <li key={key}>
                    <Link
                      href={getFooterHref(key)}
                      className="block py-0.5 text-sm leading-tight text-white transition-opacity hover:opacity-80 lg:text-[18px]"
                    >
                      {t(`nav.${key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-white lg:text-[20px]">
                {t("footer.social")}
              </h3>
              <ul className="mt-5 flex flex-col gap-1">
                {SOCIAL_LINKS.map(({ key, href, icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-0.5 text-sm leading-tight text-white transition-opacity hover:opacity-80 lg:text-[18px]"
                    >
                      <Image
                        src={icon}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 shrink-0"
                      />
                      {t(`footer.socialLinks.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
