require("dotenv").config();
const cron = require("node-cron");
const {
  IndianMarketSentimentCron,
  USMarketSentimentCron,
} = require("./MarketSentiment");

console.log("Running Market sentiment cron job...");

cron.schedule("0 2 * * *", USMarketSentimentCron);

cron.schedule("15 15 * * *", IndianMarketSentimentCron);

USMarketSentimentCron();
IndianMarketSentimentCron();
