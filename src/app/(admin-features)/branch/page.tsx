"use client"; 
import { MouseEventHandler, useState, useEffect } from "react";
import axios from "axios";

function Branch({ BranchID, BranchName, onDelete, onEdit }:{ BranchID:string, BranchName:string, onDelete:MouseEventHandler<HTMLButtonElement>, onEdit:MouseEventHandler<HTMLButtonElement>}) {


  return (
    <tr className="border border-gray-300">
      <td className="border border-gray-300 px-4 py-2 text-center">{BranchID}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{BranchName}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button
          className="bg-blue-button hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={onEdit}
        >
          แก้ไข
        </button>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button
          className="bg-red-button hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={onDelete}
        >
          ลบ
        </button>
      </td>
    </tr>
  );
}

function BranchInputModal({ onSubmit, onClose }:{
  onSubmit: (data: { BranchID: string; BranchName: string }) => void;
  onClose: () => void;
}) {
  const [branchName, setBranchName] = useState("");

  const handleSubmit = () => {
    // Generate a unique branch ID
    const uniqueBranchID = new Date().getTime().toString();
    onSubmit({ BranchID: uniqueBranchID, BranchName: branchName });
    setBranchName("");
    onClose(); 
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">เพิ่มสาขา</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            Branch Name:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </label>
        </div>
        <div className="modal-footer">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            ยืนยัน
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

function EditBranchModal({ branchToEdit, onSave, onClose }:{ branchToEdit: { BranchID: string | null; BranchName: string | null },
   onSave:(branchID: string, editedBranchName: string) => void,
   onClose:() => void}) {
  const [editedBranchName, setEditedBranchName] = useState(branchToEdit.BranchName || "");

  const handleSaveClick = () => {
    if (branchToEdit.BranchID !== null && editedBranchName !== null) {
      onSave(branchToEdit.BranchID, editedBranchName);
      onClose();
    }
  }
  ;

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">แก้ไขสาขา</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            Branch Name:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={editedBranchName}
              onChange={(e) => setEditedBranchName(e.target.value)}
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

function DeleteBranchModal({ branch, onDelete, onClose }:{branch: { BranchID: string; BranchName: string; }
onDelete:() => void;
onClose: () => void;}) {
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">ยืนยันการลบสาขา</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>
            คุณต้องการลบสาขาดังต่อไปนี้หรือไม่?
          </p>
          <p className="font-semibold">
            หมายเลขสาขา: {branch.BranchID}
          </p>
          <p className="font-semibold">
            ชื่อสาขา: {branch.BranchName}
          </p>
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

interface Branch {
  BranchID: string;
  BranchName: string;
}

export default function BranchManagement() {
  const [branches, setBranches] = useState<Branch[]>([]);

  // Function to fetch branches
  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/branches/");
      const convertedBranches = response.data.branches.map((branch: { id: string; name: string; }) => {
        return { BranchID: branch.id, BranchName: branch.name };
      });

      setBranches(convertedBranches);
      console.log("Branches fetched successfully!");
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // Use the useEffect hook to fetch branches when the component mounts
  useEffect(() => {
    fetchBranches();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  // useEffect(() => {
  //   const intervalId = setInterval(fetchBranches, 1000); // Fetch every 60 seconds (adjust as needed)
  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState({BranchID:"",BranchName:""});
  const [branchToDelete, setBranchToDelete] = useState({BranchID:"",BranchName:""});

  const handleDeleteBranch = async (branchID:string) => {
    try {
      await axios.delete(`http://localhost:3001/api/branches/${branchID}`);

      const updatedBranches = branches.filter((branch) => branch.BranchID !== branchID);
      setBranches(updatedBranches);
      console.log("Branch deleted successfully!");
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const handleEditBranch = async(branchID:string, editedBranchName:string) => {
    try {
      await axios.patch(`http://localhost:3001/api/branches/${branchID}`, {
        name: editedBranchName,
        address: "ไม่ทราบ",
        telNum: "0987911234",
      });

      const updatedBranches = branches.map((branch) => {
        if (branch.BranchID === branchID) {
          return { ...branch, BranchName: editedBranchName };
        }
        return branch;
      });

      setBranches(updatedBranches);
      console.log("Branch edited successfully!");
    } catch (error) {
      console.error("Error editing branch:", error);
    }
  };

  

  const handleEditClick = (branch: { BranchID: string; BranchName: string; }) => {
    setBranchToEdit(branch);
    setShowEditModal(true);
  };

  const handleDeleteClick = (branch: { BranchID: string; BranchName: string; }) => {
    setBranchToDelete(branch);
    setShowDeleteModal(true);
  };

  const handleAddBranch = async (newBranch: { BranchID: string; BranchName: string; }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/branches", {
        name: newBranch.BranchName,
        address: "ไม่ทราบ",
        telNum: "0987911234",
      });

      setBranches([...branches, response.data]); // Update the state with the new branch
      setShowAddModal(false);
      console.log("New branch added:", response.data);
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  return (
    <main className="bg-white">
      <div className="container p-10">
        <h1 className="text-lg">ระบบจัดการสาขา</h1>
        <button
          className="bg-blue-button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setShowAddModal(true)}
        >
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
            {branches.map((branch) => (
              <Branch
                key={branch.BranchID}
                BranchID={branch.BranchID}
                BranchName={branch.BranchName}
                onDelete={() => handleDeleteClick(branch)}
                onEdit={() => handleEditClick(branch)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <BranchInputModal onSubmit={handleAddBranch} onClose={() => setShowAddModal(false)} />  
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <EditBranchModal
          branchToEdit={branchToEdit}
          onSave={handleEditBranch}
          onClose={() => setShowEditModal(false)}
        />
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <DeleteBranchModal
          branch={branchToDelete}
          onDelete={() => {
            handleDeleteBranch(branchToDelete.BranchID);
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
        </div>
      )}
    </main>
  );
}