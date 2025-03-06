import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { createData, getData, updateData } from "../../utils/fetchApi";
import { Serie } from "./SeriesInterface";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid2 as Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import useActualizacion from "../../state/useActualizacion";
import { BotonGuardar } from "../iu/BotonGuardar";
import { useErrorBoundary } from "react-error-boundary";

interface AltaModificacionSerieProps {
  titulo: string;
}

export default function AltaModificacionSerie(
  props: AltaModificacionSerieProps
) {
  const { titulo } = props;
  const { id } = useParams();
  const [serie, setSerie] = useState<Serie>({
    id: undefined,
    nombre: "",
    temporadas: 1,
    disponible: false,
    plataforma: "Netflix",
  });
  const [iconoCargando, setIconoCargando] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { notificarActualizacion } = useActualizacion();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const plataformas = ["Netflix", "Star+", "Flow", "Disney"];

  useEffect(() => {
    const getSerieById = async (id: string | undefined) => {
      try {
        if (id !== undefined) {
          const data = await getData<Serie>(`/series/${id}`);
          const dataSerie = {
            ...data,
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          };
          setSerie(dataSerie);
        }
        setLoading(false);
      } catch (error) {
        showBoundary(error);
      }
    };
    getSerieById(id);
  }, [id, showBoundary]);

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Nombre es requerido")
      .min(3, "Nombre debe tener como mínimo 3 caracteres")
      .max(255, "Nombre debe tener como máximo 50 caracteres")
      .test(
        "not-empty",
        "Nombre no puede estar vacío",
        (value) => value?.trim().length > 0
      ), // Evita solo espacios

    temporadas: Yup.number()
      .typeError("Temporadas debe ser un número")
      .min(1, "Debe haber al menos 1 temporada")
      .required("Temporadas es requerido"),
  });

  const handleSubmit = async (serie: Serie) => {
    setIconoCargando(true);
    if (id !== undefined) {
      await updateData<Serie>("/series", id, serie);
    } else {
      await createData<Serie>("/series", serie);
    }
    setIconoCargando(false);
    notificarActualizacion();
    irListadoSeries();
  };

  const irListadoSeries = () => {
    navigate("/series");
  };
  if (loading) {
    return <CircularProgress size={25} />;
  }
  return (
    <>
      <Formik
        initialValues={serie}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Grid
              container
              spacing={2}
              direction="column"
              alignContent="center"
            >
              <Grid size={{ xs: 12, sm: 7, md: 4 }}>
                <Typography variant="h4" color="primary">
                  {titulo}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 7, md: 4 }}>
                <Field
                  as={TextField}
                  id="nombre"
                  label="Ingresá el nombre"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nombre && Boolean(errors.nombre)}
                  helperText={touched.nombre && errors.nombre}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 7, md: 4 }}>
                <Field
                  as={TextField}
                  type="number"
                  id="temporadas"
                  label="Temporadas"
                  name="temporadas"
                  value={values.temporadas}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.temporadas && Boolean(errors.temporadas)}
                  helperText={touched.temporadas && errors.temporadas}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 7, md: 4 }}>
                <Field
                  as={Select}
                  fullWidth
                  label="Elegí una Plataforma"
                  id="selectIdPlataforma"
                  value={values.plataforma}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.plataforma && Boolean(errors.plataforma)}
                  name="plataforma"
                >
                  {plataformas.map((plataforma) => (
                    <MenuItem key={plataforma} value={plataforma}>
                      {plataforma}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="plataformaId" component="div" />
                <Grid size={4} marginTop="1em">
                  <FormControlLabel
                    control={
                      <Field
                        as={Switch}
                        id="disponible"
                        name="disponible"
                        checked={values.disponible}
                        onChange={handleChange} // Manejar cambios
                        onBlur={handleBlur} // Manejar blur
                      />
                    }
                    label="Disponible"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 7, md: 4 }}
              container
              justifyContent="center"
              spacing={6}
              marginTop={2}
            >
              <Grid>
                <Button onClick={irListadoSeries}>Cancelar</Button>
              </Grid>
              <Grid>
                <BotonGuardar loading={iconoCargando} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
