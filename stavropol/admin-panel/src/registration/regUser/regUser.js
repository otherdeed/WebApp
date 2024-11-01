import React, { useState } from 'react';
import './regUser.css';

function RegUser ({ name, nickName, number, email, tgId, onRemoveInListUser, reasonMess}) {
    const [isRejectInputVisible, setRejectInputVisible] = useState(false);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const approveApplication = () => {
        console.log('Пользователь ' + name + ' одобрен');
        onRemoveInListUser (tgId);
    };

    const rejectApplication = () => {
        setRejectInputVisible(true);
        setError(''); // Сброс ошибки при открытии ввода причины
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleSend = () => {
        if (!reason.trim()) {
            setError('Причина отказа не может быть пустой.'); // Проверка на пустую причину
            return;
        }
        
        console.log('Пользователь ' + name + ', причина отказа:', reason);
        setRejectInputVisible(false);
        setReason('');
        onRemoveInListUser (tgId,reason);
        reasonMess(reason)
        setReason('')
    };

    return (
        <div className='regUser '>
            <div className="userData">
                <p>Имя: <b>{name}</b></p>
                <p>Уникальное Имя: <b>{nickName}</b></p>
                <p>Номер: <b>{number}</b></p>
                <p>Почта: <b>{email}</b></p>
                <p>Telegram ID: <b>{tgId}</b></p>
                <div className='functionalBtn'>
                    <button className="fucnBtn btnApprove" onClick={approveApplication}>Одобрить</button>
                    <button className="fucnBtn btnReject" onClick={rejectApplication}>Отказать</button>
                </div>
                {isRejectInputVisible && (
                    <div className='functionalBtn'>
                        <input
                            className='inputReject'
                            placeholder='Причина отказа'
                            value={reason}
                            onChange={handleReasonChange}
                        />
                        <button className="btnSend" onClick={handleSend}>Отправить</button>
                        {error && <div>{error}</div>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegUser ;
