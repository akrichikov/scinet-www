import Link from "next/link";
import { menu } from "@/components/ui/menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SocialSharing from "@/components/SocialSharing";
import { MenuItem } from "@/lib/types/menuItem";


export interface SocialLink {
  href: string;
  ariaLabel: string;
  src: string;
  alt: string;
}

const Header = () => {
  return (
    <header className="flex flex-col justify-between max-w-[95rem] w-full mx-auto px-4 md:pt-8 pt-4 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <div className="flex">
        <div className="flex flex-1">
          <Link href="/" aria-label="Return to homepage">
            <img
              className="h-full w-fit"
              src="/logos/FyrreMagazineLogo-Black.svg"
              alt="logo"
            />
          </Link>
        </div>
        <Sheet>
          <SheetTrigger aria-labelledby="button-label">
            <span id="button-label" hidden>
              Menu
            </span>
            <svg
              aria-hidden="true"
              className="md:hidden"
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="25" height="4" fill="black" />
              <rect y="6" width="25" height="4" fill="black" />
              <rect y="12" width="25" height="4" fill="black" />
            </svg>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="w-full pt-14"
            aria-label="Menu Toggle"
          >
            <nav
              className="flex flex-col flex-1 justify-end gap-6"
              aria-labelledby="mobile-nav"
            >
              {menu.map((menuItem: MenuItem, index: number) => (
                <Link key={index} href={menuItem.href}>
                  {menuItem.label}
                </Link>
              ))}
              <svg
                width="15"
                height="1"
                viewBox="0 0 15 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="15" height="1" fill="black" />
              </svg>
              <SocialSharing
                links={[
                  {
                    href: "#",
                    ariaLabel: "Visit our Instagram page",
                    src: "/icons/ri_instagram-line.svg",
                    alt: "Instagram logo",
                  },
                  {
                    href: "#",
                    ariaLabel: "Visit our Twitter page",
                    src: "/icons/ri_twitter-fill.svg",
                    alt: "Twitter logo",
                  },
                ] as SocialLink[]}
              />
            </nav>
          </SheetContent>
        </Sheet>
        <nav
          className="flex-1 items-center justify-end gap-6 hidden md:flex"
          aria-labelledby="desktop-nav"
        >
          {menu.map((menuItem: MenuItem, index: number) => (
            <Link key={index} href={menuItem.href}>
              {menuItem.label}
            </Link>
          ))}
          <svg
            width="15"
            height="1"
            viewBox="0 0 15 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="15" height="1" fill="black" />
          </svg>
          <SocialSharing
            links={[
              {
                href: "#",
                ariaLabel: "Visit our Instagram page",
                src: "/icons/ri_instagram-line.svg",
                alt: "Instagram logo",
              },
              {
                href: "#",
                ariaLabel: "Visit our Twitter page",
                src: "/icons/ri_twitter-fill.svg",
                alt: "Twitter logo",
              },
              {
                href: "#",
                ariaLabel: "Visit our YouTube page",
                src: "/icons/ri_youtube-fill.svg",
                alt: "YouTube logo",
              },
              {
                href: "#",
                ariaLabel: "Visit our RSS feed",
                src: "/icons/ri_rss-fill.svg",
                alt: "RSS feed logo",
              },
            ] as SocialLink[]}
          />
        </nav>
      </div>
      <hr className="border-black border-t-0 border mt-4" />
    </header>
  );
};
