import CssBaseLine from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Header from "./components/iu/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/iu/Home";
import { Suspense } from "react";
import Loading from "./components/iu/Loading";
import UnexpectedError from "./components/iu/UnexpectedError";
import { ErrorBoundary } from "react-error-boundary";
import ListadoSeries from "./components/series/ListadoSeries";
import { ActualizacionProvider } from "./state/ActualizacionProvider";
import AltaModificacionSerie from "./components/series/AltaModificacionSerie";
import Footer from "./components/iu/Footer";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ActualizacionProvider>
          <CssBaseLine />
          <BrowserRouter>
            <Header />
            <Container
              sx={(theme) => ({
                marginTop: theme.spacing(2),
                minHeight: "75vh",
              })}
            >
              <Suspense fallback={<Loading />}>
                <ErrorBoundary FallbackComponent={UnexpectedError}>
                  <Rutas />
                </ErrorBoundary>
              </Suspense>
            </Container>
            <Footer />
          </BrowserRouter>
        </ActualizacionProvider>
      </ThemeProvider>
    </>
  );
};

export default App;

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/series" element={<ListadoSeries />} />
      <Route
        path="/series/:id"
        element={<AltaModificacionSerie titulo="Modificación" />}
      />
      <Route
        path="/series/new"
        element={<AltaModificacionSerie titulo="Alta" />}
      />
    </Routes>
  );
};
