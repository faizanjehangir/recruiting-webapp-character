import { useState } from 'react';
import './App.css';
import CharacterSheet from './components/CharacterSheet.js';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts.js';

const initialCharacter = {
  id: Date.now(),
  name: 'New Character',
  attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = 10;
    return acc;
  }, {}),
  skills: SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = 0;
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

  const incrementSkill = (id, skillName) => {
    setCharacters(characters.map(char => char.id === id ? {
      ...char,
      skills: {
        ...char.skills,
        [skillName]: char.skills[skillName] + 1,
      },
    } : char));
  };

  const decrementSkill = (id, skillName) => {
    setCharacters(characters.map(char => char.id === id ? {
      ...char,
      skills: {
        ...char.skills,
        [skillName]: char.skills[skillName] - 1,
      },
    } : char));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      {selectedCharacter && (
        <CharacterSheet
          character={selectedCharacter}
          attributes={selectedCharacter.attributes}
          skills={selectedCharacter.skills}
          incrementAttribute={incrementAttribute}
          decrementAttribute={decrementAttribute}
          incrementSkill={incrementSkill}
          decrementSkill={decrementSkill}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      )}
    </div>
  );
}

export default App;
