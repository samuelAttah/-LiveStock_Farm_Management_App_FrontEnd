import React from "react";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, text, style }) => {
  return (
    <NavLink to={to} style={style}>
      {text}
    </NavLink>
  );
};

export default CustomNavLink;
