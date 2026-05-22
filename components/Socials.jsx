import Link from "next/link";

import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookLine,
  RiLinkedinFill,
  RiGithubLine,
  RiPinterestLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "Instagram",
    link: "https://instagram.com/anascodex",
    Icon: RiInstagramLine,
  },
  {
    name: "Facebook",
    link: "https://facebook.com/anascodex",
    Icon: RiFacebookLine,
  },
  {
    name: "Linkedin",
    link: "https://linkedin.com/in/anascodex",
    Icon: RiLinkedinFill,
  },

  {
    name: "Github",
    link: "https://github.com/AnasCodex",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-[5px] hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
