import React from 'react';

const Skill = ({ name, points, modifier, total, onIncrement, onDecrement }) => (
  <div className="section-rows">
    <span>{name}: {points}</span>
    <button onClick={() => onIncrement(name)}>+</button>
    <button onClick={() => onDecrement(name)}>-</button>
    <span> Modifier ({modifier.attributeModifier}): {modifier.value}</span>
    <span> Total: {total}</span>
  </div>
);

export default Skill;
