import { useState } from 'react';
import './App.css';
import ClassSelection from './components/ClassSelection.js';
import Attribute from './components/Attribute.js';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts.js';

const initialCharacter = {
  id: Date.now(),
  name: 'New Character',
  attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = 10;
    return acc;
  }, {}),
};

function App() {

  const [characters, setCharacters] = useState([initialCharacter]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState(characters[0].id);
  const selectedCharacter = characters.find(char => char.id === selectedCharacterId);

  const incrementAttribute = (characterId, attrName) => {
    setCharacters(prevChars => {
      const updatedChars = prevChars.map(char => {
        if (char.id === characterId) {
            return {
              ...char,
              attributes: {
                ...char.attributes,
                [attrName]: char.attributes[attrName] + 1
              }
            };
          }
      });
      return updatedChars;
    });
  };

  const decrementAttribute = (characterId, attrName) => {
    setCharacters(prevChars => prevChars.map(char => {
      if (char.id === characterId) {
        return {
          ...char,
          attributes: {
            ...char.attributes,
            [attrName]: char.attributes[attrName] - 1
          }
        };
      }
      return char;
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <div className="section">
        <h2>Attributes</h2>
        {Object.keys(selectedCharacter.attributes).map(attr => (
          <Attribute
            key={attr}
            characterId={selectedCharacter.id}
            name={attr}
            value={selectedCharacter.attributes[attr]}
            modifier={Math.floor((selectedCharacter.attributes[attr] - 10) / 2)}
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
          attributes={selectedCharacter.attributes} 
        />
      </div>
    </div>
  );
}

export default App;
