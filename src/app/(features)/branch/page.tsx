// import Navbar from "../navbar";

function Branch(props: { branchId: any; branchName: any; }) {
  const { branchId, branchName } = props;
  return (
    <tr className="border border-gray-300">
      <td className="border border-gray-300 px-4 py-2 text-center">{branchId}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{branchName}</td>
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
  return (
    <main className="bg-white">
      {/* <Navbar username="Bass" /> */}
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
            <Branch branchId="202001" branchName="สยาม" />
            <Branch branchId="202002" branchName="พระราม 2" />
            <Branch branchId="202003" branchName="อโศก" />
            <Branch branchId="202004" branchName="บางนา" />
          </tbody>
        </table>
      </div>
    </main>
  );
}
