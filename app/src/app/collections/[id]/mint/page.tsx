"use client";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BoxFrame from "../../../../common/components/BoxFrame";
import BreadCrumb from "../../../../common/components/Breadcrumb";
import Button from "../../../../common/components/Button";
import Container from "../../../../common/components/Container";
import LableInput from "../../../../common/components/LableInput";
import Select from "../../../../common/components/Select";
import { usePathname, useRouter } from "next/navigation";
import { getTxMessage } from "../../../../common/utils/tx";
import { useGlobalNearContext } from "../../../../common/contexts/NearGlobalContextProvider";
import { randomUniqueString } from "../../../../common/utils/string";
import useNearCallback from "../../../../common/hooks/useNearCallback";
import { utils } from "near-api-js";
import { uploadFileToIpfs } from "../../../../common/services/upload.service";

type FormValues = {
  name: string;
  files: FileList;
  collectionId: string;
  // tokenPower: string;
};

const breadCrumbItems = [
  {
    label: "Create An Nft",
  },
];

const selectOptions = [
  {
    value: "1",
    label: "Theme 1",
  },
  {
    value: "2",
    label: "Theme 2",
  },
];

type Props = {
  params: {
    id: string;
  };
};

const MintNftPage = ({ params: { id: collectionId } }: Props) => {
  const { register, handleSubmit, control, watch } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>();
  const { wallet } = useGlobalNearContext();
  const pathname = usePathname();

  useNearCallback((pathname && pathname.replace("/mint", "/nfts")) || "");

  const selectFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      console.log(data);
      if (!wallet.accountId) {
        return;
      }

      let toastId: ReturnType<typeof toast> | null = null;
      setIsLoading(true);
      try {
        toastId = toast.info("Uploading file to IPFS...", {
          autoClose: false,
        });
        const { cid } = await uploadFileToIpfs(data.files[0]);
        // const cid = "bafybeib275547ronzhv6en5ffgwotwh6742wkeoqvrabmqkcjcw7wnwwzm";
        toast.update(toastId, {
          render: "Creating NFT, please wait...",
        });
        const args = {
          token_id: `bro-${collectionId}-${randomUniqueString(8)}`,
          receiver_id: wallet.accountId,
          metadata: {
            title: data.name,
            description: `This is a ${data.name} NFT`,
            media: `https://${cid}.ipfs.w3s.link/`,
            issued_at: Math.floor(Date.now() / 1000),
            extra: JSON.stringify({ issued_by: "Brolab" }),
          },
        };

        await wallet.callMethod({
          contractId: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
          method: "nft_mint",
          args,
          deposit: utils.format.parseNearAmount("0.01")!,
        });
      } catch (error) {
        if (toastId) {
          toast.update(toastId, {
            render: getTxMessage(error),
            type: "error",
            autoClose: 3000,
          });
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [collectionId, wallet]
  );

  const { ref: fileRef, ...fields } = register("files");

  const files = watch("files");

  return (
    <Container className="pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20">
      <BreadCrumb items={breadCrumbItems} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 text-white">
        <b className="text-[24px] mt-[29px] lg:mt-[58px]">Import Image, Video or Audio *</b>
        <span className="text-[24px] font-light">
          File types supported: JPG, PNG, GIF, SVG, MP3, WAV, MP4. Max size: 50 MB
        </span>
        <BoxFrame className="flex justify-center py-[164px] relative overflow-hidden">
          {files && files.length > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="SelectedFile"
              src={URL.createObjectURL(files[0])}
              className="absolute inset-y-0 object-contain -translate-x-1/2 left-1/2"
            />
          )}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <Button onClick={selectFile}>Upload File</Button>
          </div>
        </BoxFrame>
        <LableInput
          label="Name *"
          placeholder="Eg this is a Title"
          {...register("name", {
            required: "Name is required",
          })}
        />
        <input
          type="file"
          ref={(ref) => {
            fileRef(ref);
            fileInputRef.current = ref || undefined;
          }}
          {...fields}
          accept="image/*,video/*,audio/*"
          className="hidden"
        />
        <Select
          control={control}
          options={selectOptions}
          label="Select Gallery Theme *"
          placeholder="Select Theme"
          {...register("collectionId")}
        />
        {/* <LableInput
          label="Token Power"
          type="number"
          placeholder="Input token power"
          {...register("tokenPower", {
            min: {
              value: 0,
              message: "Token power must be equal or greater than 0",
            },
            max: {
              value: 1000000,
              message: "Token power must be equal or less than 1000000",
            },
          })}
        /> */}
        <Button className="self-start" type="submit" disabled={isLoading}>
          <span className="ml-2">{isLoading ? "Creating..." : "Create New"}</span>
        </Button>
      </form>
    </Container>
  );
};

export default MintNftPage;
