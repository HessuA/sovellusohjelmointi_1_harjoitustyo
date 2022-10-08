import { Typography, Stack, Box } from "@mui/material";

function SummaryView({ title, placeOne, placeTwo, placeThree, placeFour }) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="subtitle2" component="h2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Stack spacing={1}>
        <Stack spacing={1} direction="row">
          {placeOne}
          {placeTwo}
        </Stack>
        <Stack spacing={1} direction="row">
          {placeThree}
          {placeFour}
        </Stack>
      </Stack>
    </Box>
  );
}
export default SummaryView;
