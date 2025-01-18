export function sortByDirection(direction, datesList) {
  const dates = datesList.reduce(function (sortedlist, item) {
    sortedlist.push({ item: item, value: formatDate(item) });
    return sortedlist;
  }, []);
  direction === "asc"
    ? dates.sort((a, b) => b.value - a.value)
    : dates.sort((a, b) => a.value - b.value);
  return dates;
}

const formatDate = (date) => {
  const localTimeZone = new Date().getTimezoneOffset() / 60;
  const regExp = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}) \(GMT([+-]\d+)\)$/;
  const match = date.match(regExp);
  if (!match) {
    return null;
  } else {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);
    const hours = parseInt(match[4], 10);
    const minutes = parseInt(match[5], 10);
    const timezoneOffset =
      parseInt(match[6], 10) +
      (localTimeZone < 0 ? localTimeZone : -localTimeZone);
    const actualHours =
      hours - (timezoneOffset > 0 ? timezoneOffset : hours + timezoneOffset);
    const date = new Date(year, month, day, actualHours, minutes);
    return date;
  }
};
