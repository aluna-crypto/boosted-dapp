import { useCallback, useEffect, useState } from "react";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { boostToken } from "src/constants/tokenAddresses";

export const useBoostPrice = () => {
  const [price, setPrice] = useState<string>("0");
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
  const fetchPrice = useCallback(async () => {
    if (coinGecko) {
      try {
        const { data } = await coinGecko.simple.fetchTokenPrice({
          // contract_addresses: boostToken,
          contract_addresses: process.env.BOOST_TOKEN_MAINNET,
          vs_currencies: "usd",
        });
        const priceInUSD: number = data[boostToken.toLowerCase()].usd;
        setPrice(priceInUSD.toString());
      } catch (e) {
        console.log(e);
      }
    }
  }, [coinGecko]);

  useEffect(() => {
    fetchPrice();
    const refreshInterval = setInterval(fetchPrice, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchPrice]);

  return price;
};
