import InfoBox from "./InfoBox";
import TimersList from "./TimersList";
import Summary from "./Summary";

function FrontPage({ user, timers }) {
  return (
    <>
      <InfoBox user={user} />
      <Summary timers={timers} />
      <TimersList timers={timers} />
    </>
  );
}

export default FrontPage;
