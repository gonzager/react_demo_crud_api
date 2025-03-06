import { Button, CircularProgress } from "@mui/material";

interface BotonGuardarProps {
  loading: boolean;
  texto?: string;
}

export function BotonGuardar(props: BotonGuardarProps) {
  const { loading, texto = "Guardar" } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={loading}
    >
      {loading ? <CircularProgress size={25} /> : texto}
    </Button>
  );
}
