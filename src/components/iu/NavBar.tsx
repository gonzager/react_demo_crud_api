import { LocalActivity } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const menuNavegacion = [
  {
    nombre: "Series",
    ruta: "/series",
    icono: <LocalActivity />,
  },
];

export default function NavBar() {
  const location = useLocation();
  return (
    <Box>
      {menuNavegacion.map(({ nombre, ruta, icono }) => {
        return (
          <Button
            key={nombre}
            variant="outlined"
            component={Link}
            to={ruta}
            endIcon={icono}
            sx={{
              color: "#FFF",
              marginLeft: "2em",
              backgroundColor: (theme) =>
                location.pathname.includes(ruta)
                  ? theme.palette.secondary.dark // Estilo activo
                  : theme.palette.secondary.main, // Estilo inactivo
              "&:hover": {
                backgroundColor: (theme) =>
                  location.pathname.includes(ruta)
                    ? theme.palette.secondary.dark // Estilo activo al hacer hover
                    : theme.palette.secondary.light, // Estilo inactivo al hacer hover
              },
            }}
          >
            {nombre}
          </Button>
        );
      })}
    </Box>
  );
}
