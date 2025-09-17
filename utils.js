const { thresholdKey, telegramConfig } = require("./enum");
const yahooFinance = require("yahoo-finance2").default;

const SendTelegramMessage = async (message) => {
  const url = `https://api.telegram.org/bot${telegramConfig.token}/sendMessage`;
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: telegramConfig.chatId,
      text: message,
      parse_mode: "HTML",
    }),
  };
  try {
    await fetch(url, payload);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const CheckMarketSentiment = (dayHighVal, threshold) => {
  if (dayHighVal > threshold.HIGH) return thresholdKey.HIGH;
  if (dayHighVal > threshold.MID) return thresholdKey.MID;
  if (dayHighVal > threshold.LOW) return thresholdKey.LOW;
  return null;
};

const GetQuoteDayHighValue = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);
    return quote.regularMarketDayHigh;
  } catch (err) {
    console.log("Error while fetching data");
    throw new Error("Error while fetching data");
  }
};

const GetMarketSentimentMessage = (marketSentiment, dayHighVal, market) => {
  switch (marketSentiment) {
    case thresholdKey.HIGH:
      return `<strong>${market} market: \nVix is <code>${dayHighVal}</code>, Extreamely Cheap Markets!</strong>\nTry to buy 3 years worth at once and focus towards stocks!`;
    case thresholdKey.MID:
      return `<strong>${market} market: \nVix is <code>${dayHighVal}</code>, Cheap Markets!</strong>\nTry to buy 2 year worth at once and focus a little towards stocks!!`;
    case thresholdKey.LOW:
      return `<strong>${market} market: \nVix is <code>${dayHighVal}</code>, Cheap Markets!</strong>\nTry to buy 1 year worth at once!`;
    default:
      return `<strong>${market} market: \nVix is <code>${dayHighVal}</code></strong> \nNot a good time to invest lumpsum, Keep the SIP going!`;
  }
};

module.exports = {
  SendTelegramMessage,
  CheckMarketSentiment,
  GetQuoteDayHighValue,
  GetMarketSentimentMessage,
};
