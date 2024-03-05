import React from 'react';

function ControlPanel({ onChangeColor }) {
    return (
      <div className='controlpanel'>
        <h1 className='h1'>Панель управления</h1>
        <button className='button'>Размер 1</button>
        <button className='button'>Размер 2</button>
        <button className='button'>Размер 3</button>
        <button className='button' style={{ backgroundColor: 'red' }} onClick={() => onChangeColor('red')}>
          Красный
        </button>
        <button className='button' style={{ backgroundColor: 'yellow' }} onClick={() => onChangeColor('yellow')}>
          Желтый
        </button>
        <button className='button' style={{ backgroundColor: 'green' }} onClick={() => onChangeColor('green')}>
          Зеленый
        </button>
      </div>
    );
  }
export default ControlPanel;