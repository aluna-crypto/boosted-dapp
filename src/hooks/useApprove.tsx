import { useCallback } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { approve } from "src/utils/boost";

export const useApprove = (tokenContract: string, poolAddress: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(ethereum, tokenContract, poolAddress, account);
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, tokenContract, poolAddress, ethereum]);

  return {
    onApprove: handleApprove,
  };
};
