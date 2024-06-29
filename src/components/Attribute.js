
const Attribute = ({ characterId, name, value, modifier, onIncrement, onDecrement }) => {
  return (
    <div className="section-rows">
      <span>{name}: {value} (Modifier: {modifier})</span>
      <button onClick={() => onIncrement(characterId, name)}>+</button>
      <button onClick={() => onDecrement(characterId, name)}>-</button>
    </div>
  );
};

export default Attribute;