import { motion } from "framer-motion";

import { FaCode, FaShoppingCart, FaReact, FaRocket } from "react-icons/fa";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

export const serviceData = [
  {
    title: "Web Development",
    description:
      "Responsive, brand-focused websites built for performance, usability, and easy long-term management.",
    technologies: ["WordPress", "Elementor", "Next.js", "Responsive UI"],
    Icon: FaCode,
  },

  {
    title: "E-Commerce Development",
    description:
      "Modern online stores and storefront experiences designed to make browsing, products, and checkout easier.",
    technologies: ["Salla", "WooCommerce", "Shopify", "Store Customization"],
    Icon: FaShoppingCart,
  },

  {
    title: "Frontend & Web Apps",
    description:
      "Fast and scalable interfaces for web applications, dashboards, and custom digital products.",
    technologies: ["React.js", "Next.js", "TypeScript", "REST APIs"],
    Icon: FaReact,
  },

  {
    title: "Optimization & Support",
    description:
      "Performance, technical SEO, troubleshooting, integrations, and ongoing website improvements.",
    technologies: ["Performance", "SEO", "Hosting", "DNS"],
    Icon: FaRocket,
  },
];

const Services = () => {
  return (
    <div
      className="
        relative
        h-full
        overflow-y-auto
        overflow-x-hidden
        lg:overflow-hidden

        bg-primary/30

        pt-32
        pb-[140px]

        sm:pt-28
        sm:pb-[130px]

        lg:flex
        lg:items-center
        lg:py-28

        custom-scrollbar
      "
    >
      {/* background decoration */}
      <Circles />

      <div className="container relative z-20 mx-auto">
        <div
          className="
            flex
            flex-col
            gap-8

            xl:flex-row
            xl:items-center
            xl:gap-x-14
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <div
            className="
              mx-auto
              w-full
              max-w-[520px]
              text-center

              xl:mx-0
              xl:w-[30%]
              xl:max-w-none
              xl:text-left
            "
          >
            {/* label */}
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-white/10
                bg-white/[0.035]
                px-3 py-1.5
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-white/45

                sm:text-[11px]
              "
            >
              <span
                className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-accent
                  shadow-[0_0_8px_currentColor]
                "
              />
              What I do
            </motion.div>

            {/* title */}
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mb-3
                text-[28px]
                font-bold
                leading-[1.15]

                sm:text-[34px]

                xl:mb-5
                xl:text-[42px]
              "
            >
              Web solutions built for{" "}
              <span className="text-accent">real businesses.</span>
            </motion.h2>

            {/* description */}
            <motion.p
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mx-auto
                max-w-[430px]
                text-[13px]
                leading-6
                text-white/55

                sm:text-[14px]

                xl:mx-0
                xl:text-[15px]
              "
            >
              I develop websites, online stores, and modern web interfaces
              focused on performance, usability, and business goals.
            </motion.p>

            {/* skills line */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mt-5
                flex
                flex-wrap
                justify-center
                gap-x-2 gap-y-1
                text-[9px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-white/30

                sm:text-[10px]

                xl:mt-7
                xl:justify-start
              "
            >
              <span>React</span>
              <span className="text-accent/60">•</span>

              <span>Next.js</span>
              <span className="text-accent/60">•</span>

              <span>WordPress</span>
              <span className="text-accent/60">•</span>

              <span>Salla</span>
            </motion.div>
          </div>

          {/* ================= SERVICES ================= */}
          <motion.div
            variants={fadeIn("down", 0.45)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="
              w-full

              xl:w-[70%]
            "
          >
            <div
              className="
                grid
                grid-cols-1
                gap-3

                sm:grid-cols-2
                sm:gap-4
              "
            >
              {serviceData.map((service, index) => {
                const Icon = service.Icon;

                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 * index,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden

                      rounded-2xl
                      border border-white/[0.08]
                      bg-white/[0.025]

                      p-5

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:border-accent/30
                      hover:bg-white/[0.045]

                      sm:p-6
                    "
                  >
                    {/* glow */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-12
                        -top-12

                        h-28
                        w-28

                        rounded-full
                        bg-accent/0
                        blur-3xl

                        transition-all
                        duration-500

                        group-hover:bg-accent/[0.12]
                      "
                    />

                    {/* top */}
                    <div
                      className="
                        relative
                        mb-5
                        flex
                        items-start
                        justify-between
                      "
                    >
                      {/* icon */}
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center

                          rounded-xl
                          border border-accent/20
                          bg-accent/[0.07]

                          text-lg
                          text-accent

                          transition-all
                          duration-300

                          group-hover:border-accent/40
                          group-hover:bg-accent/[0.12]

                          sm:h-12
                          sm:w-12
                          sm:text-xl
                        "
                      >
                        <Icon />
                      </div>

                      {/* number */}
                      <span
                        className="
                          text-[10px]
                          font-medium
                          tracking-[0.15em]
                          text-white/20
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* service title */}
                    <h3
                      className="
                        relative
                        mb-2

                        text-[15px]
                        font-semibold
                        text-white

                        sm:text-[16px]
                      "
                    >
                      {service.title}
                    </h3>

                    {/* description */}
                    <p
                      className="
                        relative
                        mb-5

                        text-[12px]
                        leading-[1.7]
                        text-white/45

                        sm:text-[13px]
                      "
                    >
                      {service.description}
                    </p>

                    {/* tags */}
                    <div
                      className="
                        relative
                        flex
                        flex-wrap
                        gap-1.5
                      "
                    >
                      {service.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="
                            rounded-full
                            border border-white/[0.07]
                            bg-black/10

                            px-2.5
                            py-1

                            text-[9px]
                            text-white/40

                            transition-all
                            duration-300

                            group-hover:border-accent/15
                            group-hover:text-white/55
                          "
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* accent line */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0

                        h-[2px]
                        w-0

                        bg-accent

                        transition-all
                        duration-500

                        group-hover:w-full
                      "
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* bulb desktop only */}
      <div className="hidden xl:block">
        <Bulb />
      </div>
    </div>
  );
};

export default Services;
