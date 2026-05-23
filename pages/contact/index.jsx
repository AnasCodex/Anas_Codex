import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import emailjs from "@emailjs/browser";

import { fadeIn } from "../../variants";
import { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          alert("Thank you. I will get back to you ASAP.");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          alert("Something went wrong. Please try again.");
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        <div className="flex flex-col w-full max-w-[700px]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-12"
          >
            Let's <span className="text-accent">connect.</span>
          </motion.h2>

          <motion.form
            ref={formRef}
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
            onSubmit={handleSubmit}
            autoComplete="off"
            autoCapitalize="off"
          >
            <div className="flex gap-x-6 w-full">
              <input
                type="text"
                name="from_name"
                placeholder="Name"
                className="input"
                disabled={isLoading}
                required
              />

              <input
                type="email"
                name="from_email"
                placeholder="E-mail"
                className="input"
                disabled={isLoading}
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Message..."
              className="textarea"
              disabled={isLoading}
              required
            />

            <input
              type="hidden"
              name="to_email"
              value="anas.coding404@gmail.com"
            />

            <input type="hidden" name="to_name" value="Anas Codex" />

            <button
              type="submit"
              className="btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group"
              disabled={isLoading}
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                {isLoading ? "Sending..." : "Let's talk"}
              </span>

              <BsArrowRight
                className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
                aria-hidden
              />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
