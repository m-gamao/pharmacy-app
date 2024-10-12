// app can find the brand name but only retrieves the rxcui codes for it.

import React, { useState } from 'react';
import axios from 'axios';

const DrugSearchDropdown = ({ onDrugSelect, searchTerm, setSearchTerm }) => {
  const [drugOptions, setDrugOptions] = useState([]);

  // Function to search for drugs by approximate name
  const fetchDrugOptions = async (term) => {
    try {
      const response = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${term}&maxEntries=10`
      );

      // Check if there are any candidate matches in the response
      if (response.data.approximateGroup && response.data.approximateGroup.candidate) {
        const drugs = response.data.approximateGroup.candidate.map(candidate => ({
          name: candidate.term,
          rxCUI: candidate.rxcui,
        }));
        setDrugOptions(drugs);  // Set drug options based on approximate terms
      } else {
        setDrugOptions([]);  // No results found
      }
    } catch (error) {
      console.error('Error fetching drug options', error);
      setDrugOptions([]);  // Clear options on error
    }
  };

  // Handle user input change
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);  // Update the search term in the parent component
    if (term.length > 2) {
      fetchDrugOptions(term);  // Fetch approximate matches when the term is long enough
    } else {
      setDrugOptions([]);
    }
  };

  // Handle selection of a drug from dropdown
  const handleDrugSelect = (drug) => {
    onDrugSelect(drug);  // Pass selected drug to parent component
    setSearchTerm(drug.name);  // Update search term with selected drug name
    setDrugOptions([]);  // Hide the dropdown after selection
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for medication"
        className="search-input"
      />
      {drugOptions.length > 0 && (
        <ul style={{ border: '1px solid #ccc', listStyleType: 'none', padding: 0 }}>
          {drugOptions.map((drug, index) => (
            <li
              key={index}
              onClick={() => handleDrugSelect(drug)}
              style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#fff' }}
            >
              {drug.name} (RxCUI: {drug.rxCUI})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugSearchDropdown;
