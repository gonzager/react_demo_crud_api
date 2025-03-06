import { Add as AddIcon } from "@mui/icons-material";
import {
  Box,
  Fab,
  Grid2 as Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Serie } from "./SeriesInterface";
import {
  Create as CreateIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ConfirmarEliminacion from "../iu/ConfirmarEliminacion";
import { getData } from "../../utils/fetchApi";
import Buscador from "../iu/Buscador";
import useActualizacion from "../../state/useActualizacion";
import { useErrorBoundary } from "react-error-boundary";

export default function ListadoSeries() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [textoParaBuscar, setTextoParaBuscar] = useState<string>("");
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [serieAEliminar, setSerieAEliminar] = useState<Serie>({
    id: 0,
    nombre: "",
    temporadas: 0,
    disponible: false,
  });
  const { contadorActualizaciones } = useActualizacion();
  const { showBoundary } = useErrorBoundary();
  const cambioDeTextoParaBuscar = (e: ChangeEvent<HTMLInputElement>) =>
    setTextoParaBuscar(e.target.value);

  const eliminarSerie = (serie: Serie) => {
    setSerieAEliminar(serie);
    setAbrirModal(true);
  };

  useEffect(() => {
    const getSeries = async () => {
      try {
        const data = await getData<Serie[]>("/series");
        setSeries(data);
      } catch (error) {
        showBoundary(error);
      }
    };
    getSeries();
  }, [contadorActualizaciones, showBoundary]);

  const validar = useCallback(
    (s: Serie) => {
      const validadores = [
        (s: Serie) => s.nombre.includes(textoParaBuscar),
        (s: Serie) => s.plataforma?.includes(textoParaBuscar),
      ];
      return validadores.some((it) => it(s));
    },
    [textoParaBuscar]
  );

  const seriesFiltradas = useMemo(
    () => series.filter(validar),
    [series, validar]
  );

  return (
    <>
      <Grid container alignItems="center" spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Buscador
            label="Buscá una serie"
            onChange={cambioDeTextoParaBuscar}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{
            display: "flex",
            justifyContent: {
              xs: "flex-start",
              sm: "flex-end",
            },
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            component={Link}
            to={"/series/new"}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Box mt={2}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Temporadas</TableCell>
                <TableCell>Plataforma</TableCell>
                <TableCell>Disponible</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seriesFiltradas.map((serie) => (
                <TableRow key={serie.id}>
                  <TableCell>{serie.nombre}</TableCell>
                  <TableCell>{serie.temporadas}</TableCell>
                  <TableCell>{serie.plataforma}</TableCell>
                  <TableCell>
                    {serie.disponible ? "Disponible" : "No Disponible"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{
                        width: "30px",
                        height: "30px",
                        color: "#000",
                      }}
                      aria-label="edit"
                      component={Link}
                      to={`/series/${serie.id}`}
                    >
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: "30px",
                        height: "30px",
                        color: "#000",
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon
                        onClick={() => {
                          eliminarSerie(serie);
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ConfirmarEliminacion
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        ruta={"/series"}
        rutaActualizacion={""}
        entidad={{ id: serieAEliminar.id ?? 0, nombre: serieAEliminar.nombre }}
      />
    </>
  );
}
