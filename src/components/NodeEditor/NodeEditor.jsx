import React, { useState } from 'react';
const NodeEditor = ({ node, onColorChange, onSizeChange, onApply }) => {
  const [color, setColor] = useState(node?.data?.color || '#FFFFFF');
  const [size, setSize] = useState(node?.data?.size || '');
  const handleColorChange = (e) => {
    setColor(e.target.value);
    onColorChange(e.target.value);
    console.log('New color:', e.target.value);
  };
  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    onSizeChange(parseInt(e.target.value));
    console.log('New size:', parseInt(e.target.value));
  };
  const handleApply = () => {
    console.log("Applying changes:", color, size);
    onApply(color, size, node.data.label);
  };

  return (
    <div >
      <label style={{ color: 'white', fontFamily: 'inherit', fontWeight: '500' }}>Цвет:
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
      <label style={{ color: 'white', fontFamily: 'inherit', fontWeight: '500' }}>Размер:
        <input type="number" value={size} onChange={handleSizeChange} />
      </label>
      <div>
        <button onClick={handleApply}>Применить</button>
      </div>
    </div>
  );
};

export default NodeEditor;


