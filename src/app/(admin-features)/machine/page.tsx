"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Machine {
  id: string;
  machineType: string;
  branchId: string;
  branchName: string;
}

const mockMachines: Machine[] = [
  {
    id: "1",
    machineType: "16 kg",
    branchId: "101",
    branchName: "Branch A",
  },
  {
    id: "2",
    machineType: "20 kg",
    branchId: "102",
    branchName: "Branch B",
  },
  {
    id: "3",
    machineType: "16 kg",
    branchId: "103",
    branchName: "Branch C",
  },
];

export default function MachineManagement() {
  const [machine, setMachine] = useState<Machine[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [machineToEdit, setMachineToEdit] = useState<Machine>({ id: "", machineType: "", branchId: "", branchName: "" });
  const [machineToDelete, setMachineToDelete] = useState<Machine>({ id: "", machineType: "", branchId: "", branchName: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await axios.get<Machine[]>("http://localhost:3001/api/machines");
      setMachine(response.data);
    } catch (error) {
      console.error("Error fetching machines:", error);
      // If API request fails, set state to the mock data
      setMachine(mockMachines);
    }
  };

  const handleDeleteMachine = async (machineId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/machines/${machineId}`);
      const updatedMachines = machine.filter((specificMachine) => specificMachine.id !== machineId);
      setMachine(updatedMachines);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting machine:", error);
    }
  };

  const handleEditMachine = async (id: string, editedType: string, editedBranchId: string) => {
    try {
      await axios.patch(`http://localhost:3001/api/machines/${id}`, {
        branchId: editedBranchId,
        machineType: editedType,
        status: "working",
      });

      const updatedMachines = machine.map((specificMachine) => {
        if (specificMachine.id === id) {
          return { ...specificMachine, machineType: editedType, branchId: editedBranchId };
        }
        return specificMachine;
      });

      setMachine(updatedMachines);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing machine:", error);
    }
  };

  const handleEditClick = (machine: Machine) => {
    setMachineToEdit(machine);
    setShowEditModal(true);
  };

  const handleDeleteClick = (machine: Machine) => {
    setMachineToDelete(machine);
    setShowDeleteModal(true);
  };

  const handleAddMachine = async (newMachine: Machine) => {
    try {
      const response = await axios.post<Machine>("http://localhost:3001/api/machines", {
        branchId: newMachine.branchId,
        status: "Available",
        machineType: newMachine.machineType,
      });

      setMachine([...machine, response.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding machine:", error);
    }
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
              .filter((machine) => machine.branchName.includes(searchQuery))
              .map((machine) => (
                <tr key={machine.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {machine.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {machine.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {machine.branchName}
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
              handleDeleteMachine(machineToDelete.id);
              setShowDeleteModal(false);
            }}
            onClose={() => setShowDeleteModal(false)}
          />
        </div>
      )}
    </main>
  );
}

// MachineInputModal Component
function MachineInputModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: Machine) => void;
  onClose: () => void;
}) {
  const [machineType, setMachineType] = useState("");
  const [machineBranch, setMachineBranch] = useState("");

  const handleSubmit = () => {
    const uniqueMachineID = new Date().getTime().toString();
    onSubmit({
      id: uniqueMachineID,
      machineType: machineType,
      branchId: machineBranch,
      branchName: machineBranch,
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
          <h2 className="text-xl">Add Machine</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            Machine Type:
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={machineType}
              onChange={(e) => setMachineType(e.target.value)}
            >
              <option value="16 kg">16 kg</option>
              <option value="20 kg">20 kg</option>
              <option value="Any">Any</option>
            </select>
          </label>
          <label className="block mb-2">
            Branch:
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
            Add Machine
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// EditMachineModal Component
function EditMachineModal({
  machineToEdit,
  onSave,
  onClose,
}: {
  machineToEdit: Machine;
  onSave: (id: string, editedType: string, editedBranchId: string) => void;
  onClose: () => void;
}) {
  const [editedType, setEditedType] = useState(machineToEdit.machineType);
  const [editedBranch, setEditedBranch] = useState(machineToEdit.branchId);

  const handleSaveClick = () => {
    onSave(machineToEdit.id, editedType, editedBranch);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">Edit Machine</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            Machine Type:
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
            >
              <option value="16 kg">16 kg</option>
              <option value="20 kg">20 kg</option>
              <option value="Any">Any</option>
            </select>
          </label>
          <label className="block mb-2">
            Branch:
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
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// DeleteMachineModal Component
function DeleteMachineModal({
  machine,
  onDelete,
  onClose,
}: {
  machine: Machine;
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">Delete Machine</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete the following washing machine?</p>
          <p className="font-semibold">ID: {machine.id}</p>
          <p className="font-semibold">Type: {machine.machineType}</p>
          <p className="font-semibold">Branch: {machine.branchName}</p>
        </div>
        <div className="modal-footer">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
