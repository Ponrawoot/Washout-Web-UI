"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

function MachineList() {
  const [machines, setMachines] = useState({ machines: [] });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:3001/api/machines/";
        const response = await axios.get(url);

        const updatedMachines = response.data.machines;
        console.log(updatedMachines);

        setMachines({ machines: updatedMachines }); 
        setDataFetched(true); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Machine List</h1>
      <ul>
        {machines.machines.map((machine) => (
          <li key={machine.id}>
            <strong>ID:</strong> {machine.id}<br />
            <strong>Branch ID:</strong> {machine.branchId}<br />
            <strong>Status:</strong> {machine.status}<br />
            <strong>Type:</strong> {machine.type}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MachineList;
