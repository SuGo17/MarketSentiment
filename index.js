require("dotenv").config();
const cron = require("node-cron");
const { IndianMarketSentimentCron } = require("./IndianMarketSentiment");
const { USMarketSentimentCron } = require("./USMarketSentiment");

console.log("Running Market sentiment cron job...");

cron.schedule("0 2 * * *", USMarketSentimentCron);

cron.schedule("15 15 * * *", IndianMarketSentimentCron);
