import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  text,
  size,
  variant,
  color,
  onClick,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <Button
      size={size ? size : "medium"}
      variant={variant ? variant : "contained"}
      color={color ? color : "primary.main"}
      onClick={onClick}
      startIcon={startIcon ? <startIcon /> : null}
      endIcon={endIcon ? <endIcon /> : null}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
