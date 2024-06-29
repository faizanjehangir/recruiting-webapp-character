import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

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

  const meetsClassRequirements = (className) => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(([attr, value]) => selectedCharacter.attributes[attr] >= value);
  };

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
        <h2>Classes</h2>
        <div className="class-selection">
          {Object.keys(CLASS_LIST).map(className => (
            <div
              key={className}
              onClick={() => setSelectedClass(className)}
              style={{
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
      </div>
    </div>
  );
}

export default App;
