import {
  Button,
  Grid2 as Grid,
  Link,
  SvgIcon,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Repositorio Educativo
      </Typography>
      <ClonarProyecto />
    </>
  );
}

const ClonarProyecto = () => {
  return (
    <>
      <Tip />
      <Grid justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          href="https://github.com/gonzager/react_demo_crud_api/generate"
        >
          ¡Quiero crear mi proyecto!
        </Button>
      </Grid>
    </>
  );
};

const Tip = () => {
  return (
    <Typography
      sx={(theme) => ({
        margin: theme.spacing(6, 0, 3),
        color: theme.palette.secondary.main,
      })}
    >
      <LightBulbIcon />
      Tip: Podés leer la{" "}
      <Link href="https://github.com/gonzager/react_demo_crud_api/blob/main/README.md">
        documentación
      </Link>{" "}
      completa en el README.
    </Typography>
  );
};

function LightBulbIcon() {
  return (
    <SvgIcon
      sx={{
        verticalAlign: "middle",
        marginRight: (theme) => theme.spacing(1),
      }}
    >
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}
