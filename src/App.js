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
      <section className="App-section">
      </section>
    </div>
  );
}

export default App;
