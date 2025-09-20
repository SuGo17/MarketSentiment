const { time } = require("./enum");
const { MarketSentiment } = require("./MarketSentiment");
require("dotenv").config();

const USMarketSentimentCron = async () => {
  try {
    await MarketSentiment("US");
  } catch (err) {
    console.log("Something went wrong, will try again in one min...");
    setTimeout(USMarketSentimentCron, time.ONE_MIN);
  }
};

USMarketSentimentCron();

module.exports = { USMarketSentimentCron };
