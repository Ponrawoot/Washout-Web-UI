"use client";
import { useState } from "react";

export default function MachineManagement() {
  const [machine, setMachine] = useState([
    { MachineID: "1", MachineType: "16 kg", Branch: "บรรทัดทอง" },
    { MachineID: "2", MachineType: "Any", Branch: "สามย่าน" },
    { MachineID: "3", MachineType: "20 kg", Branch: "สยาม" },
    { MachineID: "4", MachineType: "16 kg", Branch: "บางนา" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [machineToEdit, setMachineToEdit] = useState({
    MachineID: "",
    MachineType: "",
    Branch: "",
  });
  const [machineToDelete, setMachineToDelete] = useState({
    MachineID: "",
    MachineType: "",
    Branch: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteMachine = (ID: string) => {
    const updatedMachine = machine.filter(
      (specificMachine: {
        MachineID: string;
        MachineType: string;
        Branch: string;
      }) => specificMachine.MachineID !== ID
    );
    setMachine(updatedMachine);
  };

  const handleEditMachine = (
    ID: string,
    editedName: string,
    editedBranch: string
  ) => {
    const updatedMachine = machine.map((specificMachine) => {
      if (specificMachine.MachineID === ID) {
        return { ...specificMachine, Name: editedName, Branch: editedBranch };
      }
      return specificMachine;
    });
    setMachine(updatedMachine);
  };

  const handleEditClick = (machine: {
    MachineID: string;
    MachineType: string;
    Branch: string;
  }) => {
    setMachineToEdit(machine);
    setShowEditModal(true);
  };

  const handleDeleteClick = (machine: {
    MachineID: string;
    MachineType: string;
    Branch: string;
  }) => {
    setMachineToDelete(machine);
    setShowDeleteModal(true);
  };

  const handleAddMachine = (newMachine: {
    MachineID: string;
    MachineType: string;
    Branch: string;
  }) => {
    setMachine([...machine, newMachine]);
    setShowAddModal(false);
  };

  return (
    <main className="bg-white">
      <div className="container p-10">
        <h1 className="text-lg">ระบบจัดเครื่องซักผ้า</h1>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => setShowAddModal(true)}
          >
            เพิ่มเครื่อง
          </button>

          <input
            className="border border-gray-300 p-2 rounded mt-4"
            type="text"
            placeholder="ค้นหาจากสาขา"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">หมายเลข</th>
              <th className="border border-gray-300 px-4 py-2 w-2/5">ประเภท</th>
              <th className="border border-gray-300 px-4 py-2">สาขา</th>
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {machine
              .filter((machine) => machine.Branch.includes(searchQuery))
              .map((machine) => (
                <tr key={machine.MachineID} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {machine.MachineID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {machine.MachineType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {machine.Branch}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-blue-button hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleEditClick(machine)}
                    >
                      แก้ไข
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDeleteClick(machine)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <MachineInputModal
            onSubmit={handleAddMachine}
            onClose={() => setShowAddModal(false)}
          />
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <EditMachineModal
            machineToEdit={machineToEdit}
            onSave={handleEditMachine}
            onClose={() => setShowEditModal(false)}
          />
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <DeleteMachineModal
            machine={machineToDelete}
            onDelete={() => {
              handleDeleteMachine(machineToDelete.MachineID);
              setShowDeleteModal(false);
            }}
            onClose={() => setShowDeleteModal(false)}
          />
        </div>
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
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={machineType}
              onChange={(e) => {setMachineType(e.target.value);
              console.log(e.target.value)}}
            >
              <option value="16 kg">16 kg</option>
              <option value="20 kg">20 kg</option>
              <option value="Any">Any</option>
            </select>
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
    console.log(editedType)
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
          <h2 className="text-xl">แก้ไขเครื่องซักผ้า</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            ประเภท:
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={editedType}
              onChange={(e) => {setEditedType(e.target.value);
                console.log(editedType)}}
            >
              <option value="16 kg">16 kg</option>
              <option value="20 kg">20 kg</option>
              <option value="Any">Any</option>
            </select>
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
          <h2 className="text-xl">ลบเครื่องซักผ้า</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>คุณต้องการลบเครื่องซักผ้าด้านล่างนี่ใช่หรือไม่?</p>
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
