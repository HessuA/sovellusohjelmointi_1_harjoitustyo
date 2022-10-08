import { useParams, useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Stack,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";

function DeleteItem({ user, setTimers }) {
  const { id } = useParams();
  const navigate = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  const [doNotDelete, setDoNotDelete] = useState(0);

  // Poistettava muuttujaan
  const deleteTimer = user.timers.find((timer) => timer.id === id);

  // Poiston vahvistus käynnistää laskurin jonka jälkeen ajastin poistetaan.
  const deleteHandler = () => {
    const timersList = user.timers.filter((timer) => timer.id !== id);
    setOpenAlert(true);
    let handleDelete = setTimeout(() => {
      setTimers({ ...user, timers: [...timersList] });
      navigate.push("/");
    }, 4000);
    setDoNotDelete(handleDelete);
  };

  // Poiston peruutus jos laskurin aikana painetaan kumoa painiketta
  const doNotDeleteHandler = () => {
    clearTimeout(doNotDelete);
    setDoNotDelete(0);
    setOpenAlert(false);
  };

  // Jos ei ole poistettavaa annetaan varoitus
  if (!deleteTimer) {
    return (
      <Typography variant="h5" component="p" color="error">
        Poistettavaa ajastinta ei löydy
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="p">
        {`Haluatko varmasti poistaa ajastimen: ${deleteTimer.timerName}?`}
      </Typography>
      <Typography variant="subtitle2">
        Vahvista poisto, toimintoa ei voi perua!
      </Typography>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={deleteHandler}
      >
        Poista ajastin
      </Button>
      <Collapse in={openAlert}>
        <Alert
          severity="info"
          action={
            <Button
              onClick={() => {
                doNotDeleteHandler();
              }}
            >
              Kumoa poisto
            </Button>
          }
        >
          <AlertTitle>Ajastin poistettu</AlertTitle>
          Sinut ohjataan automaattisesti etusivulle hetken kuluttua.
        </Alert>
      </Collapse>
    </Stack>
  );
}
export default DeleteItem;
