"use client";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Wallet } from "../configs/near-wallet";
import { isClient } from "../utils/next";

type GlobalContextState = {
  wallet: Wallet;
  isSignedIn: boolean | undefined;
};

const GlobalContext = createContext<GlobalContextState>({} as GlobalContextState);

export const useGlobalNearContext = () => useContext(GlobalContext);

const NearGlobalContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const wallet = useMemo(
    () =>
      new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
      }),
    []
  );
  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  useEffect(() => {
    if (isClient()) {
      wallet.startUp().then(setIsSignedIn);
    }
  }, [wallet]);

  // const NftCertificateContract = useMemo(() => {
  //   if (wallet && isSignedIn) {
  //     const contract = new NftCertificateNEAR({
  //       contractId: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
  //       walletToUse: wallet,
  //     });
  //     return contract;
  //   }
  //   return null;
  // }, [isSignedIn, wallet]);

  const contextValue = useMemo(() => {
    return { wallet, isSignedIn };
  }, [wallet, isSignedIn]);
  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export default NearGlobalContextProvider;
