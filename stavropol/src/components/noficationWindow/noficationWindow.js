import './noficationWindow.css';
import NoficationBlock from './noficationBlock/noficationBlock';
import { removeNotification } from '../../store/client/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
function NoficationWindow() {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications.notifications);

    function Close(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.add('hidden')
    }
    const onRemoveNotification = (id) => {
        dispatch(removeNotification(id));
    };
    return (
        <div className='notificationsWindows dark-theme-notificationsWindows hidden'>
            <div className='close'>
                <div onClick={() => Close('notificationsWindows')}>✖</div>
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
