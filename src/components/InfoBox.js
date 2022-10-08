import { Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CapitalizeWord } from "../utils/helpers/HelperFunctions";

function InfoBox({ user }) {
  const time = new Date();
  /**************************************************************************/

  // Tervehdys
  const greetingText = (time) => {
    if (time > 6 && time < 10) {
      return "Hyvää huomenta,";
    } else if (time >= 10 && time < 15) {
      return "Hyvää päivää,";
    } else if (time >= 15 && time < 18) {
      return "Hyvää iltapäivää,";
    } else if (time >= 18 && time < 22) {
      return "Hyvää iltaa,";
    } else {
      return "Hyvää yötä,";
    }
  };

  /**************************************************************************/

  return (
    <Stack spacing={1}>
      <Typography variant="h5" component="h1">{`${greetingText(
        time.getHours()
      )} ${user.name ? CapitalizeWord(user.name) : ""}`}</Typography>
      {user.timers.length === 0 ? (
        <Stack spacing={2}>
          <Typography>
            Sinulla ei ole vielä yhtään ajastinta, haluaisitko lisätä yhden?
          </Typography>
          <Button variant="contained" fullWidth component={Link} to="/addnew">
            Lisää ajastin
          </Button>
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
}
export default InfoBox;
