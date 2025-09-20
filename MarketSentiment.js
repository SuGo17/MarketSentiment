const { symbol, time } = require("./enum");
const {
  GetMarketSentimentMessage,
  CheckMarketSentiment,
  GetQuoteDayHighValue,
  SendTelegramMessage,
} = require("./utils");

const MarketSentiment = async (market) => {
  console.log("sending message to telegram group...");
  if (!market) market = "INDIA";
  try {
    const dayHighVal = {
      INDIA: await GetQuoteDayHighValue(symbol.INDIA),
      US: await GetQuoteDayHighValue(symbol.US),
    };
    const marketSentiment = {
      US: CheckMarketSentiment(dayHighVal.US, {
        HIGH: 65,
        MID: 47,
        LOW: 37,
      }),
      INDIA: CheckMarketSentiment(dayHighVal.INDIA, {
        HIGH: 36,
        MID: 28,
        LOW: 25,
      }),
    };

    const message = GetMarketSentimentMessage(
      marketSentiment[market.toUpperCase()],
      dayHighVal[market.toUpperCase()],
      market.toUpperCase()
    );
    await SendTelegramMessage(message);
    console.log("Done!");
  } catch (err) {
    throw new Error();
  }
};

module.exports = { MarketSentiment };
