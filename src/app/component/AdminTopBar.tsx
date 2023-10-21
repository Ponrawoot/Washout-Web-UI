"use client";
import { useRouter } from "next/navigation";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useState, useEffect } from "react";

export default function AdminTopBar() {
  const router = useRouter();
  const [isBranchPage, setIsBranchPage] = useState(false)
  const [isStaffPage, setIsStaffPage] = useState(false)
  const [isMachinePage, setIsMachinePage] = useState(false)

  useEffect(() => {
    // Update page states based on the current route
    setIsBranchPage(window.location.pathname === '/branch');
    setIsStaffPage(window.location.pathname === '/staff');
    setIsMachinePage(window.location.pathname === '/machine');
  }, []);

  const handleBranchIconClick = () => {
    setIsBranchPage(true);
    setIsStaffPage(false);
    setIsMachinePage(false);
    router.replace("/branch");
  };

  const handleStaffIconClick = () => {
    setIsStaffPage(true);
    setIsBranchPage(false);
    setIsMachinePage(false);
    router.replace("/staff");
  };

  const handleMachineIconClick = () => {
    setIsMachinePage(true);
    setIsStaffPage(false);
    setIsBranchPage(false);
    router.replace("/machine");
  };

  return (
    <div className="bg-primary-blue p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <LocalConvenienceStoreIcon
              className={`w-10 h-10 mr-4 ml-4 hover:text-gray-600 ${isBranchPage ? 'text-gray-600' : ''}`}
              onClick={handleBranchIconClick}
            />
            <ManageAccountsIcon
              className={`w-10 h-10 mr-4 ml-4 hover:text-gray-600 ${isStaffPage ? 'text-gray-600' : ''}`}
              onClick={handleStaffIconClick}
            />
            <LocalLaundryServiceIcon
              className={`w-10 h-10 mr-4 ml-4 hover:text-gray-600 ${isMachinePage ? 'text-gray-600' : ''}`}
              onClick={handleMachineIconClick}
            />
          </div>
          <ul className="flex space-x-4 items-center">
            <li>
              <p>ผู้ดูแลระบบ</p>
            </li>
            <li>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"></div>
            </li>
            <li>
          <button onClick={() =>router.replace("/login")}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}