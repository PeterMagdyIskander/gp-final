import { TextField } from "@mui/material";
export const MyField = ({ autoComplete, label, field, type, name, id }) => {
  return (
    <TextField
      margin="normal"
      required
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
