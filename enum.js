const thresholdKey = {
  HIGH: "high",
  MID: "mid",
  LOW: "low",
};
const symbol = {
  INDIA: "^INDIAVIX",
  US: "^VIX",
};

const ONE_SEC = 1000; // 1s = 1000ms
const ONE_MIN = 60 * ONE_SEC;
const ONE_HOUR = 60 * ONE_MIN;

module.exports = {
  symbol,
  telegramConfig,
  thresholdKey,
  time: { ONE_SEC, ONE_MIN, ONE_HOUR },
};
