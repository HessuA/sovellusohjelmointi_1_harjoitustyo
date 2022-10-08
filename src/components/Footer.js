import { Stack, Typography, Paper, Link } from "@mui/material";

function Footer() {
  const date = new Date().getFullYear();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      component="footer"
      elevation={4}
    >
      <Stack alignItems="center" spacing={1} sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body2">{`${date} © Heikki Anttonen`}</Typography>
        <Typography variant="body2">
          Jos kysyttävää,{" "}
          <Link href="mailto:heikki.tapio.anttonen@gmail.com">
            laita viestiä.
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
}
export default Footer;
