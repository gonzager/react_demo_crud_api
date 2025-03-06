import { Button, Grid2 as Grid, Typography } from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";

interface UnexpectedErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void; // Asegúrate de recibir resetErrorBoundary como prop
}

export default function UnexpectedError({
  error,
  resetErrorBoundary,
}: UnexpectedErrorProps) {
  const { resetBoundary } = useErrorBoundary();

  const handleReset = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      resetBoundary();
    }
  };

  const handleResetDelayed = () => {
    setTimeout(handleReset, 10);
  };

  return (
    <>
      <Grid container>
        <Grid>
          <Typography variant="h5" color="error" gutterBottom>
            <span role="img" aria-label="thinking">
              🤔
            </span>{" "}
            Upps!!! Lo sentimos algo salio mal... {error?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Typography variant="subtitle1" gutterBottom>
          Mientras los solucionamos, podés volver{" "}
          <Link to="/" onClick={handleResetDelayed}>
            al inicio
          </Link>{" "}
          ó{" "}
          <Button
            variant="outlined"
            onClick={handleReset} // Llama a handleReset al hacer clic
            color="secondary"
          >
            Reintentar
          </Button>
        </Typography>
      </Grid>
    </>
  );
}
