// Muunna sekuntit tunneiksi, minuuteiksi ja sekunneiksi.
function SecondsToHoursMinutesAndSeconds(seconds) {
  if (!seconds) return "Ei käynnistetty valittuna aikana";

  let totalSeconds = seconds;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const secondsToView = totalSeconds % 60;

  return `${!hours ? "" : hours} ${
    !hours ? "" : "h,"
  } ${minutes} min ${secondsToView} s`;
}

// Muunna sanan ensimmäinen kirjain isoksi.
function CapitalizeWord(word) {
  if (!word) return;
  return word
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export { SecondsToHoursMinutesAndSeconds, CapitalizeWord };
