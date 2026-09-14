import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";

export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", path: "/work", Icon: HiViewColumns },
  {
    name: "testimonials",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed
        bottom-0 left-0
        z-50
        w-full

        xl:left-auto
        xl:right-[2%]
        xl:top-0
        xl:bottom-auto
        xl:flex
        xl:h-screen
        xl:w-16
        xl:items-center
        xl:justify-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[68px]
          w-full
          items-center
          justify-around
          border-t border-white/[0.08]
          bg-primary/80
          px-3
          backdrop-blur-xl

          sm:max-w-[520px]
          sm:rounded-t-2xl
          sm:px-6

          xl:h-auto
          xl:w-16
          xl:max-w-none
          xl:flex-col
          xl:justify-center
          xl:gap-y-8
          xl:rounded-full
          xl:border
          xl:border-white/[0.08]
          xl:bg-white/10
          xl:px-0
          xl:py-6
        "
      >
        {navData.map((link, i) => {
          const isActive = pathname === link.path;

          return (
            <Link
              href={link.path}
              key={i}
              aria-label={link.name}
              className={`
                group
                relative
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-xl
                text-[22px]
                transition-all
                duration-300

                xl:h-auto
                xl:w-auto
                xl:rounded-none
                xl:text-xl

                ${
                  isActive
                    ? "bg-accent/10 text-accent xl:bg-transparent"
                    : "text-white/55 hover:text-accent"
                }
              `}
            >
              {/* tooltip - desktop only */}
              <div
                role="tooltip"
                className="
                  absolute
                  right-0
                  hidden
                  pr-14
                  xl:group-hover:flex
                "
              >
                <div
                  className="
                    relative
                    flex
                    items-center
                    rounded-[4px]
                    bg-white
                    p-[6px]
                    text-primary
                  "
                >
                  <div className="text-[12px] font-semibold capitalize leading-none">
                    {link.name}
                  </div>

                  <div
                    className="
                      absolute
                      -right-2
                      border-y-[6px]
                      border-l-8
                      border-r-0
                      border-solid
                      border-y-transparent
                      border-l-white
                    "
                    aria-hidden
                  />
                </div>
              </div>

              <link.Icon aria-hidden />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
