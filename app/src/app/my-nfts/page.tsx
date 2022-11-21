"use client";
import BreadCrumb from "../../common/components/Breadcrumb";
import Container from "../../common/components/Container";
import { useGlobalNearContext } from "../../common/contexts/NearGlobalContextProvider";
import NftList from "../../features/Nft/components/NftList";

const breadCrumbItems = [
  {
    href: "/my-nfts",
    label: "My Nfts",
  },
];

const MyNftsPage = () => {
  const { wallet } = useGlobalNearContext();
  if (!wallet.accountId) {
    return null;
  }
  return (
    <Container className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="flex items-center justify-between mb-[61px]">
        <BreadCrumb items={breadCrumbItems} />
      </div>
      <NftList needLogin owner={wallet.accountId} />
    </Container>
  );
};

export default MyNftsPage;
