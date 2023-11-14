"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface LocalLocker {
  id: string;
  Status: string;
  orderId: string;
}

interface ApiLocker {
  id: string;
  branchId: string;
  orderId: string;
}

interface Machine {
  id: string;
  branchId: string;
  status: string;
  machineType: string;
  isOpen: boolean;
  remainingTime: number;
  currentOrder: string;
}

export default function LockerManagement() {
  const [locker, setLocker] = useState<LocalLocker[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [showTransferToModal, setShowTransferToModal] = useState(false);
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [lockerToTransfer, setLockerToTransfer] = useState<LocalLocker>({
    id: "",
    Status: "",
    orderId: "",
  });
  const [lockerToFree, setLockerToFree] = useState<LocalLocker>({
    id: "",
    Status: "",
    orderId: "",
  });

  const fetchLockerData = async () => {
    try {
      const branchId = localStorage.getItem('staff_branch');
      const accessToken = localStorage.getItem('access_token');

      if (branchId && accessToken) {
        const response = await axios.get(
          `http://localhost:3001/api/lockers/${branchId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Fetch locker data successfully");
          const lockersFromApi: LocalLocker[] = response.data.lockers.map(
            (apiLocker: ApiLocker) => ({
              id: apiLocker.id,
              Status: apiLocker.orderId === "no order" ? "ว่าง" : "กำลังใช้งาน",
              orderId: apiLocker.orderId,
            })
          );
          setLocker(lockersFromApi);
        } else {
          console.error("Failed to fetch locker data");
        }
      } else {
        console.error("Branch ID or access token not found in local storage");
      }
    } catch (error) {
      console.error("Error fetching locker data:", error);
    }
  };

  const updateLocker = async (lockerId: string, machineId: string) => {
    try {
      const branchId = localStorage.getItem("staff_branch");
      const accessToken = localStorage.getItem("access_token");

      if (branchId && accessToken) {
        const response = await axios.put(
          `http://localhost:3001/api/lockers/moveClothe`,
          {
            machineId: machineId,
            lockerId: lockerId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Locker updated successfully");
        } else {
          console.error("Failed to update locker");
        }
      } else {
        console.error("Branch ID or access token not found in local storage");
      }
    } catch (error) {
      console.error("Error updating locker:", error);
    }
  };

  const fetchMachines = async () => {
    try {
      const branchId = localStorage.getItem('staff_branch');
      const accessToken = localStorage.getItem('access_token');

      if (branchId && accessToken) {
        const response = await axios.get(
          `http://localhost:3001/api/machines/finished/${branchId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Fetch machines data successfully");
          setMachines(response.data.machines);
        } else {
          console.error("Failed to fetch machines data");
        }
      } else {
        console.error("Branch ID or access token not found in local storage");
      }
    } catch (error) {
      console.error("Error fetching machines data:", error);
    }
  };

  useEffect(() => {
    fetchLockerData();
    fetchMachines(); // Fetch machines data
  }, []);

  const handleFreeClick = (locker: LocalLocker) => {
    setLockerToFree(locker);
    setShowFreeModal(true);
  };

  const handleModifiedLocker = (
    ID: string,
    editedStatus: string,
    editedUID: string
  ) => {
    const updatedLocker = locker.map((specificLocker: LocalLocker) => {
      if (specificLocker.id === ID) {
        return { ...specificLocker, Status: editedStatus, orderId: editedUID };
      }
      return specificLocker;
    });
    setLocker(updatedLocker);
    fetchLockerData();
  };
  

  const handleTransferClick = (locker: LocalLocker) => {
    setLockerToTransfer(locker);
    setShowTransferToModal(true);
  };

  return (
    <main className="bg-white">
      <div className="container p-10">
        <h1 className="text-lg">จัดการตู้เก็บผ้า</h1>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">หมายเลข</th>
              <th className="border border-gray-300 px-4 py-2 w-1/4">สถานะ</th>
              <th className="border border-gray-300 px-6 py-2">Order ID</th> {/* Adjusted width */}
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {locker.map((locker) => (
              <tr key={locker.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {locker.id}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center"> {/* Adjusted width */}
                  <div
                    className={`w-4 h-4 rounded-full inline-block mr-2 ${
                      locker.Status === "ว่าง" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  {locker.Status}
                </td>
                <td className="border border-gray-300 px-6 py-2 text-center"> {/* Adjusted width */}
                  {locker.orderId}
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
            machines={machines}
            onSave={(id, Status, orderId, machineId) => {
              handleModifiedLocker(id, Status, orderId);
              updateLocker(id, machineId);
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
              handleModifiedLocker(lockerToFree.id, "ว่าง", "no order");
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
  machines,
  onSave,
  onClose,
}: {
  locker: LocalLocker;
  machines: Machine[];
  onSave: (id: string, Status: string, orderId: string, machineId: string) => void;
  onClose: () => void;
}) {
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const handleConfirm = () => {
    const updatedOrderId = selectedOrderId;
    onSave(locker.id, locker.Status, updatedOrderId, selectedOrderId);
    onClose();
  };
  

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
          <select
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            className="border p-2 mb-2"
          >
            <option value="">เลือกเครื่องที่ซักเสร็จ</option>
            {machines.map((machine) => (
              <option key={machine.currentOrder} value={machine.currentOrder}>
                {machine.id} - {machine.machineType}
              </option>
            ))}
          </select>
          <p className="font-semibold">หมายเลขตู้เก็บผ้า {locker.id}</p>
        </div>
        <div className="modal-footer">
          <button
            className={`${
              !selectedOrderId ? 'bg-gray-300 text-black' : 'bg-red-500 text-white'
            } px-4 py-2 rounded hover:bg-red-700`}
            onClick={handleConfirm}
            disabled={!selectedOrderId}
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
  locker: LocalLocker;
  onSave: () => void;
  onClose: () => void;
}) {
  const handleConfirm = async () => {
    try {
      const branchId = localStorage.getItem("staff_branch");
      const accessToken = localStorage.getItem("access_token");

      if (branchId && accessToken) {
        const response = await axios.patch(
          `http://localhost:3001/api/lockers/${locker.id}`,
          {
            branchId: branchId,
            orderId: "no order",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Locker returned successfully");
          onSave();
          onClose();
        } else {
          console.error("Failed to return locker");
        }
      } else {
        console.error("Branch ID or access token not found in local storage");
      }
    } catch (error) {
      console.error("Error returning locker:", error);
    }
  };

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
          <p className="font-semibold">{locker.orderId}</p>
        </div>
        <div className="modal-footer">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              handleConfirm();
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
