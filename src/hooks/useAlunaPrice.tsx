import { useCallback, useEffect, useState } from "react";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { boostToken } from "src/constants/tokenAddresses";

export const useAlunaPrice = () => {
  const [price, setPrice] = useState<string>("0");
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();

  const fetchPrice = useCallback(async () => {
    // ALUNA PRICE is always 0.1 while we don't get listed on coingecko
    // or have a better price to use as placeholder
    setPrice("0.1");

    return;
    if (coinGecko) {
      try {
        const { data } = await coinGecko.simple.fetchTokenPrice({
          contract_addresses: boostToken,
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
