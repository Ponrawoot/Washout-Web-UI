
export default function MachineManagement() {
  return (
    <div className="text-black py-[80px] px-[50px] space-y-[20px]">
      <p>ระบบจัดการเครื่องซักผ้า</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        เพิ่มเครื่อง
      </button>
      <table className="table-auto border-collapse border-4 border-slate-500 border-si">
        <thead>
          <tr>
            <th className="border-4 border-slate-500 p-[30px] bg-slate-200">
              หมายเลข
            </th>
            <th className="border-4 border-slate-500 p-[30px] bg-slate-200">
              สาขา
            </th>
            <th className="border-4 border-slate-500 p-[30px] bg-slate-200">
              ประเภท
            </th>
            <th className="border-4 border-slate-500 p-[30px] bg-slate-200"></th>
            <th className="border-4 border-slate-500 p-[30px] bg-slate-200"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-500 p-[30px]">1</td>
            <td className="border border-slate-500 p-[30px]">สี่พระยา</td>
            <td className="border border-slate-500 p-[30px]">16kg</td>
            <td className="border border-slate-500 p-[30px]">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                แก้ไข
              </button>
            </td>
            <td className="border border-slate-500 p-[30px]">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                ลบ
              </button>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-500 p-[30px]">2</td>
            <td className="border border-slate-500 p-[30px]">จามจุรี สแควร์</td>
            <td className="border border-slate-500 p-[30px]">20kg</td>
            <td className="border border-slate-500 p-[30px]">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                แก้ไข
              </button>
            </td>
            <td className="border border-slate-500 p-[30px]">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                ลบ
              </button>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-500 p-[30px]">3</td>
            <td className="border border-slate-500 p-[30px]">จามจุรี สแควร์</td>
            <td className="border border-slate-500 p-[30px]">20kg</td>
            <td className="border border-slate-500 p-[30px]">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                แก้ไข
              </button>
            </td>
            <td className="border border-slate-500 p-[30px]">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                ลบ
              </button>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-500 p-[30px]">4</td>
            <td className="border border-slate-500 p-[30px]">จามจุรี สแควร์</td>
            <td className="border border-slate-500 p-[30px]">20kg</td>
            <td className="border border-slate-500 p-[30px]">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                แก้ไข
              </button>
            </td>
            <td className="border border-slate-500 p-[30px]">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                ลบ
              </button>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-500 p-[30px]">5</td>
            <td className="border border-slate-500 p-[30px]">จามจุรี สแควร์</td>
            <td className="border border-slate-500 p-[30px]">Any</td>
            <td className="border border-slate-500 p-[30px]">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                แก้ไข
              </button>
            </td>
            <td className="border border-slate-500 p-[30px]">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                ลบ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
