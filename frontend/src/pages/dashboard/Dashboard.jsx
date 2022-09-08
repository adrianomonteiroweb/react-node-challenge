import { useEffect, useState } from 'react';

import { tryGetAllData } from '../../utils/functions';

import './dashboard.css';
import PatientSectionComponent from './hashboardComponents/patientSection/PatientSectionComponent';

export default function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);

  async function getAllData() {
    const allUsers = await tryGetAllData('user');

    if (allUsers) setAllUsers(allUsers.data);
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className='dashboard-div'>
      <fieldset>
        <h1 className='dashboard-title'>Dashboard</h1>
        <section className='patients-cards-section'>
          <h2>My Patients</h2>
          {allUsers.length > 0 &&
            allUsers
              .filter((patient) => patient.role !== 'admin')
              .map((patient) => <PatientSectionComponent patient={patient} />)}
        </section>
      </fieldset>
    </div>
  );
}
