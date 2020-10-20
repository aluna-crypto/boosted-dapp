import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "use-wallet";
import BN from "bignumber.js";
import {
  getPoolStats,
  getBoostV2Apy,
  getBoostPoolV2PriceInUSD,
  getBalancerAPY,
  getBalancerPoolPriceInUSD,
} from "src/utils/boost";
import { provider } from "web3-core";
import {
  // boostToken,
  alunaToken,
  uniAlnEthPool,
  uniAlnBoostPool,
  balAlnEthPool,
  uniAlnEthToken,
  uniAlnBoostToken,
  balAlnEthToken
} from "src/constants/tokenAddresses";
import { usePriceFeedContext } from "./PriceFeedContext";

export const ALL_POOLS = [
  {
    name: "Uniswap ALN-ETH",
    code: "uni_aln_eth",
    order: 1,
    icon: "/images/aluna_logo.png",
    address: uniAlnEthPool,
    tokenContract: uniAlnEthToken,
    tokenTicker: "uni-aln-eth",
    open: true,
    underlyingToken: alunaToken,
    url:
      "https://app.uniswap.org/#/add/0x2cC98Ccee440Fb3fcD508761e5B2C29E17D4C737/ETH",
  },
  {
    name: "Uniswap ALN-BOOST",
    code: "uni_aln_boost",
    order: 1,
    icon: "/images/aluna_logo.png",
    address: uniAlnBoostPool,
    tokenContract: uniAlnBoostToken,
    tokenTicker: "uni-aln-boost",
    open: true,
    underlyingToken: alunaToken,
    url:
      "https://app.uniswap.org/#/add/0x2cC98Ccee440Fb3fcD508761e5B2C29E17D4C737/0x0270d94f776F479306C6c44CF91aA24477C85772",
  },
  {
    name: "Balancer ALN-ETH",
    code: "bln_aln_eth",
    order: 1,
    icon: "/images/aluna_logo.png",
    address: balAlnEthPool,
    tokenContract: balAlnEthToken,
    tokenTicker: "bln-aln-eth",
    open: true,
    underlyingToken: alunaToken,
    url:
      "https://kovan.pools.balancer.exchange/#/pool/0x11d645e228bc87b2d208dcfe8a90b787de410d2d/",
  },
];

export interface IPool {
  name: string;
  icon: string;
  code: string;
  order: number;
  address: string;
  tokenContract: string;
  poolSize: BN | null;
  poolPriceInUSD: number | null;
  periodFinish: BN | null;
  boosterPrice: BN | null;
  tokenTicker: string;
  apy: number | null;
  open: boolean;
  underlyingToken?: string;
  url?: string;
}

interface IPoolContext {
  closedPools: IPool[];
  openPools: IPool[];
}

export const PoolContext = createContext<IPoolContext>({
  closedPools: [],
  openPools: [],
});

export const PoolProvider: React.FC = ({ children }) => {
  const { coinGecko } = usePriceFeedContext();
  const [closedPools, setClosedPools] = useState<IPool[]>([]);
  const [openPools, setOpenPools] = useState<IPool[]>([]);
  const {
    ethereum,
    account,
  }: { ethereum: provider; account: string | null } = useWallet();

  const getStats = useCallback(async () => {
    const CLOSED_POOLS = ALL_POOLS.filter((e) => !e.open);
    const OPEN_POOLS = ALL_POOLS.filter((e) => e.open);

    const promisedClosedPoolsArr = CLOSED_POOLS.map(async (pool) => {
      return {
        name: pool.name,
        icon: pool.icon,
        code: pool.code,
        order: pool.order,
        address: pool.address,
        tokenContract: pool.tokenContract,
        tokenTicker: pool.tokenTicker,
        poolSize: null,
        poolPriceInUSD: null,
        periodFinish: null,
        boosterPrice: null,
        apy: null,
        open: pool.open,
      };
    });

    const promisedOpenPoolsArr = OPEN_POOLS.map(async (pool) => {
      const poolStats = await getPoolStats(
        ethereum,
        pool.address,
        false,
        account
      );
      let apy;
      let poolPriceInUSD;
      if (pool.code === "eth_boost_v2_pool") {
        apy = await getBoostV2Apy(ethereum, coinGecko);
        poolPriceInUSD = await getBoostPoolV2PriceInUSD(ethereum, coinGecko);
      } else {
        apy = await getBalancerAPY(
          ethereum,
          coinGecko,
          pool.address,
          pool.tokenContract,
          pool.underlyingToken
        );
        poolPriceInUSD = await getBalancerPoolPriceInUSD(
          ethereum,
          coinGecko,
          pool.address,
          pool.tokenContract,
          pool.underlyingToken
        );
      }
      return {
        name: pool.name,
        icon: pool.icon,
        code: pool.code,
        order: pool.order,
        address: pool.address,
        tokenContract: pool.tokenContract,
        tokenTicker: pool.tokenTicker,
        poolSize: poolStats?.poolSize ? new BN(poolStats?.poolSize) : null,
        poolPriceInUSD: poolPriceInUSD ? poolPriceInUSD : null,
        periodFinish: poolStats?.periodFinish
          ? new BN(poolStats.periodFinish)
          : null,
        boosterPrice: poolStats?.boosterPrice
          ? new BN(poolStats.boosterPrice)
          : null,
        apy: apy,
        open: pool.open,
        url: pool.url,
      };
    });

    const resolvedClosedPool = await Promise.all(promisedClosedPoolsArr);
    const resolvedOpenPool = await Promise.all(promisedOpenPoolsArr);
    setClosedPools(resolvedClosedPool);
    setOpenPools(resolvedOpenPool);
  }, [ethereum, coinGecko, account]);

  useEffect(() => {
    getStats();
    const refreshInterval = setInterval(getStats, 10000);
    return () => clearInterval(refreshInterval);
  }, [getStats]);
  return (
    <PoolContext.Provider
      value={{
        closedPools,
        openPools,
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};

export const usePoolContext = () => useContext(PoolContext) as IPoolContext;
