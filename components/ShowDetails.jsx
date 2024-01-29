import { useUserContext } from "@/providers/UserContext";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineFileUpload } from "react-icons/md";

export default function ShowDetails() {
  const { address, data, balance } = useUserContext();
  // console.log(balance);

  return (
    <div className="md:flex w-full mb-2 p-3 md:justify-between md:px-20 border-b-2">
      <div className="md:justify-end gap-2 mb-4">
        <Link href="/" className="flex flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>
        <div className="flex-center gap-1.5">
          {address ? (
            <p className="text-2xl font-bold text-center">
              {address.slice(0, 2)}...{address.slice(-2)}
            </p>
          ) : (
            <p className="text-2xl font-bold text-center">demo.eth</p>
          )}
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-1xl font-semibold text-gray-300 text-center">
            0 followers
          </p>
          <p className="text-1xl font-semibold text-gray-300 text-center">
            0 following
          </p>
        </div>
      </div>
      <div className="w-full md:w-[30%] md:justify-end items-center">
        <div className="flex gap-2 justify-end align-bottom px-3">
          <div className="text-1xl font-semibold rounded-lg p-2 bg-purple-500 hover:bg-purple-600 text-white cursor-pointer ">
            Follow
          </div>
          <div className="text-1xl font-semibold rounded-md p-2 bg-gray-300 hover:bg-gray-400 text-white hover:text-gray-50 cursor-pointer">
            Send
          </div>
          <div className="text-2xl font-bold rounded-md p-2 bg-gray-300 hover:bg-gray-400 text-white hover:text-gray-50 cursor-pointer">
            <MdOutlineFileUpload />
          </div>
        </div>
        <div className="m-3 p-3 bg-gray-400 rounded-xl overflow-hidden">
          <p className="text-1xl lg:text-2xl text-gray-50">Net Worth</p>
          <p className="text-2xl lg:text-4xl text-gray-50 font-semibold">
            ${balance}
          </p>
          <div className="hidden lg:flex gap-1 justify-start mt-2">
            <div className="text-gray-50 bg-gray-300 hover:bg-gray-200 hover:text-purple-500 rounded-md px-2 py-1 cursor-pointer">
              Wallet
            </div>
            <div className="text-gray-50 bg-gray-300 hover:bg-gray-200 hover:text-purple-500 rounded-md px-2 py-1 cursor-pointer">
              Balance
            </div>
            <div className="text-gray-50 bg-gray-300 hover:bg-gray-200 hover:text-purple-500 rounded-md px-2 py-1 cursor-pointer">
              Other
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
