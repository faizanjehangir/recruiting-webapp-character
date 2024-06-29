import React from 'react';
import Attribute from './Attribute';
import ClassSelection from './ClassSelection';

const CharacterSheet = ({
  character,
  attributes,
  incrementAttribute,
  decrementAttribute,
  selectedClass,
  setSelectedClass
}) => (
  <>
    <h2>{character.name}</h2>
    <div className="character-sheet">
      <div className="section">
        <h2>Attributes</h2>
        {Object.keys(attributes).map(attr => (
          <Attribute
            key={attr}
            characterId={character.id}
            name={attr}
            value={attributes[attr]}
            modifier={Math.floor((attributes[attr] - 10) / 2)}
            onIncrement={incrementAttribute}
            onDecrement={decrementAttribute}
          />
        ))}
      </div>
      <div className="section">
        <h2>Classes</h2>
        <ClassSelection 
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          attributes={attributes} 
        />
      </div>
    </div>
  </>
  
);
    
export default CharacterSheet;