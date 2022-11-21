"use client";
import { useQuery } from "@tanstack/react-query";
import { utils } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useGlobalNearContext } from "../../../common/contexts/NearGlobalContextProvider";
import { getMarketNfts, getNfts } from "../services/nft.service";

type Props = {
  owner?: string;
  orderBy?: string;
  paginationEnabled?: boolean;
  limit?: number;
  collectionId?: string;
  isMarket?: boolean;
  needLogin?: boolean;
};

const NftList: React.FC<Props> = ({
  owner,
  orderBy,
  paginationEnabled,
  limit,
  collectionId,
  isMarket,
  needLogin,
}) => {
  const { wallet } = useGlobalNearContext();
  const [nfts, setNfts] = useState<any[]>([]);
  useEffect(() => {
    if (needLogin) {
      if (wallet.accountId) {
        wallet
          .viewMethod({
            contractId: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
            method: "nft_tokens_for_owner",
            args: {
              account_id: wallet.accountId,
            },
          })
          .then((res) => {
            console.log(res);
            setNfts(res);
          });
      }
      //
    } else {
      console.log(wallet);
      if (wallet.walletSelector) {
        wallet
          .viewMethod({
            contractId: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
            method: "nft_tokens",
            args: {},
          })
          .then((res) => {
            console.log(res);
            setNfts(res);
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.accountId, wallet.walletSelector]);

  return (
    <div className="grid gap-8 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {nfts.map((nft) => (
        <Link
          key={nft.token_id}
          href={
            isMarket && "marketId" in nft ? `/marketplace/${nft.marketId}` : `/nfts/${nft.token_id}`
          }
        >
          <div className="bg-[#22B78F]/10 border-2 border-primary p-5 space-y-5 w-full">
            <div className="aspect-square bg-gray-500/20">
              <Image
                src={`/api/imageProxy?imageUrl=${nft.metadata.media}`}
                alt="Gallery"
                width={290}
                height={290}
                className="object-cover aspect-square"
              />
            </div>
            <div className="w-full truncate text-white font-bold text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px]">
              {nft.metadata.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NftList;
