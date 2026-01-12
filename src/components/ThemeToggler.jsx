import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggler = () => {
  const get = localStorage.getItem("bookWorm-theme");
  const getTheme = JSON.parse(get ? get : "false");
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    document
      .querySelector("html")
      .setAttribute("data-theme", theme ? "dark" : "light");
    localStorage.setItem(
      "bookWorm-theme",
      JSON.stringify(theme)
    );
  }, [theme]);
  return (
    // <button
    //   onClick={() => setTheme(!theme)}
    //   className="relative w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner flex items-center px-1 cursor-pointer transition-colors"
    // >
    //   <span
    //     className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
    //       theme ? "translate-x-7" : "translate-x-0"
    //     }`}
    //   ></span>
    //   <span className="absolute left-1 text-yellow-400 text-sm">☀️</span>
    //   <span className="absolute right-1 text-gray-800 dark:text-gray-200 text-sm">
    //     🌙
    //   </span>
    // </button>
    <div
      className="tooltip tooltip-bottom"
      data-tip={`${theme ? "Switch To Light Mode" : "Switch To Dark Mode"}`}
    >
      <button
        onClick={() => setTheme(!theme)}
        className="btn btn-sm btn-circle text-lg"
      >
        {theme ? <FaMoon /> : <FaSun className="text-orange-500" />}
      </button>
    </div>
  );
};

export default ThemeToggler;
