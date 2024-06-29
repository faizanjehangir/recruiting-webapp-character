import { useState } from 'react';
import { SKILL_LIST } from '../consts';

const SkillCheck = ({ character }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(0);
  const [rollResult, setRollResult] = useState(null);
  const [checkResult, setCheckResult] = useState(null);

  const handleRoll = () => {
    const randomRoll = Math.floor(Math.random() * 20) + 1;
    const skill = SKILL_LIST.find(skill => skill.name === selectedSkill);
    const skillModifier = Math.floor((character.attributes[skill.attributeModifier] - 10) / 2);
    const total = skillModifier + character.skills[selectedSkill] + randomRoll;

    setRollResult(randomRoll);
    setCheckResult(total >= dc ? 'Successful' : 'Failure');
  };

  return (
    <div className="skill-check">
      <h2>Skill Check</h2>
      <div>
        <label>Skill:</label>
        <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
          {SKILL_LIST.map(skill => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>DC:</label>
        <input type="number" value={dc} onChange={(e) => setDc(Number(e.target.value))} />
      </div>
      <button onClick={handleRoll}>Roll</button>
      {rollResult !== null && (
        <div>
          <p>You Rolled: {rollResult}</p>
          <p>Result: {checkResult}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;