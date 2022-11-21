import { NextApiRequest, NextApiResponse } from "next";
import { getNftContract } from "../../../common/services/near.connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const nftContract = await getNftContract();
  // @ts-ignore
  const nfts = await nftContract.nft_tokens();

  res.status(200).json({
    docs: nfts.map((item: any) => ({
      tokenId: item.token_id,
      // https://bafybeib275547ronzhv6en5ffgwotwh6742wkeoqvrabmqkcjcw7wnwwzm.ipfs.w3s.link/
      tokenURI:
        (item.metadata.media &&
          item.metadata.media.match(/https:\/\/(.*)\.ipfs\.w3s\.link/)?.[1]) ||
        "",
    })),
  });
}
