const { time } = require("./enum");
const { MarketSentiment } = require("./MarketSentiment");
require("dotenv").config();

const IndianMarketSentimentCron = async () => {
  try {
    await MarketSentiment("INDIA");
  } catch (err) {
    console.log("Something went wrong, will try again in one min...");
    setTimeout(IndianMarketSentimentCron, time.ONE_MIN);
  }
};

IndianMarketSentimentCron();

module.exports = { IndianMarketSentimentCron };
