import { TextField } from "@mui/material";
export const MyField = ({ required,autoComplete, label, field, type, name, id }) => {
  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth
      type={type}
      label={label}
      placeholder={label}
      name={name}
      id={id}
      autoComplete={autoComplete}
      {...field}
    />
  );
};
