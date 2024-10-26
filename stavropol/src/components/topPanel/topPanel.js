import './topPanel.css';
import NoficationWindow from '../noficationWindow/noficationWindow';
import SettingWindow from '../settingWindow/settingWindow';
function TopPanel({ notifications, onRemoveNotification, setting, changeStatusSetting}) {
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
                        <button className="btnTop" onClick={() =>OpenWindow('settingWindow')}>s</button>
                    </div>
                    <div className="nofication">
                        <button className="btnTop" onClick={() =>OpenWindow('notificationsWindows')}>n</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopPanel;
