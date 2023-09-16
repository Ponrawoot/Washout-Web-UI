import React from "react";
import Navbar from "../navbar";

// Function component to generate a single row
function Branch({ BranchID, BranchName }) {
  return (
    <tr className="border border-gray-300">
      <td className="border border-gray-300 px-4 py-2 text-center">{BranchID}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{BranchName}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
          แก้ไข
        </button>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
          ลบ
        </button>
      </td>
    </tr>
  );
}

export default function BranchManagement() {

  const branches = [
    { BranchID: "202001", BranchName: "บรรทัดทอง" },
    { BranchID: "202002", BranchName: "สามย่าน" },
    { BranchID: "202003", BranchName: "สยาม" },
    { BranchID: "202004", BranchName: "บางนา" },

  ];

  return (
    <main className="bg-white">
      <Navbar username="Bass" />
      <div className="container p-10">
        <h1 className="text-lg">ระบบจัดการสาขา</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          เพิ่มสาขา
        </button>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">หมายเลขสาขา</th>
              <th className="border border-gray-300 px-4 py-2 w-3/5">ชื่อสาขา</th>
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <Branch
                key={index}
                BranchID={branch.BranchID}
                BranchName={branch.BranchName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
