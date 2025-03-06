import { CircularProgress, Grid2 as Grid, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      alignItems="center"
    >
      <CircularProgress size={30} />
      <Typography variant="subtitle1" color="textSecondary">
        Por favor, aguardá unos instantes
      </Typography>
    </Grid>
  );
}
