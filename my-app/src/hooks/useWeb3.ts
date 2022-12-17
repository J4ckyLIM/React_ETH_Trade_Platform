import { useContext } from "react";
import { Web3Context } from "../contexts";

export const useWeb3 = () => {
  const { wallet, setWallet } = useContext(Web3Context);
  return {
    wallet,
    setWallet
  }
}