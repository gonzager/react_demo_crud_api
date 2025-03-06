import { AppBar, Box, Toolbar } from "@mui/material";
import isologo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <>
      <Box>
        <AppBar
          position="static"
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                width: "100vw",
              }}
            >
              <Link to="/">
                <img src={isologo} />
              </Link>{" "}
              <NavBar />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
