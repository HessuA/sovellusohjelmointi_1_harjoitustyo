import { subDays } from "date-fns";
import SummaryItemData from "./SummaryItemData";
import SummaryView from "./SummaryView";
import { SecondsToHoursMinutesAndSeconds } from "../utils/helpers/HelperFunctions";

function Summary({ timers }) {
  /**************************************************************************/
  // Yhteensä kaikkiin tehtäviin käytetty aika.
  const timersSum = timers
    .map((timer) => (timer.counter ? timer.counter : 0))
    .reduce((p, c) => p + c, 0);

  /**************************************************************************/

  // Tehtävä johon käytetty eniten aikaa.
  const usedTheMostTime = timers.reduce((prev, current) => {
    let prevValue = prev.counter ?? 0; // Jos ei vielä arvoa, asetetaan nolla
    let currValue = current.counter ?? 0;
    return prevValue > currValue ? prev : current; // Palauttaa objectin jonka counter arvo on suurin
  }, 0);

  /**************************************************************************/

  // Näytä käytety aika viimeisten vuorokausien osalta, ajan voi määrittää itse antamalla parametrin
  const getTimersSum = (days) => {
    const startDay = subDays(new Date(), days);

    // Käydään tarvittavat arrayt läpi, yhdsitetään ne yhdeksi arrayksi ja lasketaan laskurien arvot yhteen.
    const getSum = timers
      .map((timer) => timer.timerUsed)
      .filter((timer) => timer !== undefined) // Ei oteta käynnistämättömiä huomioon
      .flatMap((timer) => timer)
      .filter((timer) => timer.currentEndTime >= startDay) // Vain ajastimet jotka on halutun vrk ajan jälkeen
      .map((timer) => timer.stopTime - timer.startTime)
      .reduce((prev, cur) => prev + cur, 0);

    return getSum;
  };

  /**************************************************************************/

  return (
    <>
      {timers.length !== 0 ? (
        <SummaryView
          title="Yhteenveto"
          placeOne={
            <SummaryItemData
              title="Ajankäyttö yhteensä"
              sum={SecondsToHoursMinutesAndSeconds(timersSum)}
            />
          }
          placeTwo={
            <SummaryItemData
              title="Käytetty eniten aikaa"
              sum={usedTheMostTime.timerName}
            />
          }
          placeThree={
            <SummaryItemData
              title="Viimeiset 7 vrk."
              sum={SecondsToHoursMinutesAndSeconds(getTimersSum(7))}
            />
          }
          placeFour={
            <SummaryItemData
              title="Viimeiset 30 vrk."
              sum={SecondsToHoursMinutesAndSeconds(getTimersSum(30))}
            />
          }
        />
      ) : (
        ""
      )}
    </>
  );
}
export default Summary;
