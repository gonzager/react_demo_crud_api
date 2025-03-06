import { createContext, useContext } from "react";
interface ActualizacionContextType {
  contadorActualizaciones: number;
  notificarActualizacion: () => void;
}

export const ActualizacionContext = createContext<ActualizacionContextType>({
  contadorActualizaciones: 0,
  notificarActualizacion: () => {},
});

const useActualizacion = () => useContext(ActualizacionContext);
export default useActualizacion;
