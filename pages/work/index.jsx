import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div
      className="
        relative
        h-full
        w-full

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
        lg:py-36

        custom-scrollbar
      "
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Circles />
      </div>

      {/* container - original sizing preserved */}
      <div className="container relative z-20 mx-auto">
        <div
          className="
            flex
            min-w-0
            flex-col

            gap-y-8

            xl:flex-row
            xl:items-center
            xl:gap-x-8
            xl:gap-y-0
          "
        >
          {/* text */}
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[500px]
              flex-col
              text-center

              xl:mx-0
              xl:w-[30vw]
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
                mx-auto
                mb-3
                inline-flex
                w-fit
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

                xl:mx-0
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-accent
                  shadow-[0_0_8px_currentColor]
                "
              />
              Selected projects
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
              Selected <span className="text-accent">work.</span>
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
              A selection of websites and digital products I've developed for
              businesses, agencies, and technology companies.
            </motion.p>

            {/* focus */}
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
              <span>Corporate</span>
              <span className="text-accent/60">•</span>

              <span>Agencies</span>
              <span className="text-accent/60">•</span>

              <span>Web Apps</span>
              <span className="text-accent/60">•</span>

              <span>E-Commerce</span>
            </motion.div>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="
              w-full
              min-w-0

              xl:max-w-[65%]
            "
          >
            <div className="w-full min-w-0">
              <WorkSlider />
            </div>
          </motion.div>
        </div>
      </div>

      {/* bulb */}
      <div className="pointer-events-none hidden xl:block">
        <Bulb />
      </div>
    </div>
  );
};

export default Work;
