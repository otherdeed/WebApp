import './topPanel.css';
import NoficationWindow from '../noficationWindow/noficationWindow';
import SettingWindow from '../settingWindow/settingWindow';
import { useState , useEffect } from 'react';
function TopPanel({ notifications, onRemoveNotification, setting, changeStatusSetting}) {
    const[count, setCount] = useState(notifications.length);
    useEffect(() => {
        setCount(notifications.length);
    })
    function OpenWindow(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.remove('hidden')
    }
    return (
        <div>
            <NoficationWindow notifications={notifications} onRemoveNotification={onRemoveNotification} /> 
            <SettingWindow setting={setting} changeStatusSetting={changeStatusSetting}/>
            <div className="topPanel">
                <div className="containerTop">
                    <div className="setting">
                        <button className="btnTop dark-theme-top-panel-btn" onClick={() =>OpenWindow('settingWindow')}>s</button>
                    </div>
                    <div className="nofication">
                        <button className="btnTop dark-theme-top-panel-btn" onClick={() =>{OpenWindow('notificationsWindows')}}>
                            {count}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopPanel;
