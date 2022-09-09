import { useEffect, useState } from 'react';
import TouchCarousel from 'react-touch-carousel';
import touchWithMouseHOC from 'react-touch-carousel/lib/touchWithMouseHOC';

import { tryGetAllData } from '../../utils/functions';

import './dashboard.css';
import PatientSectionComponent from './hashboardComponents/patientSection/PatientSectionComponent';

export default function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);

  const cardSize = 310;

  function CarouselContainer(props) {
    const { cursor, ...rest } = props;
    const translateX = cursor.toFixed(5) * cardSize;

    return (
      <div className={'carousel-container'}>
        <div
          className='carousel-track'
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          {...rest}
        />
      </div>
    );
  }

  const Container = touchWithMouseHOC(CarouselContainer);

  async function getAllData() {
    const allUsers = await tryGetAllData('user');

    if (allUsers) setAllUsers(allUsers.data);
  }

  useEffect(() => {
    getAllData();
  }, []);

  function renderCard(index) {
    return <PatientSectionComponent patient={allUsers[index]} />;
  }

  return (
    <div className='dashboard-div'>
      <h1>Patients</h1>
      <TouchCarousel
        component={Container}
        cardCount={allUsers.length}
        cardSize={cardSize}
        renderCard={renderCard}
        loop={false}
      />
    </div>
  );
}
