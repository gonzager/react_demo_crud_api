import { Search as SearchIcon } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface BuscadorProps {
  onChange: (envent: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
export default function Buscador(props: BuscadorProps) {
  const { onChange, label } = props;
  return (
    <TextField
      fullWidth
      type="search"
      variant="outlined"
      label={label}
      onChange={onChange}
      slotProps={{
        input: {
          endAdornment: <SearchIcon />,
        },
      }}
    ></TextField>
  );
}
