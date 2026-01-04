import AsyncStorage from "@react-native-async-storage/async-storage";

const QUOTE_DATE_KEY = "LAST_QUOTE_DATE";

export const shouldShowDailyQuote = async () => {
    const today = new Date().toDateString();
    const lastDate = await AsyncStorage.getItem(QUOTE_DATE_KEY);

    if (lastDate !== today) {
        await AsyncStorage.setItem(QUOTE_DATE_KEY, today);
        return true;
    }
    return false;
    };
