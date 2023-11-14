"use client";
import { useRouter } from "next/navigation";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
export default function StaffTopBar() {
  function getProfileInitials(name:string) {
    return name.charAt(0).toUpperCase();
  }

  function topBar(staffName:string) {
    const profileInitials = getProfileInitials(staffName);

    return (
      <nav className="bg-primary-blue p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <LocalConvenienceStoreIcon className={`w-10 h-10 mr-4 ml-4`} />
            <div className="text-black text-xl">
              <p>Washout locker management</p>
            </div>
            <ul className="flex space-x-4 items-center">
              <li>
                <p>{staffName}</p>
              </li>
              <li>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <p className="text-black">{profileInitials}</p>
                </div>
              </li>
              <li>
                <button onClick={() => router.replace("/login")}>Log Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  const router = useRouter();
  return topBar("Staff");
}