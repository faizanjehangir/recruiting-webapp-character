import React from 'react';
import { CLASS_LIST } from '../consts';

const ClassSelection = ({ selectedClass, setSelectedClass, attributes }) => {
  const meetsClassRequirements = (className) => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(([attr, value]) => attributes[attr] >= value);
  };

  return (
    <div className="class-selection">
      {Object.keys(CLASS_LIST).map(className => (
        <div
          key={className}
          onClick={() => setSelectedClass(className)}
          style={{
            cursor: 'pointer',
            backgroundColor: meetsClassRequirements(className) ? 'lightgreen' : 'lightcoral',
          }}
        >
          {className}
        </div>
      ))}
      {selectedClass && (
        <div>
          <h3>{selectedClass} Requirements</h3>
          <ul>
            {Object.entries(CLASS_LIST[selectedClass]).map(([attr, value]) => (
              <li key={attr}>{attr}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClassSelection;
