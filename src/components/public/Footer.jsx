import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#101214] text-white">
      <div className="max-w-360 mx-auto p-5">
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              src="/bookWorm-logo.png"
              alt="BookWorm"
              className="w-10"
            />
            <h1>
              <Link href="/" className="text-2xl font-bold">
                BookWorm
              </Link>
            </h1>
          </div>
          {/* LINKS */}
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-secondary duration-200">
              Home
            </Link>
            <Link href="/about" className="hover:text-secondary duration-200">
              About
            </Link>
            <Link href="/contact" className="hover:text-secondary duration-200">
              Contact
            </Link>
          </div>
          {/* SOCIAL */}
          <div className="flex items-center gap-3">
            <div className="rounded-full p-1 border border-white hover:scale-110 hover:border-secondary duration-200">
              <a href="https://www.facebook.com/somrat350/" target="_blank">
                <FaFacebook />
              </a>
            </div>
            <div className="rounded-full p-1 border border-white hover:scale-110 hover:border-secondary duration-200">
              <a
                href="https://www.linkedin.com/in/osamabin-somrat"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="rounded-full p-1 border border-white hover:scale-110 hover:border-secondary duration-200">
              <a href="https://github.com/somrat350" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-5">
          <p className="text-center text-gray-400">
            Discover, track, and review books with BookWorm. Build your personal
            library, get smart recommendations, and master your reading goals
            effortlessly.
          </p>
        </div>
        <h2 className="text-center text-white font-medium text-lg border-t border-gray-600 mt-5 pt-5">
          Copyright © 2026 - All right reserved
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
