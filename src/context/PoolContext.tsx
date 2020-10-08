import BN from "bignumber.js";
import React, {
  createContext,



  useCallback, useContext,
  useEffect, useState
} from "react";
import {
  getBalancerAPY,
  getBalancerPoolPriceInUSD, getBoostPoolV2PriceInUSD, getBoostV2Apy, getPoolStats
} from "src/utils/boost";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { usePriceFeedContext } from "./PriceFeedContext";

export const ALL_POOLS = [
  // {
  //   name: "BOOST-ETH (Uniswap BOOST-ETH)",
  //   code: "boost_pool",
  //   order: 0,
  //   icon: "/images/boost-icon.png",
  //   address: uniswapPool,
  //   tokenContract: uniswapLPToken,
  //   tokenTicker: "boost-eth-lp",
  //   open: false,
  // },
  // {
  //   name: "Yearn Alpha (YFI)",
  //   code: "yfi_pool",
  //   order: 0,
  //   icon: "/images/yfi-icon.png",
  //   address: yfiPool,
  //   tokenContract: yfiToken,
  //   tokenTicker: "yfi",
  //   open: false,
  // },
  // {
  //   name: "Omakase (SUSHI)",
  //   code: "eth_pool",
  //   order: 1,
  //   icon: "/images/sushi-icon.png",
  //   address: sushiPool,
  //   tokenContract: sushiToken,
  //   tokenTicker: "sushi",
  //   open: false,
  // },
  // {
  //   name: "Band Wagons (BAND)",
  //   code: "band_pool",
  //   order: 2,
  //   icon: "/images/band-icon.svg",
  //   address: bandPool,
  //   tokenContract: bandToken,
  //   tokenTicker: "band",
  //   open: false,
  // },
  // {
  //   name: "Kyber Corp (KNC)",
  //   code: "knc_pool",
  //   order: 3,
  //   icon: "/images/knc-logo.svg",
  //   address: kncPool,
  //   tokenContract: kncToken,
  //   tokenTicker: "knc",
  //   open: false,
  // },
  // {
  //   name: "Compound Soils (COMP)",
  //   code: "comp_pool",
  //   order: 4,
  //   icon: "/images/comp-logo.svg",
  //   address: compPool,
  //   tokenContract: compToken,
  //   tokenTicker: "comp",
  //   open: false,
  // },
  // {
  //   name: "Marine Corps (LINK)",
  //   code: "link_pool",
  //   order: 5,
  //   icon: "/images/link-logo.svg",
  //   address: linkPool,
  //   tokenContract: linkToken,
  //   tokenTicker: "link",
  //   open: false,
  // },
  // {
  //   name: "Aave Nauts (LEND)",
  //   code: "lend_pool",
  //   order: 6,
  //   icon: "/images/lend-logo.svg",
  //   address: lendPool,
  //   tokenContract: lendToken,
  //   tokenTicker: "lend",
  //   open: false,
  // },
  // {
  //   name: "Synth Spartans (SNX)",
  //   code: "snx_pool",
  //   order: 7,
  //   icon: "/images/snx-logo.svg",
  //   address: snxPool,
  //   tokenContract: snxToken,
  //   tokenTicker: "snx",
  //   open: false,
  // },
  // {
  //   name: "Maker Mountain (MKR)",
  //   code: "mkr_pool",
  //   order: 8,
  //   icon: "/images/mkr-logo.svg",
  //   address: mkrPool,
  //   tokenContract: mkrToken,
  //   tokenTicker: "mkr",
  //   open: false,
  // },
  // {
  //   name: "Ren Moon (REN)",
  //   code: "ren_pool",
  //   order: 8,
  //   icon: "/images/ren-logo.svg",
  //   address: renPool,
  //   tokenContract: renToken,
  //   tokenTicker: "ren",
  //   open: false,
  // },
  {
    name: "Aluna (ALN)",
    code: "aluna_pool",
    order: 1,
    icon: "/images/uni-logo.png",
    address: '0x4C4a7feb5f3A7601444941081EEfeAA56Da86053', //uniBoostPool,
    tokenContract: '0x358704048Ce7e406594BFE37b4E4867228c1A6E6',//uniswapBoostToken,
    tokenTicker: "aln",
    open: true,
    underlyingToken: '0x358704048Ce7e406594BFE37b4E4867228c1A6E6',
    url:
      "https://pools.balancer.exchange/#/pool/0x004e74ff81239c8f2ec0e2815defb970f3754d86",
  },
  // {
  //   name: "Wifey (YFI-BOOST)",
  //   code: "yfi_boost_pool",
  //   order: 10,
  //   icon: "/images/yfi-icon.png",
  //   address: yfiBoostPool,
  //   tokenContract: yfiBoostToken,
  //   tokenTicker: "yfi-boost-blp",
  //   open: true,
  //   underlyingToken: yfiToken,
  //   url:
  //     "https://pools.balancer.exchange/#/pool/0xd3a38eaeae085b04d4da3614c870c3b985067c40",
  // },
  // {
  //   name: "Creampie (CREAM-BOOST)",
  //   code: "cream_boost_pool",
  //   order: 11,
  //   icon: "/images/cream-logo.png",
  //   address: creamBoostPool,
  //   tokenContract: creamBoostToken,
  //   tokenTicker: "cream-boost-blp",
  //   open: true,
  //   underlyingToken: creamToken,
  //   url:
  //     "https://pools.balancer.exchange/#/pool/0xafd541e91b5bf792ae36f7ea1213c878e6feb1d3",
  // },
  // {
  //   name: "Sushi (SUSHI-BOOST)",
  //   code: "sushi_boost_pool",
  //   order: 12,
  //   icon: "/images/sushi-icon.png",
  //   address: sushiBoostPool,
  //   tokenContract: sushiBoostToken,
  //   tokenTicker: "sushi-boost-blp",
  //   open: true,
  //   underlyingToken: sushiToken,
  //   url:
  //     "https://pools.balancer.exchange/#/pool/0x53b0a526e67aec8f151297f8b6b20d0d8a7b9129",
  // },
  // {
  //   name: "Stability (USDC-BOOST)",
  //   code: "usdc_boost_pool",
  //   order: 13,
  //   icon: "/images/usdc-logo.png",
  //   address: usdcBoostPool,
  //   tokenContract: usdcBoostToken,
  //   tokenTicker: "usdc-boost-blp",
  //   open: true,
  //   underlyingToken: usdcToken,
  //   url:
  //     "https://pools.balancer.exchange/#/pool/0xc0f0ab9767ec5117cc640127255fad744ddc55b0",
  // },
  // {
  //   name: "OG (ETH-BOOST V2)",
  //   code: "eth_boost_v2_pool",
  //   order: 14,
  //   icon: "/images/boost-icon.png",
  //   address: uniswapPoolV2,
  //   tokenContract: uniswapLPToken,
  //   tokenTicker: "boost-eth-lp",
  //   open: true,
  //   underlyingToken: wethToken,
  //   url:
  //     "https://app.uniswap.org/#/add/ETH/0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78",
  // },
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
