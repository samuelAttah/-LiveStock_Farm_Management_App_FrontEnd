import React from "react";
import IconButton from "@mui/material/IconButton";

const CustomIconButton = ({ onClick, label, size, color, Icon, ...props }) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={label ? label : null}
      size={size ? size : "medium"}
      color={color ? color : "primary.main"}
      {...props}
    >
      <Icon />
    </IconButton>
  );
};

export default CustomIconButton;
