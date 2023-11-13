"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';


interface Staff {
  EmployeeID: string;
  FirstName: string;
  LastName: string;
  Branch: string;
}


interface ApiStaff {
  uid: string;
  branchId: string;
  fName: string;
  lName: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  telNum: string;
}

function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');

  const fetchStaffData = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:3001/api/staffs', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setStaff(response.data.map((apiStaff: ApiStaff) => (
        {
        EmployeeID: apiStaff.uid,
        FirstName: apiStaff.fName,
        LastName: apiStaff.lName,
        Branch: apiStaff.branchId
      })));
      

      console.log("data fetched successfully")
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:3001/api/branches', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        setBranches(response.data.branches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
  
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchStaffData();
  }, []);


  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState({ EmployeeID: "", FirstName: "", LastName: "", Branch: "" });
  const [staffToDelete, setStaffToDelete] = useState({ EmployeeID: "", FirstName: "", LastName: "", Branch: "" });

  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteStaff = (employeeID:string) => {
    const updatedStaff = staff.filter((employee) => employee.EmployeeID !== employeeID);
    setStaff(updatedStaff);
  };

  const handleEditStaff = (employeeID: string, editedFirstName: string, editedLastName: string, editedBranch: string) => {
  const updatedStaff = staff.map((employee) => {
    if (employee.EmployeeID === employeeID) {
      return { ...employee, FirstName: editedFirstName, LastName: editedLastName, Branch: editedBranch };
    }
    return employee;
  });
  setStaff(updatedStaff);
  };


  const handleEditClick = (staff:Staff) => {
    setStaffToEdit(staff);
    setShowEditModal(true);
  };

  const handleDeleteClick = (employee:{ EmployeeID:string, FirstName: string, LastName: string, Branch: string }) => {
    setStaffToDelete(employee);
    setShowDeleteModal(true);
  };

  const addStaffApi = async (newStaff: {
    branchId: string;
    fName: string;
    lName: string;
    username: string;
    password: string;
  }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post('http://localhost:3001/api/staffs', newStaff, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log('Staff added successfully:', response.data);
  
      // Check if the response contains a error message or any other indication
      if (response.data.message === 'Error') {
        console.log('Error adding staff username must be unique');
        alert('Error adding staff username must be unique')
      } else {
        fetchStaffData();
      }
    } catch (error) {
      // Handle other errors, e.g., network issues
      console.error('Error adding staff:', error);
    }
  };
  

  const handleAddStaff = (newStaff: {
    fName: string;
    lName: string;
    branchId: string;
    username: string;
    password: string;
  }) => {
    // Call the addStaffApi function with the mapped data
    addStaffApi(newStaff);
  
    setShowAddModal(false);
  };

  return (
    <main className="bg-white">
      <div className="container p-10">
        <h1 className="text-lg">ระบบจัดการพนักงาน</h1>
        <div className="flex justify-between items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setShowAddModal(true)}
            >
            เพิ่มพนักงาน
            </button>

            <input
              className="border border-gray-300 p-2 rounded mt-4"
              type="text"
              placeholder="ค้นหา ประจำที่สาขา"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">รหัสพนักงาน</th>
            <th className="border border-gray-300 px-4 py-2 w-2/5">ชื่อ</th>
            <th className="border border-gray-300 px-4 py-2">นามสกุล</th>
            <th className="border border-gray-300 px-4 py-2">ประจำที่สาขา</th>
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
          <tbody>
          {staff
            .filter((employee) => employee.Branch && employee.Branch.includes(searchQuery))
            .map((employee) => (
              <tr key={employee.EmployeeID} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.EmployeeID}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.FirstName}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.LastName}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.Branch || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-blue-button hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
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
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <StaffInputModal
            onSubmit={handleAddStaff}
            onClose={() => setShowAddModal(false)}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            branches={branches}
          />
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <EditStaffModal
          staffToEdit={staffToEdit}
          onSave={handleEditStaff}
          onClose={() => setShowEditModal(false)}
        />
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <DeleteStaffModal
          staff={staffToDelete}
          onDelete={() => {
            handleDeleteStaff(staffToDelete.EmployeeID);
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
        </div>
      )}
    </main>
  );
}

