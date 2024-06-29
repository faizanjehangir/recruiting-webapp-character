import Skill from './Skill';
import { SKILL_LIST } from '../consts';

const SkillsList = ({ skills, attributes, totalSkillPoints, incrementSkill, decrementSkill }) => {
  
  return (
  <div className="skills-list">
    <h3>Total skill points available {totalSkillPoints}</h3>
    {SKILL_LIST.map(skill => (
      <Skill
        key={skill.name}
        name={skill.name}
        points={skills[skill.name]}
        modifier={{
          attributeModifier: skill.attributeModifier,
          value: Math.floor((attributes[skill.attributeModifier] - 10) / 2),
        }}
        total={skills[skill.name] + Math.floor((attributes[skill.attributeModifier] - 10) / 2)}
        onIncrement={incrementSkill}
        onDecrement={decrementSkill}
      />
    ))}
  </div>
)};

export default SkillsList;