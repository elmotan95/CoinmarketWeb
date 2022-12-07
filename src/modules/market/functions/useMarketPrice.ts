import {useQuery} from 'react-query';

import {GET_PRICE_CHANGES} from '../../../config/api';
import reactQueryClient from "../../../config/reactQueryClient";

interface MarketPrice {
  pair: string;
  latestPrice: number;
  day: number;
  week: number;
  month: number;
  year: number;
  priceChangeStatus: string;
}


const handleComposeData = (currentData: MarketPrice[], prevData: Record<string, MarketPrice>) => {
  const composedData: Record<string, MarketPrice> = {};

  currentData.forEach((item: MarketPrice) => {
    const keyFromPair = item.pair.split('/')[0];
    if (prevData) {
      composedData[keyFromPair] = {
        ...item,
        priceChangeStatus: item.latestPrice > prevData[keyFromPair].latestPrice ? 'up' : 'down',
      };
    } else {
      composedData[keyFromPair] = {
        ...item,
        priceChangeStatus: '',
      };
    }
  });

  return composedData;
};

const getPriceUpdate = async () => {
  const url = GET_PRICE_CHANGES;

  let prevData = {};
  try {
    prevData = await reactQueryClient.fetchQuery({
      queryKey: 'marketPrice',
      queryFn: () => {
        return;
      },
    });
  } catch (e) {
    // handle error
  }

  try {
    const response = await fetch(url);
    const result = await response.json();
    return handleComposeData(result.payload, prevData);
  } catch (error) {
    // handle error
  }
};

const usePriceUpdate = () =>
  useQuery('marketPrice', getPriceUpdate, {
    refetchInterval: 5000,
  });
export default usePriceUpdate;
