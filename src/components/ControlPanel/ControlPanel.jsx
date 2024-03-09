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

const handleButtonClick = (action) => {
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

function ControlPanel({ nodes, edges }) {
  return (
    <div className={styles.controlpanel}>
      <button onClick={() => handleButtonClick('new-schema')}>Новая схема</button>
      <button onClick={() => handleButtonClick('open-file')}>Открыть файл</button>
      <button onClick={() => handleButtonClick('save-locally')}>Сохранить локально</button>
      <button onClick={() => handleButtonClick('save-server')}>Сохранить на сервере</button>
      <button onClick={() => handleButtonClick('settings')}>Настройки</button>
      <button onClick={() => handleButtonClick('info')}>Информация</button>
    </div>
  );
}
export default ControlPanel;
