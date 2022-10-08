import {
  Typography,
  List,
  ListItem,
  Paper,
  Divider,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { SecondsToHoursMinutesAndSeconds } from "../utils/helpers/HelperFunctions";

function TimersList({ timers }) {
  const copyTimersArray = [...timers];

  /**************************************************************************/

  // Järjestetään siten että tapahtuma johon on käytetty eniten aikaa näytetään ensimmäisenä jne.
  // Laskurit joita ei ole käynnistetty, jäävät viimeisiksi.
  copyTimersArray.sort(
    (a, b) =>
      (a.counter === undefined) - (b.counter === undefined) ||
      b.counter - a.counter
  );

  /**************************************************************************/

  return (
    <>
      {copyTimersArray.length !== 0 ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="subtitle2" component="p">
            Sinulla seurannassa
          </Typography>
          <List>
            {copyTimersArray.map((timer) => {
              return (
                <ListItem key={timer.id} disableGutters>
                  <Paper elevation={2} sx={{ p: 2, width: "100%" }}>
                    <Stack direction="column" spacing={2}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="h6" component="h2">
                          {timer.timerName}
                        </Typography>
                        <IconButton
                          color="success"
                          component={Link}
                          to={`timer/${timer.id}`}
                        >
                          <PlayCircleFilledWhiteIcon fontSize="large" />
                        </IconButton>
                      </Stack>
                      <Divider />
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="column">
                          <Typography variant="subtitle2" component="p">
                            Ajankäytön seuranta alkoi
                          </Typography>
                          <Typography variant="subtitle2" component="p">
                            {timer.firstStart
                              ? format(timer.firstStart, "d.M.y")
                              : "Ei vielä käynnistetty"}
                          </Typography>
                        </Stack>
                        <Stack direction="column">
                          <Typography variant="subtitle2" component="p">
                            Käytetty aika yht.
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ textAlign: "right" }}
                          >
                            {SecondsToHoursMinutesAndSeconds(timer.counter)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Paper>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
export default TimersList;
