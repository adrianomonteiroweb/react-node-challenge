import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function PatientSectionComponent({
  patient: { firstName, lastName, email, number },
}) {
  return (
    <div className='carousel-card'>
      <h3 className='patient-name'>{`${firstName} ${lastName}`}</h3>
      <span>
        Email: <p>{email}</p>
      </span>
      <span>
        Telefone: <p>{number}</p>
      </span>
      <Link className='view-more' to='/treatments'>
        <span>View More</span>
      </Link>
    </div>
  );
}

PatientSectionComponent.propTypes = {
  patient: PropTypes.object,
}.isRequired;
