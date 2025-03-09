import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Esta aplicación ha sido realizada como ejemplo para los estudiantes de
        la <strong>Universidad</strong>
      </Typography>

      <Box display="flex" justifyContent="center">
        <span role="img" aria-label="thinking">
          🤔
        </span>
        <Typography variant="body2" color="text.secondary">
          Si encontraste algún error ó queres mirar el código y realizar mejoras
          podés hacer un pull request al proyecto{" "}
          <Link href="https://github.com/gonzager/react_demo_crud_api">
            en GitHub
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
