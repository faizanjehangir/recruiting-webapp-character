import { useState, useEffect } from 'react';
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
  const [selectedCharacterId, setSelectedCharacterId] = useState(initialCharacter.id);
  const [selectedClass, setSelectedClass] = useState(null);

  const selectedCharacter = characters.find(char => char.id === selectedCharacterId);

  const intModifier = Math.floor((selectedCharacter.attributes.Intelligence - 10) / 2);
  const totalSkillPoints = 10 + (4 * intModifier);
  const pointsSpent = Object.values(selectedCharacter.skills).reduce((sum, val) => sum + val, 0);

  const addCharacter = () => {
    const newCharacter = {
      id: Date.now(),
      name: `Character ${characters.length + 1}`,
      attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
        acc[attr] = 10;
        return acc;
      }, {}),
      skills: SKILL_LIST.reduce((acc, skill) => {
        acc[skill.name] = 0;
        return acc;
      }, {}),
    };
    setCharacters([...characters, newCharacter]);
    setSelectedCharacterId(newCharacter.id);
  };

  useEffect(() => {
    fetch(`https://recruiting.verylongdomaintotestwith.ca/api/faizanjehangir/character`)
      .then(response => response.json())
      .then(data => {
        if (data && data.body) {
          setCharacters(data.body);
          setSelectedCharacterId(data.body[0].id);
        }
      })
      .catch(error => console.error('Error fetching character data:', error));
  }, []);

  const saveCharacter = () => {
    fetch(`https://recruiting.verylongdomaintotestwith.ca/api/faizanjehangir/character`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(characters),
    })
    .then(response => response.json())
    .then(data => alert('Character saved!', data))
    .catch(error => console.error('Error saving character data:', error));
  };

  const incrementAttribute = (characterId, attrName) => {
    setCharacters(prevChars => {
      const updatedChars = prevChars.map(char => {
        if (char.id === characterId) {
          const totalAttributes = Object.values(char.attributes).reduce((sum, val) => sum + val, 0);
          if (totalAttributes < 70) {
            return {
              ...char,
              attributes: {
                ...char.attributes,
                [attrName]: char.attributes[attrName] + 1
              }
            };
          } else {
            alert("A character can have up to 70 Delegated attribute points.");
          }
        }
        return char;
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
    if (totalSkillPoints === pointsSpent) {
      alert("You need more skill points! Upgrade intelligence to get more");
      return;
    }
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
      <div className="character-selector">
        <h2>Characters</h2>
        {characters.map(character => (
          <button
            key={character.id}
            onClick={() => setSelectedCharacterId(character.id)}
            className={character.id === selectedCharacterId ? 'selected' : ''}
          >
            {character.name}
          </button>
        ))}
        <button onClick={addCharacter}>Add Character</button>
        <button onClick={() => saveCharacter()}>Save Character</button>
      </div>
      {selectedCharacter && (
        <CharacterSheet
          character={selectedCharacter}
          attributes={selectedCharacter.attributes}
          skills={selectedCharacter.skills}
          totalSkillPoints={totalSkillPoints}
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
