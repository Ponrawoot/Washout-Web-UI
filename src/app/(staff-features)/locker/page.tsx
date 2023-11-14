"use client";
import { useEffect, useState } from "react";

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

export default function LockerManagement() {
  const [locker, setLocker] = useState<LocalLocker[]>([]);
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
        const response = await fetch(
          `http://localhost:3001/api/lockers/${branchId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          console.log("Fetch locker data successfully");
          const data = await response.json();
          const lockersFromApi: LocalLocker[] = data.lockers.map(
            (apiLocker: ApiLocker) => ({
              id: apiLocker.id,
              Status:
                apiLocker.orderId === "no order" ? "ว่าง" : "กำลังใช้งาน",
              orderId: apiLocker.orderId,
            })
          );
          setLocker(lockersFromApi);
        } else {
          console.error("Failed to fetch locker data");
        }
      } else {
        console.error(
          "Branch ID or access token not found in local storage"
        );
      }
    } catch (error) {
      console.error("Error fetching locker data:", error);
    }
  };

  useEffect(() => {
    fetchLockerData();
  }, []);

  const handleFreeClick = async (locker: LocalLocker) => {
    try {
      const branchId = localStorage.getItem("staff_branch");
      const accessToken = localStorage.getItem("access_token");

      if (branchId && accessToken) {
        const response = await fetch(
          `http://localhost:3001/api/lockers/${locker.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              branchId: branchId,
              orderId: "no order",
            }),
          }
        );

        if (response.ok) {
          console.log("Locker returned successfully");
          // Update local state to reflect the returned locker
          fetchLockerData(); // Fetch locker data after returning a locker
          setShowFreeModal(false);
        } else {
          console.error("Failed to return locker");
        }
      } else {
        console.error(
          "Branch ID or access token not found in local storage"
        );
      }
    } catch (error) {
      console.error("Error returning locker:", error);
    }
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
              <th className="border border-gray-300 px-4 py-2 w-2/5">สถานะ</th>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
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
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {locker.Status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
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
            onSave={() => {
              handleModifiedLocker(
                lockerToTransfer.id,
                "กำลังใช้งาน",
                "f09bc70e-5f88-428a-938d-eb4ac0fad712"
              );
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
  onSave,
  onClose,
}: {
  locker: LocalLocker;
  onSave: (id: string, Status: string, orderId: string) => void;
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
          <p className="font-semibold">หมายเลขตู้เก็บผ้า {locker.id}</p>
        </div>
        <div className="modal-footer">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              onSave(locker.id, locker.Status, locker.orderId);
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
  locker: LocalLocker;
  onSave: (id: string, Status: string, orderId: string) => void;
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
          <p className="font-semibold">{locker.orderId}</p>
        </div>
        <div className="modal-footer">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              onSave(locker.id, locker.Status, locker.orderId);
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