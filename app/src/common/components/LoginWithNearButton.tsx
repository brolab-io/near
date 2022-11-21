import { Popover } from "@headlessui/react";
import Link from "next/link";
import { useGlobalNearContext } from "../contexts/NearGlobalContextProvider";
import Button from "./Button";
import LoadingSvg from "./LoadingSvg";
import { FaUserGraduate } from "react-icons/fa";

const LoginWithNearButton = () => {
  const { isSignedIn, wallet } = useGlobalNearContext();
  if (isSignedIn === undefined) {
    return <LoadingSvg />;
  }
  if (!isSignedIn) {
    return <Button onClick={wallet.signIn}>Login with NEAR</Button>;
  }
  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">
        <div className="flex items-center justify-center w-10 h-10 p-1 rounded-full shadow bg-white/30">
          <FaUserGraduate size={22} className="text-white " />
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 p-2 rounded-md bg-white/90">
        <ul className="flex flex-col gap-2 cursor-pointer text-primary min-w-fit">
          <li className="px-3 py-2 text-center text-white rounded-md bg-primary">
            {wallet.accountId}
          </li>
          <li className="px-3 py-2 hover:bg-gray-50">
            <Link href={"#"}>Profile</Link>
          </li>
          <li className="px-3 py-2 hover:bg-gray-50">
            <Link href={"/my-nfts"}>My Nfts</Link>
          </li>
          <li
            className="p-1 px-3 text-red-500 border-t-2 hover:bg-gray-50 border-t-gray-100"
            onClick={wallet.signOut}
          >
            Logout
          </li>
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export default LoginWithNearButton;
