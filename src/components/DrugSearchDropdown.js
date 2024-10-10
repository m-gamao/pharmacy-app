import React, { useState } from 'react';
import axios from 'axios';

const DrugSearchDropdown = ({ onDrugSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [drugOptions, setDrugOptions] = useState([]);

  // Function to search for drugs by name
  const fetchDrugOptions = async (term) => {
    try {
      const response = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${term}`
      );
  
      // Check if drugGroup and conceptGroup exist and are not empty
      if (response.data.drugGroup && response.data.drugGroup.conceptGroup) {
        const drugs = response.data.drugGroup.conceptGroup.flatMap(group =>
          group.conceptProperties?.map(drug => ({
            name: drug.name,
            rxCUI: drug.rxcui,
          })) || [] // If no conceptProperties, return an empty array
        );
        setDrugOptions(drugs);
      } else {
        setDrugOptions([]);  // No results
      }
    } catch (error) {
      console.error('Error fetching drug options', error);
      setDrugOptions([]);  // Clear options on error
    }
  };
  

  // Handle user input change
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 2) {
      fetchDrugOptions(term);
    } else {
      setDrugOptions([]);
    }
  };

  // Handle selection of a drug from dropdown
  const handleDrugSelect = (drug) => {
    onDrugSelect(drug); // Pass selected drug to parent component
    setSearchTerm(drug.name);
    setDrugOptions([]); // Hide the dropdown after selection
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for medication"
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
