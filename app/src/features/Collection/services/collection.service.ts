import requester from "../../../common/configs/requester";
import { QueryFunctionContext } from "@tanstack/react-query";
import { PaginationResponse } from "../../../common/types/response";

type Collection = {
  collectionId: string;
  collectionName: string;
  owner: string;
  collectionThemeId: string;
  collectionURIs: string;
  createdAt: string;
};
export const getCollections = async (
  queryContext: QueryFunctionContext
): Promise<PaginationResponse<Collection>> => {
  // return requester.get("/collections", {
  //   params: queryContext.queryKey[1],
  // });
  return {
    docs: [
      {
        collectionId: "1",
        collectionName: "CUTE CATS",
        collectionThemeId: "1",
        collectionURIs: "bafkreihlmyzbouq3ninzkgx633fnjkrr6nq7f5nhdxxnsezlo65kzqytpu",
        createdAt: "2022-11-19T14:51:04.881Z",
        owner: "0x5464B7c4be57D23548C3e366221E939ce1e22428",
      },
    ],
    totalDocs: 1,
    limit: 9,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  };
};

export const getCollection = async (queryContext: QueryFunctionContext): Promise<Collection> => {
  // const [, field, value] = queryContext.queryKey;
  // return requester.get(`/collections/${field}/${value}`);
  return {
    collectionId: "1",
    collectionName: "CUTE CATS",
    collectionThemeId: "1",
    collectionURIs: "bafkreihlmyzbouq3ninzkgx633fnjkrr6nq7f5nhdxxnsezlo65kzqytpu",
    createdAt: "2022-11-19T14:51:04.881Z",
    owner: "xtrongx01.testnet",
  };
};

export const fetchCollection = async (field: string, value: string): Promise<Collection> => {
  // const url = `${process.env.LOCAL_API_URL}/collections/${field}/${value}`;
  // return fetch(url).then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return null;
  // });
  return {
    collectionId: "1",
    collectionName: "CUTE CATS",
    collectionThemeId: "1",
    collectionURIs: "bafkreihlmyzbouq3ninzkgx633fnjkrr6nq7f5nhdxxnsezlo65kzqytpu",
    createdAt: "2022-11-19T14:51:04.881Z",
    owner: "xtrongx01.testnet",
  };
};
