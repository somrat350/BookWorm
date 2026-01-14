"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggler = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookWorm-theme");
    if (stored !== null) {
      setTheme(JSON.parse(stored));
    } else {
      setTheme(true);
    }
  }, []);

  useEffect(() => {
    if (theme !== null) {
      const html = document.querySelector("html");
      html.setAttribute("data-theme", theme ? "dark" : "light");
      localStorage.setItem("bookWorm-theme", JSON.stringify(theme));
    }
  }, [theme]);
  return (
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
