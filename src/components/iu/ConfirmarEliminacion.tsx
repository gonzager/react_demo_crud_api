import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import EntidadBase from "../../utils/EntidadBaseInteface";
import useActualizacion from "../../state/useActualizacion";
import { deleteData } from "../../utils/fetchApi";

export interface ConfirmarEliminacionProps {
  abrirModal: boolean;
  setAbrirModal: (abrirModal: boolean) => void;
  ruta: string;
  rutaActualizacion: string;
  entidad: EntidadBase;
}

export default function ConfirmarEliminacion(props: ConfirmarEliminacionProps) {
  const { abrirModal, setAbrirModal, ruta, entidad } = props;

  const { notificarActualizacion } = useActualizacion();

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminar = async () => {
    await deleteData(ruta, entidad.id);
    notificarActualizacion();
    cerrarModal();
  };

  return (
    <Dialog
      onClose={() => cerrarModal()}
      aria-labelledby="simple-dialog-title"
      open={abrirModal}
    >
      <DialogTitle id="alert-dialog-slide-title">
        ¿Confirma que desea eliminar <strong>{entidad?.nombre}</strong>?
      </DialogTitle>
      <DialogActions>
        <Button onClick={cerrarModal}>Cancelar</Button>
        <Button
          variant="contained"
          sx={{
            color: (theme) => theme.palette.error.contrastText,
            backgroundColor: (theme) => theme.palette.error.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.error.dark,
            },
          }}
          onClick={eliminar}
        >
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
