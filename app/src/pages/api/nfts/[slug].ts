import { NextApiRequest, NextApiResponse } from "next";
import { getNftContract } from "../../../common/services/near.connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add cors headers *
  res.setHeader("Access-Control-Allow-Origin", "*");
  const nftContract = await getNftContract();
  const tokenId = req.query.slug;
  // @ts-ignore
  const nfts = await nftContract.nft_tokens();
  const token = nfts.find((item: any) => item.token_id === tokenId);
  if (!token) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }

  res.status(200).json(token);
}
