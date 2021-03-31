import { useCallback, useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider'

export const useWeb3Presence = () => {
  const [present, setPresent] = useState<boolean>(false);
  const fetchWeb3Presence = useCallback(async () => {
    const provider = await detectEthereumProvider()
    if (provider) {
      setPresent(true)
    } else {
      setPresent(false)
    }
  }, []);

  useEffect(() => {
    fetchWeb3Presence();
    const refreshInterval = setInterval(fetchWeb3Presence, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchWeb3Presence]);

  return present;
};
