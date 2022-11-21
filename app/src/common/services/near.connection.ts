import { connect, Near, Contract } from "near-api-js";

const connectionConfig = {
  networkId: "testnet",
  // keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

let nearConnection: Near | null = null;
let nftContract: Contract | null = null;

export async function getNearConnection() {
  if (!nearConnection) {
    nearConnection = await connect(connectionConfig);
  }
  return nearConnection;
}

export async function getNftContract() {
  if (!nftContract) {
    if (!nearConnection) {
      nearConnection = await connect(connectionConfig);
    }
    return new Contract(
      await nearConnection.account("nft1.metagallery.testnet"),
      process.env.NEXT_PUBLIC_NFT_CONTRACT!,
      {
        viewMethods: ["nft_tokens"],
        changeMethods: [],
      }
    );
  }
  return nftContract;
}
