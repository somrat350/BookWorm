import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1 w-fit">
      <Image
        width={24}
        height={24}
        src={"/bookWorm-logo.png"}
        alt=""
        className="w-10"
      />
      <h1 className={`text-2xl font-extrabold`}>
        Book<span className="text-secondary">Worm</span>
      </h1>
    </Link>
  );
};

export default Logo;
