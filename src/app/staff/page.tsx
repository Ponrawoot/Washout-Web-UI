"use client";
import React, { useState } from "react";
import Navbar from "../navbar";

function StaffManagement() {
  const [staff, setStaff] = useState([
    { EmployeeID: "1001", Name: "ณภัทร ดรุนัยธร", Branch: "บรรทัดทอง" },
    { EmployeeID: "1002", Name: "พลวุฒิ ขำโขนงาม ", Branch: "สามย่าน" },
    { EmployeeID: "1003", Name: "กาญจนี สถิตรังสีวงศ", Branch: "สยาม" },
    { EmployeeID: "1004", Name: "ดิสรณ์ บุตรโส", Branch: "บางนา" },
    { EmployeeID: "1005", Name: "ปริชญา ศิรินันท์อนุกูล", Branch: "บางขุนเทียน" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const handleDeleteStaff = (employeeID) => {
    const updatedStaff = staff.filter((employee) => employee.EmployeeID !== employeeID);
    setStaff(updatedStaff);
  };

  const handleEditStaff = (employeeID, editedName, editedBranch) => {
    const updatedStaff = staff.map((employee) => {
      if (employee.EmployeeID === employeeID) {
        return { ...employee, Name: editedName, Branch: editedBranch };
      }
      return employee;
    });
    setStaff(updatedStaff);
  };

  const handleEditClick = (employee) => {
    setStaffToEdit(employee);
    setShowEditModal(true);
  };

  const handleDeleteClick = (employee) => {
    setStaffToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleAddStaff = (newStaff) => {
    setStaff([...staff, newStaff]);
    setShowAddModal(false);
  };

  return (
    <main className="bg-white">
      <Navbar username="Bass" />
      <div className="container p-10">
        <h1 className="text-lg">ระบบจัดการพนักงาน</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setShowAddModal(true)}
        >
          เพิ่มพนักงาน
        </button>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">รหัสพนักงาน</th>
              <th className="border border-gray-300 px-4 py-2 w-2/5">ชื่อนามสกุล</th>
              <th className="border border-gray-300 px-4 py-2">ประจำที่สาขา</th>
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {staff.map((employee) => (
              <tr key={employee.EmployeeID} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.EmployeeID}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.Name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.Branch}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleEditClick(employee)}
                  >
                    แก้ไข
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteClick(employee)}
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
        <StaffInputModal onSubmit={handleAddStaff} onClose={() => setShowAddModal(false)} />
      )}
      {showEditModal && (
        <EditStaffModal
          staffToEdit={staffToEdit}
          onSave={handleEditStaff}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteStaffModal
          staff={staffToDelete}
          onDelete={() => {
            handleDeleteStaff(staffToDelete.EmployeeID);
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </main>
  );
}

function StaffInputModal({ onSubmit, onClose }) {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeBranch, setEmployeeBranch] = useState("");

  const handleSubmit = () => {
    // Generate a unique employee ID
    const uniqueEmployeeID = new Date().getTime().toString();
    onSubmit({ EmployeeID: uniqueEmployeeID, Name: employeeName, Branch: employeeBranch });
    setEmployeeName("");
    setEmployeeBranch("");
    onClose();
  };

  const handleCancel = () => {
    setEmployeeName("");
    setEmployeeBranch("");
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 w-1/3 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl">เพิ่มพนักงาน</h2>
          <button className="close-button text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label className="block mb-2">
            ชื่อนามสกุล:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            ประจำที่สาขา:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={employeeBranch}
              onChange={(e) => setEmployeeBranch(e.target.value)}
            />
          </label>
        </div>
        <div className="modal-footer">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            เพิ่มพนักงาน
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

function EditStaffModal({ staffToEdit, onSave, onClose }) {
  const [editedName, setEditedName] = useState(staffToEdit.Name);
  const [editedBranch, setEditedBranch] = useState(staffToEdit.Branch);

  const handleSaveClick = () => {
    onSave(staffToEdit.EmployeeID, editedName, editedBranch);
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
            ชื่อนามสกุล:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
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

function DeleteStaffModal({ staff, onDelete, onClose }) {
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
          <p>
            คุณต้องการลบพนักงานดังต่อไปนี้หรือไม่?
          </p>
          <p className="font-semibold">
            รหัสพนักงาน: {staff.EmployeeID}
          </p>
          <p className="font-semibold">
            ชื่อนามสกุล: {staff.Name}
          </p>
          <p className="font-semibold">
            ประจำที่สาขา: {staff.Branch}
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

export default StaffManagement;
