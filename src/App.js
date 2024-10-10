import React, { useState } from 'react';
import DrugSearchDropdown from './components/DrugSearchDropdown';
import MedicationList from './components/MedicationList';
import './App.css'; // Separate CSS file for styling

const App = () => {
  const [medications, setMedications] = useState([]);

  // Function to add a medication to the list
  const addMedication = (medication) => {
    setMedications([...medications, medication]);
  };

  // Function to clear the medication list
  const clearMedications = () => {
    setMedications([]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Medication Finder</h1>
      </header>

      <section className="search-section">
        <p className="app-description">
          Enter the name of a medication to search the RxNorm medication database.
        </p>
        <DrugSearchDropdown onDrugSelect={addMedication} />
        <MedicationList medications={medications} />
        {medications.length > 0 && (
          <button className="clear-btn" onClick={clearMedications}>
            Clear Results
          </button>
        )}
      </section>

      <section className="about-section">
        <h3>About this app</h3>
        <p>
          This app provides the RxCUI (RxNorm concept unique identifier) from the RxNorm database. 
          RxNorm is a system developed by the National Library of Medicine (NLM) for 
          normalizing the names of prescription and over-the-counter drugs. 
          It provides a standardized format for drug names, eliminating confusion when 
          different organizations use different names for identical medications, 
          including generics and branded drugs.
        </p>
        <p>
          Healthcare IT teams use RxNorm for communication between EHR systems, 
          insurance companies use it to build drug lists for prescription coverage policies, 
          and researchers rely on RxNorm for coding medication data from study participants.
        </p>
      </section>
    </div>
  );
};

export default App;
