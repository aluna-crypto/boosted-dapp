import React from "react";
import { StatBox } from "./StatBox";
import { alunaToken } from "../../constants/tokenAddresses";
import { useTokenBalance } from "src/hooks/useTokenBalance";
// import { useTotalSupply } from "src/hooks/useTotalSupply";
import { useTreasuryBalance } from "src/hooks/useTreasuryBalance";
import { useTotalValueLocked } from "src/hooks/useTotalValueLocked";
import { useGetTotalRewardAmount } from "src/hooks/useGetTotalRewardAmount";
// import { useBoostPrice } from "src/hooks/useBoostPrice";
import { useAlunaPrice } from "src/hooks/useAlunaPrice";
import { Stack } from "@chakra-ui/core";
import { getDisplayBalance } from "src/utils/formatBalance";

export const Stats: React.FC = () => {
  const alunaBalance: string = getDisplayBalance(useTokenBalance(alunaToken));
  const totalRewardsAvailable: string = getDisplayBalance(
    useGetTotalRewardAmount()
  );
  // irrelevant to show ALN total supply as it's fixed at 10.000.000
  // const boostTotalSupply: string = getDisplayBalance(useTotalSupply());
  const treasuryBalance: string = getDisplayBalance(useTreasuryBalance());
  const totalValueLocked: string = useTotalValueLocked();
  // const boostPrice: string = useBoostPrice();
  const alunaPrice: string = useAlunaPrice();

  return (
    <Stack
      direction={["row", "row", "column"]}
      spacing={4}
      mr={4}
      mt={4}
      flexDirection={["row", "row", "column"]}
      overflow={["scroll"]}
    >
      <StatBox title="BALANCE" value={alunaBalance} tokenTicker={"ALN"} />
      <StatBox
        title="READY FOR CLAIM"
        value={totalRewardsAvailable}
        tokenTicker={"ALN"}
      />
      <StatBox
        title="TOTAL VALUE LOCKED"
        tokenTicker={"USD"}
        value={totalValueLocked}
      />
      {/* <StatBox title="B00ST PRICE" tokenTicker={"USD"} value={boostPrice} /> */}
      <StatBox title="ALUNA PRICE" tokenTicker={"USD"} value={alunaPrice} />
      {/* <StatBox
        title="TOTAL SUPPLY"
        value={boostTotalSupply}
        tokenTicker={"BOOST"}
      /> */}
      <StatBox
        title="TREASURY VALUE"
        tokenTicker={"USD"}
        value={treasuryBalance}
      />
    </Stack>
  );
};
