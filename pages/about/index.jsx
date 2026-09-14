import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobephotoshop,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiWoocommerce,
  SiShopify,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
} from "react-icons/si";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

// data
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Frontend Development",
        icons: [
          FaHtml5,
          FaCss3,
          FaJs,
          SiTypescript,
          FaReact,
          SiNextdotjs,
          SiTailwindcss,
          SiRedux,
        ],
      },

      {
        title: "CMS & E-Commerce",
        icons: [FaWordpress, SiWoocommerce, SiShopify],
      },

      {
        title: "Backend & APIs",
        icons: [SiNodedotjs, SiExpress, SiMysql, SiMongodb],
      },

      {
        title: "UI/UX & Creative",
        icons: [FaFigma, SiAdobephotoshop, SiFramer],
      },

      {
        title: "Development Workflow",
        icons: [FaGitAlt, FaGithub],
      },
    ],
  },

  {
    title: "experience",
    info: [
      {
        title: "Web & E-Commerce Developer - Rising Point",
        stage: "May 2025 - Present",
      },

      {
        title:
          "Senior Web & E-Commerce Developer - Trust & Build for Information Technology",
        stage: "Jan 2025 - Present",
      },

      {
        title: "Senior Web Developer - ATEQANIA",
        stage: "Mar 2024 - Jun 2026",
      },

      {
        title: "Next.js Developer - Jeetroom",
        stage: "Apr 2024 - Oct 2024",
      },
    ],
  },

  {
    title: "projects",
    info: [
      {
        title: "Kripton",
        stage: "kripton.sa",
      },

      {
        title: "Motion Lab",
        stage: "motionlab.sa",
      },

      {
        title: "Theqa Technology",
        stage: "theqa-technology.sa",
      },

      {
        title: "Emad",
        stage: "emad-app.sa",
      },

      {
        title: "SmarterThan",
        stage: "smarterthan.co",
      },

      {
        title: "NEO Build",
        stage: "neobuild.sa",
      },
    ],
  },

  {
    title: "certificates",
    info: [
      {
        title: "React.js - MaharaTech",
        stage: "Certificate",
        url: "https://maharatech.gov.eg/mod/customcert/verify_certificate.php?contextid=194868&code=8jx2ZNAsHJ&qrcode=1",
      },

      {
        title: "React + Redux - SoloLearn",
        stage: "Certificate",
        url: "https://www.sololearn.com/certificates/CT-AHRD4LMH",
      },

      {
        title: "Responsive Web Design - SoloLearn",
        stage: "Certificate",
        url: "https://www.sololearn.com/certificates/CT-RV66AGCH",
      },

      {
        title: "JavaScript - SoloLearn",
        stage: "Certificate",
        url: "https://www.sololearn.com/certificates/CT-BUHMDKVK",
      },
    ],
  },

  {
    title: "education",
    info: [
      {
        title:
          "Bachelor of Information Technology - The National University of Yemen",
        stage: "2021",
      },
    ],
  },
];
const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div
      className="
        h-full
        overflow-y-auto
        lg:overflow-hidden

        bg-primary/30

        pt-24
        sm:pt-28
        lg:py-32

        pb-[140px]
        sm:pb-[150px]
        lg:pb-32

        text-center
        xl:text-left

        custom-scrollbar
      "
    >
      <Circles />

      {/* avatar img */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>

      <div
        className="
          container mx-auto
          min-h-full
          lg:h-full
          flex flex-col
          items-center
          xl:flex-row
          gap-x-6
        "
      >
        {" "}
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="
      text-[24px] sm:text-[30px]
      font-bold
      leading-[1.2]
      mt-5 sm:mt-0
      mb-2 sm:mb-4
      max-w-[480px]
      mx-auto xl:mx-0
    "
          >
            Building <span className="text-accent">web experiences</span> that
            perform.
          </motion.h2>

          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="
      max-w-[500px]
      mx-auto xl:mx-0
      mb-4 sm:mb-6 xl:mb-10
      px-2 xl:px-0
      text-[13px] sm:text-[15px]
      leading-6
      text-white/60
    "
          >
            Senior Web & E-Commerce Developer with 7+ years of experience
            building responsive websites, online stores, and modern web
            interfaces.
          </motion.p>

          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="
      hidden sm:flex
      max-w-xl xl:max-w-none
      mx-auto xl:mx-0
      mb-5 xl:mb-8
    "
          >
            <div className="grid w-full grid-cols-3 gap-4 xl:gap-6">
              {/* experience */}
              <div className="relative after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-white/10">
                <div className="mb-1 text-2xl xl:text-4xl font-extrabold text-accent">
                  <CountUp start={0} end={7} duration={4} />+
                </div>

                <div className="text-[10px] xl:text-xs uppercase tracking-[1px] leading-[1.4] text-white/55">
                  Years Experience
                </div>
              </div>

              {/* websites */}
              <div className="relative after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-white/10">
                <div className="mb-1 text-2xl xl:text-4xl font-extrabold text-accent">
                  <CountUp start={0} end={84} duration={4} />+
                </div>

                <div className="text-[10px] xl:text-xs uppercase tracking-[1px] leading-[1.4] text-white/55">
                  Websites Built
                </div>
              </div>

              {/* selected work */}
              <div>
                <div className="mb-1 text-2xl xl:text-4xl font-extrabold text-accent">
                  <CountUp start={0} end={4} duration={4} />
                </div>

                <div className="text-[10px] xl:text-xs uppercase tracking-[1px] leading-[1.4] text-white/55">
                  Selected Work
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full xl:max-w-[52%]"
        >
          {/* Tabs */}
          <div
            className="
    flex flex-wrap items-center justify-center
    gap-2
    mb-6
    sm:gap-3
    xl:justify-start
    xl:flex-nowrap
    xl:mb-8
  "
          >
            {aboutData.map((item, itemI) => {
              const isActive = index === itemI;

              return (
                <button
                  key={itemI}
                  type="button"
                  onClick={() => setIndex(itemI)}
                  className={`
          relative
          shrink-0
          rounded-full
          px-4 py-2
          text-[11px]
          sm:text-sm
          capitalize
          border
          transition-all duration-300
          ${
            isActive
              ? "bg-accent text-white border-accent shadow-[0_0_25px_rgba(249,108,90,0.2)]"
              : "bg-white/[0.03] text-white/55 border-white/10 hover:border-white/25 hover:text-white"
          }
        `}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          {/* Content Container */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="
  w-full

  max-h-none
  overflow-visible

  lg:max-h-[480px]
  lg:overflow-y-auto

  lg:pr-2
  custom-scrollbar

  mb-8
  lg:mb-6
"
          >
            {/* ================= SKILLS ================= */}
            {aboutData[index].title === "skills" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {aboutData[index].info.map((item, itemI) => (
                  <div
                    key={itemI}
                    className="
              group
              rounded-2xl
              border border-white/10
              bg-white/[0.035]
              p-5
              backdrop-blur-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:border-accent/40
              hover:bg-white/[0.055]
            "
                  >
                    <div className="mb-5">
                      <span
                        className="
                  mb-3 block
                  h-[2px] w-8
                  rounded-full
                  bg-accent
                  transition-all duration-300
                  group-hover:w-14
                "
                      />

                      <h4 className="text-sm sm:text-[15px] font-medium text-white">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {item.icons?.map((Icon, iconI) => (
                        <div
                          key={iconI}
                          className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    border border-white/[0.08]
                    bg-black/20
                    text-xl text-white/75
                    transition-all duration-300
                    hover:border-accent/40
                    hover:bg-accent/10
                    hover:text-accent
                    sm:h-12 sm:w-12 sm:text-2xl
                  "
                        >
                          <Icon />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ================= EXPERIENCE ================= */}
            {aboutData[index].title === "experience" && (
              <div className="relative">
                {/* Timeline Line */}
                <div
                  className="
            absolute
            left-[7px] top-2 bottom-2
            w-px
            bg-gradient-to-b
            from-accent
            via-white/15
            to-transparent
          "
                />

                <div className="space-y-3 sm:space-y-4">
                  {aboutData[index].info.map((item, itemI) => (
                    <div
                      key={itemI}
                      className="
                group
                relative
                pl-8
              "
                    >
                      {/* Timeline dot */}
                      <span
                        className={`
                  absolute
                  left-0 top-[22px]
                  h-[15px] w-[15px]
                  rounded-full
                  border-[3px]
                  border-[#111827]
                  transition-all duration-300
                  ${
                    itemI === 0
                      ? "bg-accent shadow-[0_0_15px_rgba(249,108,90,0.6)]"
                      : "bg-white/30 group-hover:bg-accent"
                  }
                `}
                      />

                      <div
                        className="
                  rounded-2xl
                  border border-white/[0.08]
                  bg-white/[0.025]
                  px-4 py-4
                  transition-all duration-300
                  hover:border-accent/30
                  hover:bg-white/[0.045]
                  sm:px-5
                "
                      >
                        <div
                          className="
                    flex flex-col gap-2
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                        >
                          <h4
                            className="
                      max-w-[420px]
                      text-[13px]
                      font-medium
                      leading-6
                      text-white/80
                      transition-colors
                      group-hover:text-white
                      sm:text-sm
                    "
                          >
                            {item.title}
                          </h4>

                          {item.stage && (
                            <span
                              className="
                        w-fit
                        shrink-0
                        rounded-full
                        border border-accent/20
                        bg-accent/[0.08]
                        px-3 py-1
                        text-[10px]
                        font-medium
                        text-accent
                        sm:text-[11px]
                      "
                            >
                              {item.stage}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= PROJECTS ================= */}
            {aboutData[index].title === "projects" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aboutData[index].info.map((item, itemI) => (
                  <a
                    key={itemI}
                    href={`https://${item.stage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border border-white/[0.08]
              bg-white/[0.03]
              p-5
              transition-all duration-300
              hover:-translate-y-1
              hover:border-accent/40
              hover:bg-white/[0.05]
            "
                  >
                    {/* Decorative glow */}
                    <div
                      className="
                pointer-events-none
                absolute -right-8 -top-8
                h-20 w-20
                rounded-full
                bg-accent/0 blur-2xl
                transition-all duration-500
                group-hover:bg-accent/15
              "
                    />

                    <div
                      className="
                mb-8
                flex items-start
                justify-between
              "
                    >
                      <span
                        className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/[0.04]
                  text-[11px]
                  font-semibold
                  text-white/60
                  transition-all duration-300
                  group-hover:border-accent/30
                  group-hover:text-accent
                "
                      >
                        {String(itemI + 1).padStart(2, "0")}
                      </span>

                      <span
                        className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  text-white/40
                  transition-all duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:border-accent/30
                  group-hover:text-accent
                "
                      >
                        ↗
                      </span>
                    </div>

                    <h4 className="mb-1 text-sm font-medium text-white sm:text-[15px]">
                      {item.title.replace(":", "")}
                    </h4>

                    <p
                      className="
                truncate
                text-[11px]
                text-white/40
                transition-colors duration-300
                group-hover:text-white/60
                sm:text-xs
              "
                    >
                      {item.stage}
                    </p>
                  </a>
                ))}
              </div>
            )}
            {/* ================= CERTIFICATES ================= */}
            {aboutData[index].title === "certificates" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aboutData[index].info.map((item, itemI) => (
                  <a
                    key={itemI}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border border-white/[0.08]
          bg-white/[0.03]
          p-5
          transition-all duration-300
          hover:-translate-y-1
          hover:border-accent/40
          hover:bg-white/[0.05]
        "
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span
                        className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-accent/20
              bg-accent/[0.08]
              text-lg text-accent
            "
                      >
                        ✓
                      </span>

                      <span
                        className="
              text-lg text-white/30
              transition-all duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:text-accent
            "
                      >
                        ↗
                      </span>
                    </div>

                    <h4
                      className="
            mb-2
            text-[13px]
            font-medium
            leading-5
            text-white/80
            transition-colors
            group-hover:text-white
            sm:text-sm
          "
                    >
                      {item.title}
                    </h4>

                    <span
                      className="
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-accent
          "
                    >
                      View Certificate
                    </span>
                  </a>
                ))}
              </div>
            )}
            {/* ================= EDUCATION ================= */}
            {aboutData[index].title === "education" && (
              <div className="space-y-4">
                {aboutData[index].info.map((item, itemI) => (
                  <div
                    key={itemI}
                    className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border border-white/[0.08]
              bg-white/[0.03]
              p-5 sm:p-6
              transition-all duration-300
              hover:border-accent/30
              hover:bg-white/[0.05]
            "
                  >
                    <div
                      className="
                absolute
                left-0 top-0
                h-full w-[2px]
                bg-accent
                opacity-70
              "
                    />

                    <div className="flex items-start gap-4">
                      <div
                        className="
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-accent/20
                  bg-accent/[0.08]
                  text-lg
                  text-accent
                "
                      >
                        🎓
                      </div>

                      <div>
                        <span
                          className="
                    mb-1 block
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-accent
                  "
                        >
                          Education
                        </span>

                        <h4
                          className="
                    max-w-lg
                    text-[13px]
                    font-medium
                    leading-6
                    text-white/75
                    group-hover:text-white
                    sm:text-sm
                  "
                        >
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
