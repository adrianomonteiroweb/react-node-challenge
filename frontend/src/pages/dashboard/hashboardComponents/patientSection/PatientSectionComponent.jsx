import PropTypes from 'prop-types';

export default function PatientSectionComponent({
  patient: { firstName, lastName },
}) {
  return (
    <div className='carousel-card'>
      <h3 className='patient-name'>{`${firstName} ${lastName}`}</h3>
    </div>
  );
}

PatientSectionComponent.propTypes = {
  patient: PropTypes.object,
}.isRequired;
