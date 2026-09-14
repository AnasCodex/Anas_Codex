import Image from "next/image";
import Link from "next/link";

import Socials from "../components/Socials";

const Header = () => {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        z-40
        w-full

        px-4
        sm:px-6
        lg:px-10
        xl:px-0

        bg-primary/40
        backdrop-blur-md
        border-b
        border-white/[0.05]
      "
    >
      <div className="container mx-auto">
        <div
          className="
            flex
            h-[76px]
            items-center
            justify-between

            sm:h-[82px]
            xl:h-[90px]
          "
        >
          {/* logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Anas Codex"
              width={130}
              height={48}
              priority
              className="
                h-auto
                w-[105px]

                sm:w-[115px]
                xl:w-[130px]
              "
            />
          </Link>

          {/* socials */}
          <div className="hidden lg:block">
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
