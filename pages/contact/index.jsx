import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
} from "react-icons/hi2";

import emailjs from "@emailjs/browser";

import { useRef, useState } from "react";

import { fadeIn } from "../../variants";
import Socials from "../../components/Socials";

const Contact = () => {
  const formRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formRef.current || isLoading) return;

    setIsLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      formRef.current.reset();

      setStatus({
        type: "success",
        message: "Message sent successfully. I'll get back to you soon.",
      });
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        h-full
        w-full

        overflow-y-auto
        overflow-x-hidden

        xl:overflow-hidden

        bg-primary/30

        pt-24
        pb-[125px]

        sm:pt-28
        sm:pb-[135px]

        xl:flex
        xl:items-center
        xl:py-28

        custom-scrollbar
      "
    >
      <div className="container mx-auto">
        <div
          className="
            flex
            w-full
            flex-col
            gap-10

            xl:flex-row
            xl:items-center
            xl:justify-between
            xl:gap-16
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <div
            className="
              mx-auto
              w-full
              max-w-[500px]

              text-center

              xl:mx-0
              xl:w-[38%]
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

                border
                border-white/10

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
              Available for opportunities
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
                xl:text-[46px]
              "
            >
              Let's build something{" "}
              <span className="text-accent">that works.</span>
            </motion.h2>

            {/* description */}
            <motion.p
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mx-auto
                max-w-[450px]

                text-[13px]
                leading-6
                text-white/55

                sm:text-[14px]

                xl:mx-0
                xl:text-[15px]
              "
            >
              Have a web project, e-commerce store, development role, or agency
              collaboration in mind? Send me a message and let's discuss it.
            </motion.p>

            {/* Contact info */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mt-6
                flex
                flex-col
                gap-3

                sm:mt-7
              "
            >
              {/* Email */}
              <a
                href="mailto:anas.coding404@gmail.com"
                className="
                  group

                  flex
                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-white/[0.07]

                  bg-white/[0.025]

                  px-4
                  py-3

                  text-left

                  transition-all
                  duration-300

                  hover:border-accent/25
                  hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    bg-accent/[0.08]

                    text-accent
                  "
                >
                  <HiOutlineEnvelope />
                </div>

                <div className="min-w-0">
                  <div
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.14em]
                      text-white/30
                    "
                  >
                    Email
                  </div>

                  <div
                    className="
                      truncate
                      text-[12px]
                      text-white/65

                      sm:text-[13px]

                      group-hover:text-white
                    "
                  >
                    anas.coding404@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+966573984094"
                className="
                  group

                  flex
                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-white/[0.07]

                  bg-white/[0.025]

                  px-4
                  py-3

                  text-left

                  transition-all
                  duration-300

                  hover:border-accent/25
                  hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    bg-accent/[0.08]

                    text-accent
                  "
                >
                  <HiOutlinePhone />
                </div>

                <div>
                  <div
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.14em]
                      text-white/30
                    "
                  >
                    Phone
                  </div>

                  <div
                    className="
                      text-[12px]
                      text-white/65

                      sm:text-[13px]

                      group-hover:text-white
                    "
                  >
                    +966 57 398 4094
                  </div>
                </div>
              </a>

              {/* Location */}
              <div
                className="
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-white/[0.07]

                  bg-white/[0.025]

                  px-4
                  py-3

                  text-left
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    bg-accent/[0.08]

                    text-accent
                  "
                >
                  <HiOutlineMapPin />
                </div>

                <div>
                  <div
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.14em]
                      text-white/30
                    "
                  >
                    Location
                  </div>

                  <div
                    className="
                      text-[12px]
                      text-white/65

                      sm:text-[13px]
                    "
                  >
                    Riyadh, Saudi Arabia
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="
                mt-6
                flex
                justify-center

                xl:justify-start
              "
            >
              <Socials />
            </motion.div>
          </div>

          {/* ================= FORM ================= */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="
              mx-auto
              w-full
              max-w-[620px]

              xl:mx-0
              xl:w-[58%]
            "
          >
            <div
              className="
                rounded-2xl

                border
                border-white/[0.08]

                bg-white/[0.025]

                p-5

                backdrop-blur-sm

                sm:p-7
                xl:p-8
              "
            >
              {/* form header */}
              <div className="mb-6">
                <h3
                  className="
                    mb-1
                    text-[17px]
                    font-semibold

                    sm:text-[19px]
                  "
                >
                  Tell me about your project.
                </h3>

                <p
                  className="
                    text-[11px]
                    leading-5
                    text-white/40

                    sm:text-[12px]
                  "
                >
                  Share a few details and I'll get back to you as soon as
                  possible.
                </p>
              </div>

              <motion.form
                ref={formRef}
                className="
                  flex
                  w-full
                  flex-col
                  gap-4

                  sm:gap-5
                "
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {/* name + email */}
                <div
                  className="
                    grid
                    w-full
                    grid-cols-1
                    gap-4

                    sm:grid-cols-2
                  "
                >
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Your name"
                    className="input w-full"
                    disabled={isLoading}
                    required
                  />

                  <input
                    type="email"
                    name="from_email"
                    placeholder="Email address"
                    className="input w-full"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* subject */}
                <input
                  type="text"
                  name="subject"
                  placeholder="Project or opportunity"
                  className="input w-full"
                  disabled={isLoading}
                />

                {/* message */}
                <textarea
                  name="message"
                  placeholder="Tell me a little about what you need..."
                  className="textarea w-full"
                  disabled={isLoading}
                  required
                />

                <input
                  type="hidden"
                  name="to_email"
                  value="anas.coding404@gmail.com"
                />

                <input type="hidden" name="to_name" value="Anas Codex" />

                {/* status */}
                {status && (
                  <div
                    className={`
                      rounded-lg
                      border
                      px-4
                      py-3
                      text-[11px]

                      ${
                        status.type === "success"
                          ? "border-green-400/20 bg-green-400/[0.05] text-green-300"
                          : "border-red-400/20 bg-red-400/[0.05] text-red-300"
                      }
                    `}
                  >
                    {status.message}
                  </div>
                )}

                {/* submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    group
                    relative

                    mt-1

                    flex
                    h-[48px]
                    w-full

                    items-center
                    justify-center

                    overflow-hidden

                    rounded-full

                    border
                    border-white/20

                    bg-white/[0.02]

                    px-8

                    text-[12px]
                    font-medium

                    transition-all
                    duration-300

                    hover:border-accent
                    hover:bg-accent/[0.05]

                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    sm:w-fit
                    sm:min-w-[170px]
                  "
                >
                  <span
                    className="
                      transition-all
                      duration-500

                      group-hover:-translate-y-[150%]
                      group-hover:opacity-0
                    "
                  >
                    {isLoading ? "Sending..." : "Send message"}
                  </span>

                  <BsArrowRight
                    className="
                      absolute

                      translate-y-[150%]
                      opacity-0

                      text-[21px]

                      transition-all
                      duration-300

                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                    aria-hidden
                  />
                </button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
