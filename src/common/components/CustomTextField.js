import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const CustomTextField = ({
  variant,
  Icon,
  iconPosition,
  error,
  value,
  onChange,
  label,
  fullWidth,
  size,
  color,
  placeholder,
  ...props
}) => {
  return (
    <TextField
      variant={variant ? variant : "outlined"}
      inputProps={{
        startAdornment: (
          <InputAdornment position={iconPosition ? iconPosition : "start"}>
            {Icon ? <Icon /> : null}
          </InputAdornment>
        ),
      }}
      error={error ? error : false}
      value={value}
      onChange={onChange}
      label={label ? label : null}
      fullWidth={fullWidth ? fullWidth : false}
      size={size ?? "medium"}
      color={color ?? "primary.main"}
      placeholder={placeholder ?? null}
      {...props}
    />
  );
};

export default CustomTextField;
