import { createContext, useEffect, useMemo, useState } from "react"
import { useGetUserInfo } from "../api/users";

import { UserWallet } from "../types/types";

interface Web3Config {
  wallet: UserWallet | null;
  setWallet: (wallet: UserWallet | null) => void;
};

export const Web3Context = createContext<Web3Config>({
  wallet: null,
  setWallet: () => {},
});

export const Web3Provider = ({ children }: { children: any }) => {
  const [wallet, setWallet] = useState<UserWallet | null>(null);
  const { userInfo } = useGetUserInfo();

  useEffect(() => {
    if(userInfo) {
      setWallet(userInfo.wallet);
    }
  }, [setWallet, userInfo])

  const contextValues = useMemo(() => {
    return {
      wallet,
      setWallet,
    };
  }, [wallet]);

  return (
    <Web3Context.Provider value={contextValues}>
      {children}
    </Web3Context.Provider>
  )
}