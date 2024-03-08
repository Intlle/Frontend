import { useNavigate } from 'react-router-dom';
import './CardDetails.css'
import minimizeIcon from '../../assets/minimize_icon.svg'

function CardDetails() {
    const navigate = useNavigate();
    return (
        <div className='window'>
            <h1>Кибернетика</h1>
            <div className='description'>
                <p>Наука об управлении сложными системами с обратной связью. <br/><br/> Термин "Кибернетика" впервые появился в одном из сочинений Платона, заявлявшего о том, что всякое хорошее государство должно уметь управлять вообще, а не только разбираться в непосредственно</p>
            </div>
            <div className='group-box'>
                <div className="p-group">
                    <p>Теги:</p>
                    <hr />
                    <p>Предварительные понятия:</p>
                    <hr />
                    <p>Нужно для:</p>
                </div>
                <div className='btn-group'>
                    <button>отметить как изученное</button>
                    <hr />
                    <button>сбросить прогреcc изучения</button>
                    <hr />
                    <button>выделить сеть понятия</button>
                </div>
            </div>
            <div className='btn-line'>
                <button className='btn'>начать занятие</button>
                <button className='btn'>статистика</button>
                <button className='btn'>удалить карточку</button>
                <button className='minimize' onClick={() => navigate('/')}><img src={minimizeIcon} className='minimizeIcon' alt='Свернуть' /></button>
            </div>
        </div>
    );
  }
export default CardDetails;