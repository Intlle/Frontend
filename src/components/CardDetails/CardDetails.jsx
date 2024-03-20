import { useNavigate } from 'react-router-dom';
import styles from './CardDetails.module.css';
import minimizeIcon from '../../assets/minimize_icon.svg';

function CardDetails() {
    const navigate = useNavigate();
    return (
        <div className={styles.window}>
            <div className={styles.btnLine}>
                <button className={styles.minimize} onClick={() => navigate('/')}><img src={minimizeIcon} className={styles.minimizeIcon} alt='Свернуть' /></button>
                <button className={styles.btn}>начать занятие</button>
                <button className={styles.btn}>статистика</button>
                <button className={styles.btn}>удалить карточку</button>
            </div>
            <div className={styles.box}>
                <button className={styles.hard}>Тяжело-о-о...</button>
                <div className={styles.card}>
                    <div>
                        <h1 className={styles.title} >Кибернетика</h1>
                        <p className={styles.description}>Наука об управлении сложными системами с обратной связью. <br/><br/> Термин "Кибернетика" впервые появился в одном из сочинений Платона, заявлявшего о том, что всякое хорошее государство должно уметь управлять вообще, а не только разбираться в непосредственно</p>
                    </div>
                    <button className={styles.turn}>-----------</button>
                </div>
                <div className={styles.twobtn}>
                    <button className={styles.good}>Получилось вспомнить</button>
                    <button className={styles.something}>Что-то припоминается</button>
                </div>
            </div>
            <div className={styles.extra}>
                <p>Теги:</p>
                <p>Предварительные понятия:</p>
                <p>Нужно для:</p>
                </div>
            </div>
    );
  }
export default CardDetails;