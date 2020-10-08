import BN from "bignumber.js";
import { useCallback, useEffect, useState } from "react";
import { yCRVToken } from "src/constants/tokenAddresses";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { getTreasuryBalance, getTreasuryV2Balance } from "src/utils/boost";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";



export const useTreasuryBalance = () => {
  const [balance, setBalance] = useState(new BN(0));
  const { ethereum }: { ethereum: provider } = useWallet();
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
  const fetchTreasuryBalance = useCallback(async () => {
    return 1
    const { data } = await coinGecko.simple.fetchTokenPrice({
      contract_addresses: yCRVToken,
      vs_currencies: "usd",
    });
    const priceInUSD = data[yCRVToken].usd;
    const balance = new BN(await getTreasuryBalance(ethereum));
    const newTreasuryBalance = new BN(await getTreasuryV2Balance(ethereum));
    const totalBalance = balance.plus(newTreasuryBalance);
    const usdBalance = new BN(priceInUSD).multipliedBy(totalBalance);
    setBalance(usdBalance);
  }, [ethereum, coinGecko]);

  useEffect(() => {
    if (ethereum) {
      fetchTreasuryBalance();
      const refreshInterval = setInterval(fetchTreasuryBalance, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, setBalance, fetchTreasuryBalance]);

  return balance;
};
