import Attribute from './Attribute';
import ClassSelection from './ClassSelection';
import SkillsList from './SkillsList';
import SkillCheck from './SkillCheck';

const CharacterSheet = ({
  character,
  attributes,
  skills,
  totalSkillPoints,
  incrementAttribute,
  decrementAttribute,
  incrementSkill,
  decrementSkill,
  selectedClass,
  setSelectedClass
}) => (
  <>
    <h2>{character.name}</h2>
    <SkillCheck character={character} />
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
      <div className="section">
        <h2>Skills</h2>
        <SkillsList
          skills={skills}
          attributes={attributes}
          totalSkillPoints={totalSkillPoints}
          incrementSkill={(name) => incrementSkill(character.id, name)}
          decrementSkill={(name) => decrementSkill(character.id, name)} />
      </div>
    </div>
  </>
  
);
    
export default CharacterSheet;