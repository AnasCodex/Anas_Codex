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
        w-full
        max-w-full

        overflow-y-auto
        overflow-x-hidden

        lg:overflow-hidden

        bg-primary/30

        pt-24
        pb-[125px]

        sm:pt-28
        sm:pb-[135px]

        lg:flex
        lg:items-center
        lg:py-28

        custom-scrollbar
      "
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Circles />
      </div>

      {/* Main Container */}
      <div
        className="
          container
          relative
          z-20
          mx-auto

          w-full
          max-w-full
          min-w-0

          px-4
          sm:px-6
          xl:px-0
        "
      >
        <div
          className="
            flex
            w-full
            max-w-full
            min-w-0
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
              min-w-0

              text-center

              xl:mx-0
              xl:w-[30%]
              xl:max-w-none
              xl:text-left
            "
          >
            {/* Label */}
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mb-3
                inline-flex
                max-w-full
                items-center
                gap-2

                rounded-full
                border border-white/10
                bg-white/[0.035]

                px-3
                py-1.5

                text-[10px]
                uppercase
                tracking-[0.18em]
                text-white/45

                sm:text-[11px]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-accent
                  shadow-[0_0_8px_currentColor]
                "
              />
              What I do
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mb-3

                break-words

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

            {/* Description */}
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

            {/* Main Technologies */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mt-5

                flex
                max-w-full
                flex-wrap
                justify-center

                gap-x-2
                gap-y-1

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
              max-w-full
              min-w-0

              xl:w-[70%]
            "
          >
            <div
              className="
                grid
                w-full
                max-w-full
                min-w-0

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

                      w-full
                      max-w-full
                      min-w-0

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
                    {/* Glow */}
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

                    {/* Header */}
                    <div
                      className="
                        relative
                        mb-5

                        flex
                        items-start
                        justify-between
                      "
                    >
                      {/* Icon */}
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0

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

                      {/* Number */}
                      <span
                        className="
                          shrink-0
                          text-[10px]
                          font-medium
                          tracking-[0.15em]
                          text-white/20
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3
                      className="
                        relative
                        mb-2

                        break-words

                        text-[15px]
                        font-semibold
                        text-white

                        sm:text-[16px]
                      "
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                        relative
                        mb-5

                        break-words

                        text-[12px]
                        leading-[1.7]
                        text-white/45

                        sm:text-[13px]
                      "
                    >
                      {service.description}
                    </p>

                    {/* Technologies */}
                    <div
                      className="
                        relative

                        flex
                        max-w-full
                        flex-wrap

                        gap-1.5
                      "
                    >
                      {service.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="
                            max-w-full

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

                    {/* Bottom Accent */}
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

      {/* Bulb - Desktop Only */}
      <div className="pointer-events-none hidden xl:block">
        <Bulb />
      </div>
    </div>
  );
};

export default Services;
