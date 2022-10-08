import { Stack, Typography, Divider, Paper } from "@mui/material";

function SummaryItemData({ title, sum }) {
  return (
    <Paper elevation={2} sx={{ p: 1, width: "50%" }}>
      <Stack spacing={1}>
        <Typography variant="body2">{title}</Typography>
        <Divider />
        <Typography variant="subtitle2">{sum}</Typography>
      </Stack>
    </Paper>
  );
}
export default SummaryItemData;
