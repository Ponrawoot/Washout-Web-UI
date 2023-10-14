"use client";
import { useState } from "react";

export default function LockerManagement() {
  const [locker, setLocker] = useState([
    { LockerID: "1", Status: "ว่าง", UID: "-" },
    {
      LockerID: "2",
      Status: "กำลังใช้งาน",
      UID: "f09bc70e-5f88-428a-938d-eb4ac0fad712",
    },
    { LockerID: "3", Status: "ว่าง", UID: "-" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showTransferToModal, setShowTransferToModal] = useState(false);
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [lockerToTransfer, setLockerToTransfer] = useState({
    LockerID: "",
    Status: "",
    UID: "",
  });
  const [lockerToFree, setLockerToFree] = useState({
    LockerID: "",
    Status: "",
    UID: "",
  });

  const [searchQuery, setSearchQuery] = useState("");


  const handleModifiedLocker = (
    ID: string,
    editedStatus: string,
    editedUID: string
  ) => {
    const updatedLocker = locker.map((specificLocker: {LockerID:string, Status:string, UID:string}) => {
      if (specificLocker.LockerID === ID) {
        return { ...specificLocker, Status: editedStatus, UID: editedUID };
      }
      return specificLocker;
    });
    setLocker(updatedLocker);
  };

  const handleTransferClick = (locker: {LockerID:string, Status:string, UID:string}) => {
    setLockerToTransfer(locker);
    setShowTransferToModal(true);
  };

  const handleFreeClick = (locker: {LockerID:string, Status:string, UID:string}) => {
    setLockerToFree(locker);
    setShowFreeModal(true);
  };

  // const handleAddMachine = (newMachine: { MachineID: string, MachineType: string, Branch: string}) => {
  //   setMachine([...machine, newMachine]);
  //   setShowAddModal(false);
  // };

  return (
    <main className="bg-white">
      <div className="container p-10">
        <h1 className="text-lg">จัดการตู้เก็บผ้า</h1>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">หมายเลข</th>
              <th className="border border-gray-300 px-4 py-2 w-2/5">สถานะ</th>
              <th className="border border-gray-300 px-4 py-2">UID</th>
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {locker.map((locker) => (
              <tr key={locker.LockerID} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {locker.LockerID}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {locker.Status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {locker.UID}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${
                      locker.Status === "กำลังใช้งาน"
                        ? "bg-gray-300 pointer-events-none"
                        : ""
                    }`}
                    disabled={locker.Status === "กำลังใช้งาน"}
                    onClick={() => handleTransferClick(locker)}
                  >
                    ย้ายผ้า
                  </button>
                  
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${
                      locker.Status === "ว่าง"
                        ? "bg-gray-300 pointer-events-none"
                        : ""
                    }`}
                    disabled={locker.Status === "ว่าง"}
                    onClick={() => handleFreeClick(locker)}
                  >
                    คืนผ้า
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showTransferToModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <TransferToLockerModal
          locker={lockerToTransfer}
          onSave={() => {
            handleModifiedLocker(lockerToTransfer.LockerID,"กำลังใช้งาน","f09bc70e-5f88-428a-938d-eb4ac0fad712")
          }}
          onClose={() => setShowTransferToModal(false)}
        />
        </div>
      )}
      {showFreeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <FreeLockerModal
          locker={lockerToFree}
          onSave={() => {
            handleModifiedLocker(lockerToFree.LockerID,"ว่าง","-")
            setShowFreeModal(false);
          }}
          onClose={() => setShowFreeModal(false)}
        />
        </div>
      )}
    </main>
  );
}


function TransferToLockerModal({
  locker,
  onSave,
  onClose,
}: {
  locker: { LockerID: string; Status: string; UID: string };
  onSave: (LockerID: string, Status: string, UID: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">ย้ายผ้า</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>หมายเลขเครื่องซักผ้า</p>
          <p className="font-semibold">หมายเลขตู้เก็บผ้า {locker.LockerID}</p>
        </div>
        <div className="modal-footer">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              onSave(locker.LockerID,locker.Status,locker.UID);
              onClose();
            }}
          >
            ยืนยัน
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
            onClick={onClose}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

function FreeLockerModal({
  locker,
  onSave,
  onClose,
}: {
  locker: { LockerID: string; Status: string; UID: string };
  onSave: (LockerID: string, Status: string, UID: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">คืนผ้า</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>กรุณาตรวจสอบ uid ก่อนทำการคืนผ้า</p>
          <p className="font-semibold">{locker.UID}</p>
        </div>
        <div className="modal-footer">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              onSave(locker.LockerID,locker.Status,locker.UID);
              onClose();
            }}
          >
            ยืนยัน
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
            onClick={onClose}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
