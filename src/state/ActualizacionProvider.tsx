import { PropsWithChildren, useState } from "react";
import { ActualizacionContext } from "./useActualizacion";

// Crear el Provider (esto es un componente apart)
export const ActualizacionProvider = ({ children }: PropsWithChildren) => {
  const [contadorActualizaciones, setContadorActualizaciones] = useState(0);

  const notificarActualizacion = () => {
    setContadorActualizaciones((contador) => contador + 1);
  };

  return (
    <ActualizacionContext.Provider
      value={{ contadorActualizaciones, notificarActualizacion }}
    >
      {children}
    </ActualizacionContext.Provider>
  );
};
