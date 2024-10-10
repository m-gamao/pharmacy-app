import React from 'react';

const MedicationList = ({ medications }) => {
  return (
    <div>
      <h3>Selected Medications</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {medications.map((med, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>{med.name}</strong> (RxCUI: {med.rxCUI})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationList;
