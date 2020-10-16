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
  yfiToken,
  sushiToken,
  bandToken,
  kncToken,
  compToken,
  linkToken,
  lendToken,
  snxToken,
  mkrToken,
  renToken,
  yfiPool,
  bandPool,
  compPool,
  kncPool,
  lendPool,
  linkPool,
  mkrPool,
  renPool,
  snxPool,
  sushiPool,
  uniswapLPToken,
  uniswapPool,
  uniBoostPool,
  uniswapBoostToken,
  yfiBoostPool,
  yfiBoostToken,
  creamBoostPool,
  creamBoostToken,
  sushiBoostPool,
  sushiBoostToken,
  usdcBoostPool,
  usdcBoostToken,
  uniswapPoolV2,
  usdcToken,
  creamToken,
  uniToken,
  wethToken,
  boostToken,
  alunaPool,
  alunaToken
} from "src/constants/tokenAddresses";
import { usePriceFeedContext } from "./PriceFeedContext";

export const ALL_POOLS = [
  {
    name: "BOOST-ETH (Uniswap BOOST-ETH)",
    code: "boost_pool",
    order: 0,
    icon: "/images/boost-icon.png",
    address: uniswapPool,
    tokenContract: uniswapLPToken,
    tokenTicker: "boost-eth-lp",
    open: false,
  },
  {
    name: "Unicorn (UNI-BOOST)",
    code: "uni_boost_pool",
    order: 1,
    icon: "/images/uni-logo.png",
    address: uniBoostPool,
    tokenContract: uniswapBoostToken,
    tokenTicker: "uni-boost-blp",
    open: true,
    underlyingToken: uniToken,
    url:
      "https://pools.balancer.exchange/#/pool/0x004e74ff81239c8f2ec0e2815defb970f3754d86",
  },
  {
    name: "Aluna (ALN) Pool",
    code: "aluna_boost_pool",
    order: 0,
    icon: "/images/aluna_logo.png",
    address: alunaPool,
    tokenContract: boostToken,
    tokenTicker: "aln-boost-blp",
    open: true,
    underlyingToken: alunaToken,
    url:
      "https://pools.balancer.exchange/#/pool/0x004e74ff81239c8f2ec0e2815defb970f3754d86",
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
