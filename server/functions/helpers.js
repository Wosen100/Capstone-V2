const getDateTimeForFileName = () => {
  const date = new Date();
  return (
    date.getDate() +
    "-" +
    (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) +
    "-" +
    date.getFullYear() +
    "-" +
    date.getHours() +
    "-" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    "-" +
    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
  );
};

module.exports = getDateTimeForFileName;
