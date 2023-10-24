"use client";
import { useRouter } from "next/navigation";
export default function StaffTopBar() {
  const router = useRouter();
    return (
      <nav className="bg-primary-blue p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
              <div className="text-black text-xl">
                  <p>สาขา สี่พระยา</p>
              </div>
            <ul className="flex space-x-4 items-center">
            <li>
                <p>Staff01</p>
              </li>
            <li>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  </div>
              </li>
              <li>
          <button onClick={() =>router.replace("/login")}>Log Out</button>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };