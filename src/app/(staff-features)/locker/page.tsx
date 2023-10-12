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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lockerToEdit, setLockerToEdit] = useState({
    LockerID: "",
    Status: "",
    UID: "",
  });
  const [lockerToDelete, setLockerToDelete] = useState({
    LockerID: "",
    Status: "",
    UID: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  // const handleTransferLocker = (ID:string) => {
  //   const updatedLocker = locker.filter((specificMachine: { MachineID: string, MachineType: string, Branch: string}) => specificMachine.MachineID !== ID);
  //   setMachine(updatedLocker);
  // };

  const handleModifiedLocker = (
    ID: string,
    editedStatus: string,
    editedUID: string
  ) => {
    const updatedLocker = locker.map((specificLocker) => {
      if (specificLocker.LockerID === ID) {
        return { ...specificLocker, Name: editedStatus, UID: editedUID };
      }
      return specificLocker;
    });
    setLocker(updatedLocker);
  };

  // const handleEditClick = (machine: { MachineID: string, MachineType: string, Branch: string}) => {
  //   setMachineToEdit(machine);
  //   setShowEditModal(true);
  // };

  // const handleDeleteClick = (machine: { MachineID: string, MachineType: string, Branch: string}) => {
  //   setMachineToDelete(machine);
  //   setShowDeleteModal(true);
  // };

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
                    // onClick={() => handleDeleteClick(machine)}
                  >
                    คืนผ้า
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <MachineInputModal
          onSubmit={handleModifiedLocker}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showEditModal && (
        <EditMachineModal
          machineToEdit={machineToEdit}
          onSave={handleModifiedLocker}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteMachineModal
          machine={machineToDelete}
          onDelete={() => {
            handleModifiedLocker(machineToDelete.MachineID);
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </main>
  );
}

function MachineInputModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: {
    MachineID: string;
    MachineType: string;
    Branch: string;
  }) => void;
  onClose: () => void;
}) {
  const [machineType, setMachineType] = useState("");
  const [machineBranch, setMachineBranch] = useState("");

  const handleSubmit = () => {
    const uniqueMachineID = new Date().getTime().toString();
    onSubmit({
      MachineID: uniqueMachineID,
      MachineType: machineType,
      Branch: machineBranch,
    });
    setMachineType("");
    setMachineBranch("");
    onClose();
  };

  const handleCancel = () => {
    setMachineType("");
    setMachineBranch("");
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">เพิ่มเครื่อง</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            ประเภท:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={machineType}
              onChange={(e) => setMachineType(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            ประจำที่สาขา:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={machineBranch}
              onChange={(e) => setMachineBranch(e.target.value)}
            />
          </label>
        </div>
        <div className="modal-footer">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            เพิ่มเครื่อง
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
            onClick={handleCancel}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

function EditMachineModal({
  machineToEdit,
  onSave,
  onClose,
}: {
  machineToEdit: { MachineID: string; MachineType: string; Branch: string };
  onSave: (MachineID: string, MachineType: string, Branch: string) => void;
  onClose: () => void;
}) {
  const [editedType, setEditedType] = useState(machineToEdit.MachineType);
  const [editedBranch, setEditedBranch] = useState(machineToEdit.Branch);

  const handleSaveClick = () => {
    onSave(machineToEdit.MachineID, editedType, editedBranch);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">แก้ไขพนักงาน</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            ประเภท:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            ประจำที่สาขา:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={editedBranch}
              onChange={(e) => setEditedBranch(e.target.value)}
            />
          </label>
        </div>
        <div className="modal-footer">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSaveClick}
          >
            บันทึก
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
            onClick={handleCancel}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteMachineModal({
  machine,
  onDelete,
  onClose,
}: {
  machine: { MachineID: string; MachineType: string; Branch: string };
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">ยืนยันการลบพนักงาน</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>คุณต้องการลบเครื่องซักผ้าดังต่อไปนี้หรือไม่?</p>
          <p className="font-semibold">หมายเลข: {machine.MachineID}</p>
          <p className="font-semibold">ประเภท: {machine.MachineType}</p>
          <p className="font-semibold">ประจำที่สาขา: {machine.Branch}</p>
        </div>
        <div className="modal-footer">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              onDelete();
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
