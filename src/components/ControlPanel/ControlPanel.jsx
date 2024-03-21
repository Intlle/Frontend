import React from 'react';
import styles from './ControlPanel.module.css'

const createProjectSchema = (nodes, edges) => {
  return JSON.stringify({ nodes, edges }, null, 2);
};

const downloadFile = (content, fileName) => {
  const blob = new Blob([content], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleButtonClick = (action, nodes, edges) => {
  switch (action) {
    case 'new-schema':
      window.open('http://localhost:5173');
      break;
    case 'open-file':
      const input = document.createElement('input');
      input.type = 'file';
      input.click();
      break;
    case 'save-locally':
      const projectSchema = createProjectSchema(nodes, edges);
      downloadFile(projectSchema, 'project-schema.json');
      break;
    default:
      break;
  }
};
const controlPanel = {
position: 'absolute',
top: '20px',
right: '20px',
display: 'flex',
flexDirection:'column',
width: '200px',
borderRadius: '20px',
backgroundColor: '#fcfcfc',
};
const buttonRadius1 ={
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  fontSize: '15px',
  fontWeight: '500',
  fontFamily: 'inherit',
  border: 'none',
  color: '#000000',
  cursor: 'pointer',
  padding: '5px',
};
const buttonRadius2 ={
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  fontSize: '15px',
  fontWeight: '500',
  fontFamily: 'inherit',
  border: 'none',
  color: '#000000',
  cursor: 'pointer',
  padding: '5px',
};
const buttonControlPanel= {
  fontSize: '15px',
  fontWeight: '500',
  fontFamily: 'inherit',
  border: 'none',
  color: '#000000',
  cursor: 'pointer',
  padding: '5px',
};

function ControlPanel({ nodes, edges }) {
  return (
    <div style={controlPanel}>
      <button style={buttonRadius1} className={styles.button} onClick={() => handleButtonClick('new-schema')}>Новая схема</button>
      <button style={buttonControlPanel} className={styles.button} onClick={() => handleButtonClick('open-file')}>Открыть файл</button>
      <button style={buttonControlPanel} className={styles.button} onClick={() => handleButtonClick('save-locally')}>Сохранить локально</button>
      <button style={buttonControlPanel} className={styles.button} onClick={() => handleButtonClick('save-locally', nodes, edges)}>Сохранить локально</button>
      <button style={buttonRadius2} className={styles.button} onClick={() => handleButtonClick('settings')}>Настройки</button>
    </div>
  );
}

export default ControlPanel;
