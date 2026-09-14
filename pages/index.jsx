import { motion } from "framer-motion";

import ParticlesContainer from "../components/ParticlesContainer";
import Avatar from "../components/Avatar";

import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-primary/60">
      {/* Background Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-primary/20
          via-primary/40
          to-primary
          xl:bg-gradient-to-r
          xl:from-primary/10
          xl:via-black/30
          xl:to-black/10
        "
      />

      {/* ================= CONTENT ================= */}
      <div
        className="
          container relative z-20
          mx-auto
          flex h-full
          flex-col
          items-center
pt-[145px]
sm:pt-[190px]
justify-start

          text-center


          xl:items-start
          xl:justify-center
          xl:pt-20
          xl:text-left
        "
      >
        {/* small label */}
        <motion.div
          variants={fadeIn("down", 0.15)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="
            mb-3
            flex items-center gap-2
            rounded-full
            border border-white/10
            bg-white/[0.04]
            px-3 py-1.5
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-white/50
            backdrop-blur-md

            sm:text-[11px]
            xl:mb-5
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_currentColor]" />
          Riyadh · Saudi Arabia
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="
            max-w-[340px]
            text-[29px]
            font-bold
            leading-[1.05]
            tracking-[-0.03em]

            sm:max-w-[500px]
            sm:text-[46px]

            md:text-[52px]

            xl:max-w-[680px]
            xl:text-[64px]
            xl:leading-[1.02]
          "
        >
          Senior Web &
          <br />
          <span className="text-accent">E-Commerce Developer.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="
            mt-4
            max-w-[330px]
            text-[12px]
            leading-5
            text-white/55

            sm:max-w-[470px]
            sm:text-[14px]
            sm:leading-6

            xl:mt-6
            xl:max-w-[540px]
            xl:text-[15px]
          "
        >
          7+ years building fast, responsive websites and online stores with
          React, Next.js, WordPress and modern e-commerce platforms.
        </motion.p>

        {/* Tech */}
        <motion.div
          variants={fadeIn("down", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="
            mt-4
            flex flex-wrap
            items-center
            justify-center
            gap-x-2 gap-y-1
            text-[10px]
            font-medium
            uppercase
            tracking-[0.1em]
            text-white/30

            sm:text-[11px]

            xl:mt-6
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

      {/* ================= VISUAL ================= */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Desktop Explosion */}
        <div
          role="img"
          aria-hidden
          className="
            absolute inset-0
            hidden
            xl:block
            xl:bg-explosion
            xl:bg-cover
            xl:bg-right
            xl:bg-no-repeat
            xl:mix-blend-color-dodge
          "
        />

        {/* Particles - avoid clutter on small phones */}
        <div className="hidden sm:block">
          <ParticlesContainer />
        </div>

        {/* Mobile glow */}
        <div
          className="
            absolute
            bottom-[-70px]
            left-1/2
            h-[300px]
            w-[300px]
            -translate-x-1/2
            rounded-full
            bg-accent/[0.10]
            blur-[70px]

            sm:h-[400px]
            sm:w-[400px]

            xl:hidden
          "
        />

        {/* Avatar */}
        <div
          className="
    absolute
    left-1/2
    top-[48%]
    z-10

    w-[300px]
    max-w-[105vw]

    -translate-x-1/2

    sm:top-[49%]
    sm:w-[470px]

    md:top-[47%]
    md:w-[520px]

    xl:top-auto
    xl:left-auto
    xl:right-[4%]
    xl:bottom-0
    xl:w-[650px]
    xl:max-w-[52vw]
    xl:translate-x-0

    2xl:w-[737px]
  "
        >
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="w-full"
          >
            <Avatar />
          </motion.div>
        </div>
        {/* Mobile fade over avatar */}
        {/* Mobile fade over avatar */}
        <div
          className="
    absolute
    bottom-[68px]
    left-0
    z-20
    h-[65px]
    w-full
    bg-gradient-to-t
    from-primary
    via-primary/20
    to-transparent
    xl:hidden
  "
        />
      </div>
    </div>
  );
};

export default Home;
