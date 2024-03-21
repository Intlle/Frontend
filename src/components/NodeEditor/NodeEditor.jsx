import React from 'react';

const NodeEditor = ({onColorChange, onSizeChange, onDeleteNode,onAddNode }) => {
  const handleColorChange = (color) => {
    onColorChange(color);
    console.log('New color:', color);
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
    console.log('New size:', size);
  };

  return (
    <div style={{ color: 'white', fontFamily: 'inherit', fontWeight: '500' }}>
      <div>
        <label>Цвет:</label>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          {['#ED217C', '#8075FF', '#c51d34', '#CDCDCD', '#1C2130'].map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color, width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px', border: '2px solid white', cursor: 'pointer' }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Размер:</label>
        <div style={{ display: 'flex', marginTop: '5px', alignItems: 'center' }}>
          {[20, 30, 40].map((size) => (
            <button
              key={size}
              style={{ backgroundColor: 'white', width: `${size}px`, height: `${size}px`, borderRadius: '50%', marginRight: '5px', border: 'none', cursor: 'pointer' }}
              onClick={() => handleSizeChange(size)}
            />
          ))}
        </div>
      </div>
      <div  className='button-container' style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          style={{margin:'1px',marginTop: '10px',fontWeight: '500',fontFamily:'inherit', backgroundColor: 'White', color: 'black', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
          onClick={onDeleteNode}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#CDCDCD'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'White'; }}
        >
          Удалить узел
        </button>
        <button
          style={{ marginTop: '10px',fontWeight: '500',fontFamily:'inherit', backgroundColor: 'White', color: 'black', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
          onClick={onAddNode}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#CDCDCD'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'White'; }}
        >
          Добавить узел
        </button>
      </div>
    </div>
  );
};

export default NodeEditor;


