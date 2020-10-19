import React, { createContext, useState, useContext, useEffect } from "react";
import CoinGecko from "coingecko-api";
// import {
//   yfiToken,
//   wethToken,
//   bandToken,
//   kncToken,
//   compToken,
//   linkToken,
//   lendToken,
//   snxToken,
//   mkrToken,
//   renToken,
// } from "src/constants/tokenAddresses";

interface ModalsContext {
  coinGecko: unknown;
}

export const Context = createContext<ModalsContext>({
  coinGecko: CoinGecko,
});

export const PriceFeedProvider: React.FC = ({ children }) => {
  const [coinGecko, setCoinGecko] = useState<any>(null);
  useEffect(() => {
    const CoinGeckoClient = process.env.ENV == 'production' ?
      new CoinGecko() :
      { 
        simple : {
          fetchTokenPrice: (params) => {
            let values = { data: {} };
            if(Array.isArray(params.contract_addresses))
              params.contract_addresses.forEach(token => values.data[token] = {usd : 1});
            else values.data[params.contract_addresses] = {usd : 1};
            return values;
          }
        }

      };
    setCoinGecko(CoinGeckoClient);
  }, [setCoinGecko]);
  return (
    <Context.Provider
      value={{
        coinGecko,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePriceFeedContext = () => useContext(Context) as ModalsContext;
