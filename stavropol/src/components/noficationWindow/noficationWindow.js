import './noficationWindow.css';
import NoficationBlock from './noficationBlock/noficationBlock';

function NoficationWindow({ notifications = [], onRemoveNotification }) {
    function Close(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.add('hidden')
    }
    return (
        <div className='notificationsWindows hidden'>
            <div className='close'>
                <div onClick={() => Close('notificationsWindows')}>x</div>
            </div>
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <NoficationBlock key={notification.id} message={notification.message} onClose={() => onRemoveNotification(notification.id)}/>
                ))
            ) : (
                <p>Уведомлений нету</p>
            )}
        </div>
    );
}

export default NoficationWindow;
