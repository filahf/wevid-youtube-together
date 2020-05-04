import React from "react";
import ThemeToggle from "./theme/ThemeToggle";

const Navbar = () => {
  return (
    <div className="navbar">
      <h4 className="title">IhopTube</h4>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
