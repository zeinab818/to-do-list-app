import { dailyQuotes } from "../data/dailyQuotes";

export const getDailyQuote = () => {
  const today = new Date().toDateString();
  const index =
    today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    dailyQuotes.length;

  return dailyQuotes[index];
};
