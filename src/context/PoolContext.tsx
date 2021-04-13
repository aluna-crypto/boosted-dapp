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
  wETHToken,
  // uniAlnEthPool,
  // uniAlnBoostPool,
  // balAlnEthPool,
  // uniAlnEthToken,
  // uniAlnBoostToken,
  // balAlnEthToken,
} from "src/constants/tokenAddresses";
import { usePriceFeedContext } from "./PriceFeedContext";

export const ALL_POOLS = [
  {
    name: "ALN-ETH-LP",
    code: "aln-eth-lp",
    boostEnabled: false,
    order: 1,
    icon: "/images/eth@2x.png",
    address: "0x99a86705DA25A6d13A06f713871a8BBB8292c1b8",
    tokenContract: "0xdc3f6f4c00b55f56d5ef6293b762c6483af24a82",
    tokenTicker: "aln-eth-lp",
    open: true,
    // Since the pool is ALN-ETH the underlying token should be WETH
    underlyingToken: wETHToken,
    url:
      "https://app.uniswap.org/#/add/0x8185bc4757572da2a610f887561c32298f1a5748/ETH",
  },
  {
    name: "ALN",
    code: "aln",
    boostEnabled: true,
    order: 2,
    icon: "/images/aluna-icon.png",
    address: "0xb0DBA13A65A06EE6cEFe63e0eb3A0fd6349a9D12",
    tokenContract: "0x8185bc4757572da2a610f887561c32298f1a5748",
    tokenTicker: "aln",
    open: true,
    underlyingToken: alunaToken,
    url: "https://www.coingecko.com/en/coins/aluna",
  },
  {
    name: "ALN-USDT-LP",
    code: "aln-usdt-lp",
    boostEnabled: true,
    order: 3,
    icon: "/images/usdt@2x.png",
    address: "0x386460a3179089c41e4Cf6a31aac37a75aCf0AD3",
    tokenContract: "0xc8cd7fc5723098801c6a9071647cfde491327342",
    tokenTicker: "aln-usdt-lp",
    open: true,
    underlyingToken: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    url:
      "https://app.uniswap.org/#/add/0x8185bc4757572da2a610f887561c32298f1a5748/0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    name: "ALN-USDC-LP",
    code: "aln-usdc-lp",
    boostEnabled: true,
    order: 4,
    icon: "/images/usdc@2x.png",
    address: "0xB05893DC580265b838e2F70011c17D97E1fcE061",
    tokenContract: "0x7651d41ba5864feaeac639e47421a283b5639a5b",
    tokenTicker: "aln-usdc-lp",
    open: true,
    underlyingToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    url:
      "https://app.uniswap.org/#/add/0x8185bc4757572da2a610f887561c32298f1a5748/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  // {
  //   name: "UNI-ALN-BOOST",
  //   code: "uni-aln-boost",
  //   order: 2,
  //   icon: "/images/aluna-icon.png",
  //   address: "0x883323df606b29cb1C7e67cdcdE35CD66711791F",
  //   tokenContract: "0x0bf121341276f717eb7b3dbc888e3f4e45a3dd0e",
  //   tokenTicker: "uni-aln-boost",
  //   open: true,
  //   underlyingToken: alunaToken,
  //   url:
  //     "https://app.uniswap.org/#/add/0x2cC98Ccee440Fb3fcD508761e5B2C29E17D4C737/0x0270d94f776f479306c6c44cf91aa24477c85772",
  // },
  // {
  //   name: "BAL-ALN-WETH",
  //   code: "bal-aln-weth",
  //   order: 3,
  //   icon: "/images/aluna-icon.png",
  //   address: "0x2e5d676AF48FF6cc1F6b6DbFa0C0fb238AbF8803",
  //   tokenContract: "0x11d645e228bc87b2d208dcfe8a90b787de410d2d",
  //   tokenTicker: "bal-aln-weth",
  //   open: true,
  //   underlyingToken: alunaToken,
  //   url:
  //     "https://kovan.pools.balancer.exchange/#/pool/0x11d645e228bc87b2d208dcfe8a90b787de410d2d/",
  // },
  // {
  //   name: "Uniswap ALN-ETH",
  //   code: "uni_aln_eth",
  //   order: 1,
  //   icon: "/images/aluna-icon.png",
  //   address: uniAlnEthPool,
  //   tokenContract: uniAlnEthToken,
  //   tokenTicker: "uni-aln-eth",
  //   open: false,
  //   underlyingToken: alunaToken,
  //   url:
  //     "https://app.uniswap.org/#/add/0x2cC98Ccee440Fb3fcD508761e5B2C29E17D4C737/ETH",
  // },
  // {
  //   name: "Uniswap ALN-BOOST",
  //   code: "uni_aln_boost",
  //   order: 2,
  //   icon: "/images/aluna-icon.png",
  //   address: uniAlnBoostPool,
  //   tokenContract: uniAlnBoostToken,
  //   tokenTicker: "uni-aln-boost",
  //   open: false,
  //   underlyingToken: alunaToken,
  //   url:
  //     "https://app.uniswap.org/#/add/0x2cC98Ccee440Fb3fcD508761e5B2C29E17D4C737/0x0270d94f776F479306C6c44CF91aA24477C85772",
  // },
  // {
  //   name: "Balancer ALN-ETH",
  //   code: "bln_aln_eth",
  //   order: 3,
  //   icon: "/images/aluna-icon.png",
  //   address: balAlnEthPool,
  //   tokenContract: balAlnEthToken,
  //   tokenTicker: "bln-aln-eth",
  //   open: false,
  //   underlyingToken: alunaToken,
  //   url:
  //     "https://kovan.pools.balancer.exchange/#/pool/0x11d645e228bc87b2d208dcfe8a90b787de410d2d/",
  // },
];

export interface IPool {
  name: string;
  icon: string;
  code: string;
  boostEnabled?: boolean;
  order: number;
  address: string;
  tokenContract: string;
  poolSize: BN | null;
  poolPriceInUSD: number | null;
  periodStart?: BN | null;
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
        boostEnabled: pool.boostEnabled,
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
        boostEnabled: pool.boostEnabled,
        order: pool.order,
        address: pool.address,
        tokenContract: pool.tokenContract,
        tokenTicker: pool.tokenTicker,
        poolSize: poolStats?.poolSize ? new BN(poolStats?.poolSize) : null,
        poolPriceInUSD: poolPriceInUSD ? poolPriceInUSD : null,
        periodStart: poolStats?.periodStart
          ? new BN(poolStats.periodStart)
          : null,
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
