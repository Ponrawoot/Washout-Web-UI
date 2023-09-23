"use client";
import { useRouter } from "next/navigation";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export default function AdminTopBar() {
  const router = useRouter();
  return (
    <div className="bg-primary-blue p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <LocalConvenienceStoreIcon
              className="w-10 h-10 mr-4 ml-4 hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                router.replace("/branch");
              }}
            />
            <ManageAccountsIcon
              className="w-10 h-10 mr-4 ml-4 hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                router.replace("/staff");
              }}
            />
            <LocalLaundryServiceIcon
              className="w-10 h-10 ml-4 hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                router.replace("/machine");
              }}
            />
          </div>
          <ul className="flex space-x-4 items-center">
            <li>
              <p>ผู้ดูแลระบบ</p>
            </li>
            <li>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}