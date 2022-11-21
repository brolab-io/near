"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useNearCallback = (callbackUrl: string) => {
  const searchParams = useSearchParams();
  const navigation = useRouter();
  const pathname = usePathname();
  const errorMessage = searchParams.get("errorMessage");
  const transactionHashes = searchParams.get("transactionHashes");

  useEffect(() => {
    if (pathname) {
      if (errorMessage) {
        toast.error(decodeURIComponent(errorMessage));
        navigation.replace(pathname);
      }
      if (transactionHashes && callbackUrl) {
        toast.success("NFToken minted successfully");
        navigation.replace(callbackUrl);
      }
    }
  }, [callbackUrl, errorMessage, navigation, pathname, transactionHashes]);
};

export default useNearCallback;
