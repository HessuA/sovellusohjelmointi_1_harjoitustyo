import { Button, Typography, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link, Prompt } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SummaryView from "./SummaryView";
import SummaryItemData from "./SummaryItemData";
import { format, subDays } from "date-fns";
import { SecondsToHoursMinutesAndSeconds } from "../utils/helpers/HelperFunctions";

function Timer({ timers, setTimers, user }) {
  /**************************************************************************/

  const { id } = useParams();

  const timer = timers.find((timer) => timer.id === id);

  const [elapsedTime, setElapsedTime] = useState(
    !timer.counter ? 0 : timer.counter
  );

  const [timerUsedTime, setTimerUsedTime] = useState({});
  const [intervalId, setIntervalId] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState();
  const [ifNavigate, setIfNavigate] = useState(false);

  /**************************************************************************/

  // Ajastimen käynnistys
  const startTimer = () => {
    setButtonDisabled(true);
    setIfNavigate(true);
    // Jos ensimmäinen kerta, tallennetaan ensimmäisen käynnistyksen aika ja lisätään ajastimien array
    if (!timer.firstStart) {
      const newTimer = {
        ...timer,
        firstStart: new Date().getTime(),
        timerUsed: [],
      };
      setTimers({
        ...user,
        timers: timers.map((originalTimer) =>
          originalTimer.id !== id ? originalTimer : newTimer
        ),
      });
    }
    setTimerUsedTime({
      id: uuid(),
      startTime: elapsedTime,
    });
    // Käynnistetään ajastimen intervalli
    let newIntervalId = setInterval(() => {
      setElapsedTime((prevCount) => prevCount + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  /**************************************************************************/

  // Ajastimen pysäytys
  const stopTimer = () => {
    if (intervalId) {
      setButtonDisabled(false);
      setIfNavigate(false);
      clearInterval(intervalId);
      setIntervalId(0);
      setTimerUsedTime({
        ...timerUsedTime,
        stopTime: elapsedTime,
        currentEndTime: new Date().getTime(),
      });
      return;
    }
  };

  /**************************************************************************/

  // Tallennetaan tiedot käyttäjälle
  useEffect(() => {
    // Poistutaan jos ei ole lopetusaikaa tai aika ei kerkeä kulua vähintään sekuntia.
    if (
      !timerUsedTime.stopTime ||
      timerUsedTime.startTime === timerUsedTime.stopTime
    )
      return;

    const newTimer = {
      ...timer,
      counter: elapsedTime,
      timerUsed: [...timer.timerUsed, timerUsedTime],
    };
    setTimers({
      ...user,
      timers: timers.map((originalTimer) =>
        originalTimer.id !== id ? originalTimer : newTimer
      ),
    });
  }, [buttonDisabled]);

  /**************************************************************************/

  // Ajan näyttäminen
  const displayedTime = (time) => {
    const seconds = `0${time % 60}`.slice(-2);
    const minutes = `0${Math.floor((time / 60) % 60)}`.slice(-2);
    const hours =
      time < 360000
        ? `0${Math.floor(time / 3600)}`.slice(-2)
        : `${Math.floor(time / 3600)}`;

    if (hours === "00") {
      return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  };

  /**************************************************************************/

  // Ajastimen käyttö viimeisten päivien/tuntien aikana
  const usedLastDays = (days) => {
    if (!timer.timerUsed) return;

    const startDay = subDays(new Date(), days);

    const lastDays = timer.timerUsed
      .filter((timer) => timer.currentEndTime >= startDay)
      .map((timer) => timer.stopTime - timer.startTime)
      .flatMap((timer) => timer)
      .reduce((prev, cur) => prev + cur, 0);
    return lastDays;
  };

  /**************************************************************************/

  // Pisin yksittäinen ajastimen käynnissäolo
  const maxTimerRunning = () => {
    if (!timer.timerUsed || timer.timerUsed.length === 0) return;

    // Palautetaan timer objecti joka on ollut pisimpään yhdenjaksoisesti päällä.
    const timerObj = timer.timerUsed.reduce(
      (prev, cur) =>
        prev.stopTime - prev.startTime > cur.stopTime - cur.startTime
          ? prev
          : cur,
      0
    );
    return `${format(
      timerObj.currentEndTime,
      "d.M"
    )} päällä ${SecondsToHoursMinutesAndSeconds(
      timerObj.stopTime - timerObj.startTime
    )}`;
  };

  /**************************************************************************/
  return (
    <Stack spacing={2}>
      <Prompt
        when={ifNavigate}
        message="Haluatko varmasti poistua? Ajastimen arvoa ei tallenneta jos poistut sen ollessa käynnissä!"
      />
      <Typography variant="h5" component="h1" textAlign="center">
        {timer.timerName}
      </Typography>
      <Paper elevation={4} sx={{ width: "100%", p: 2 }}>
        <Typography sx={{ textAlign: "center" }}>Käytetty aika</Typography>
        <Typography variant="h2" component="p" sx={{ textAlign: "center" }}>
          {displayedTime(elapsedTime)}
        </Typography>
      </Paper>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Button
          onClick={startTimer}
          disabled={buttonDisabled}
          variant="contained"
          color="success"
          size="small"
        >
          Käynnistä ajastin
        </Button>
        <Button
          onClick={stopTimer}
          disabled={!buttonDisabled}
          variant="contained"
          color="error"
          size="small"
        >
          Pysäytä ajastin
        </Button>
      </Stack>
      <SummaryView
        title="Tämän ajastimen yhteenveto"
        placeOne={
          <SummaryItemData
            title="Ensimmäinen käynnistys"
            sum={
              timer.firstStart
                ? format(timer.firstStart, "d.M.y HH:mm")
                : "Ei vielä käynnistetty"
            }
          />
        }
        placeTwo={
          <SummaryItemData
            title="Pisin aika yhdellä kertaa"
            sum={
              !maxTimerRunning() ? "Ei vielä käynnistetty" : maxTimerRunning()
            }
          />
        }
        placeThree={
          <SummaryItemData
            title="Ajankäyttö viimeinen vrk."
            sum={SecondsToHoursMinutesAndSeconds(usedLastDays(1))}
          />
        }
        placeFour={
          <SummaryItemData
            title="Ajankäyttö viim. 7 vrk."
            sum={SecondsToHoursMinutesAndSeconds(usedLastDays(7))}
          />
        }
      />
      <Button
        variant="contained"
        color="error"
        size="small"
        disabled={buttonDisabled}
        component={Link}
        to={`/delete/${timer.id}`}
      >
        Poista laskuri
      </Button>
    </Stack>
  );
}

export default Timer;
