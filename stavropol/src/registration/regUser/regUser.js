import React, { useState } from 'react';
import './regUser.css';

function RegUser ({ name, username, phone, email, tgId, created_at, id}) {
    const [isRejectInputVisible, setRejectInputVisible] = useState(false);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const approveApplication = () => {
        console.log('Пользователь ' + name + ' одобрен');
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
        setReason('')
    };

    const handleUserRequest = async (userId, action) => {
        const response = await fetch("http://localhost:8888/stavropol/php/admin.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, action: action }),
        });
        const data = await response.json();
        setStatusMessage(data.message);
    };

    return (
        <div className='regUser'>
            <div className="userData">
                <p>Имя: <b>{name}</b></p>
                <p>Уникальное Имя: <b>{username}</b></p>
                <p>Номер: <b>{phone}</b></p>
                <p>Почта: <b>{email}</b></p>
                <p>Telegram ID: <b>{tgId}</b></p>
                <p>Date: <b>{created_at}</b></p>
                <div className='functionalBtn'>
                    <button className="fucnBtn btnApprove" onClick={() => handleUserRequest(id, "approve")}>Одобрить</button>
                    <button className="fucnBtn btnReject" onClick={() => handleUserRequest(id, "reject")}>Отказать</button>
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
                        {statusMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegUser ;
