import { useNavigate } from 'react-router-dom';
import styles from './CardDetails.module.css';
import minimizeIcon from '../../assets/minimize_icon.svg';

function CardDetails() {
    const navigate = useNavigate();
    return (
        <div className={styles.window}>
            <h1 className={styles.title} >Кибернетика</h1>
            <div className={styles.description}>
                <p>Наука об управлении сложными системами с обратной связью. <br/><br/> Термин "Кибернетика" впервые появился в одном из сочинений Платона, заявлявшего о том, что всякое хорошее государство должно уметь управлять вообще, а не только разбираться в непосредственно</p>
            </div>
            <div className={styles.groupBox}>
                <div className={styles.pGroup}>
                    <p>Теги:</p>
                    <hr />
                    <p>Предварительные понятия:</p>
                    <hr />
                    <p>Нужно для:</p>
                </div>
                <div className={styles.btnGroup}>
                    <button>отметить как изученное</button>
                    <hr />
                    <button>сбросить прогреcc изучения</button>
                    <hr />
                    <button>выделить сеть понятия</button>
                </div>
            </div>
            <div className={styles.btnLine}>
                <button className={styles.btn}>начать занятие</button>
                <button className={styles.btn}>статистика</button>
                <button className={styles.btn}>удалить карточку</button>
                <button className={styles.minimize} onClick={() => navigate('/')}><img src={minimizeIcon} className={styles.minimizeIcon} alt='Свернуть' /></button>
            </div>
        </div>
    );
  }
export default CardDetails;