import {useQuery} from 'react-query';
import {GET_SUPPORTED_CURRENCIES} from "../../../config/api";

interface Wallet {
  currencyGroup: string;
  tokenSymbol: string;
  decimal_point: number;
  tokenType: string;
  blockchain: string;
  explorer: string;
  listingDate: string;
  logo: string;
}

interface MarketList {
  currencyGroup: string;
  color: string;
  currencySymbol: string;
  name: string;
  logo: string;
  decimal_point: number;
  listingDate: string;
  wallets: Wallet[];
}


const handleComposeArray = (data: MarketList[]) => {
  const composedPayload: Record<string, MarketList> = {};

  data.forEach(item => {
    composedPayload[item.currencySymbol.toLowerCase()] = item;
  });

  return composedPayload;
};

const getListSupportedCurrencies = async () => {
  try {
    const response = await fetch(GET_SUPPORTED_CURRENCIES);
    const jsonData = await response.json();
    const payload = jsonData.payload;

    payload.shift();

    const composedData = handleComposeArray(payload);
    const marketKeys = Object.keys(composedData);

    return {
      marketData: composedData || {},
      marketKeys: marketKeys || [],
    };
  } catch (error) {
    console.error(error);
  }
};

const useMarketList = () => useQuery('marketData', getListSupportedCurrencies);
export default useMarketList;