function StaffInputModal({
  onSubmit,
  onClose,
  selectedBranch,
  setSelectedBranch,
  branches, // Add branches as a prop
}: {
  onSubmit: (newStaff: {
    branchId: string;
    fName: string;
    lName: string;
    username: string;
    password: string;
  }) => void;
  onClose: () => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  branches: Branch[]; // Define branches as a prop
}) {
  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [employeeBranch, setEmployeeBranch] = useState('');
  const [username, setUsername] = useState(''); // new state for username
  const [password, setPassword] = useState(''); // new state for password

  const handleSubmit = () => {
    onSubmit({
      fName: employeeFirstName,
      lName: employeeLastName,
      branchId: selectedBranch,  // Pass selectedBranch instead of employeeBranch
      username: username,
      password: password,
    });
    // Reset all states
    setEmployeeFirstName('');
    setEmployeeLastName('');
    setEmployeeBranch('');
    setUsername('');
    setPassword('');
    onClose();
  };

  const handleCancel = () => {
    // Reset all states
    setEmployeeFirstName('');
    setEmployeeLastName('');
    setEmployeeBranch('');
    setUsername('');
    setPassword('');
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
            ชื่อ:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={employeeFirstName}
              onChange={(e) => setEmployeeFirstName(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            นามสกุล:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={employeeLastName}
              onChange={(e) => setEmployeeLastName(e.target.value)}
            />
          </label>
          {/* <label className="block mb-2">
            ประจำที่สาขา:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={employeeBranch}
              onChange={(e) => setEmployeeBranch(e.target.value)}
            />
          </label> */}
          <label className="block mb-2">
            ประจำที่สาขา:
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="" disabled>
                เลือกสาขา
              </option>
              {branches.map((branch:Branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-2">
            ชื่อผู้ใช้ (Username):
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            รหัสผ่าน (Password):
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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


function EditStaffModal({
  staffToEdit,
  onSave,
  onClose,
}: {
  staffToEdit: { EmployeeID: string; FirstName: string; LastName: string; Branch: string };
  onSave: (employeeID: string, editedFirstName: string, editedLastName: string, editedBranch: string) => void;
  onClose: () => void;
}) {
  const [editedFirstName, setEditedFirstName] = useState(staffToEdit.FirstName);
  const [editedLastName, setEditedLastName] = useState(staffToEdit.LastName);
  const [editedBranch, setEditedBranch] = useState(staffToEdit.Branch);
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:3001/api/branches', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setBranches(response.data.branches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleSaveClick = async () => {
    // Extract the branchId from the selected branch
    const selectedBranchData = branches.find((branch) => branch.id === editedBranch);
    const branchId = selectedBranchData ? selectedBranchData.id : '';

    // Prepare the data for the PATCH request
    const patchData = {
      branchId: branchId,
    };

    // Make the PATCH request to update the staff data
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.patch(`http://localhost:3001/api/staffs/${staffToEdit.EmployeeID}`, patchData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // If the PATCH request is successful, update the state and close the modal
      onSave(staffToEdit.EmployeeID, editedFirstName, editedLastName, editedBranch);
      onClose();
    } catch (error) {
      console.error('Error updating staff data:', error);
      // Handle errors, e.g., show an error message to the user
    }
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
            ชื่อ:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={staffToEdit.FirstName}
              readOnly
            />
          </label>
          <label className="block mb-2">
            นามสกุล:
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="text"
              value={staffToEdit.LastName}
              readOnly
            />
          </label>
          <label className="block mb-2">
            แก้ไขประจำที่สาขา:
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={editedBranch}
              onChange={(e) => setEditedBranch(e.target.value)}
            >
              <option value="" disabled>
                เลือกสาขา
              </option>
              {branches.map((branch: Branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
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


function DeleteStaffModal({ staff, onDelete, onClose }:
  { staff:{ EmployeeID: string, FirstName: string, LastName: string, Branch: string },
    onDelete:() => void,
    onClose:() => void }
  ) {
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
          <p>คุณต้องการลบพนักงานดังต่อไปนี้หรือไม่?</p>
          <p className="font-semibold">รหัสพนักงาน: {staff.EmployeeID}</p>
          <p className="font-semibold">ชื่อ: {staff.FirstName}</p>
          <p className="font-semibold">นามสกุล: {staff.LastName}</p>
          <p className="font-semibold">ประจำที่สาขา: {staff.Branch}</p>
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