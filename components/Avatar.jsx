import Image from "next/image";

const Avatar = () => {
  return (
    <div className="flex w-full items-end justify-center pointer-events-none select-none">
      <Image
        src="/avatar.png"
        alt="Anas Naser"
        width={737}
        height={678}
        priority
        className="
          w-full
          h-auto
          object-contain
          translate-z-0
        "
      />
    </div>
  );
};

export default Avatar;
