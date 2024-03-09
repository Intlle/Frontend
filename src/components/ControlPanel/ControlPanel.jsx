import React from 'react';
import styles from './ControlPanel.module.css'

function ControlPanel({ onChangeColor }) {
    return (
      <div className={styles.controlpanel}>
        <h1 className={styles.h1}>Панель управления</h1>
        <button className={styles.button}>Размер 1</button>
        <button className={styles.button}>Размер 2</button>
        <button className={styles.button}>Размер 3</button>
        <button className={styles.button} style={{ backgroundColor: 'red' }} onClick={() => onChangeColor('red')}>
          Красный
        </button>
        <button className={styles.button} style={{ backgroundColor: 'yellow' }} onClick={() => onChangeColor('yellow')}>
          Желтый
        </button>
        <button className={styles.button} style={{ backgroundColor: 'green' }} onClick={() => onChangeColor('green')}>
          Зеленый
        </button>
      </div>
    );
  }
export default ControlPanel;