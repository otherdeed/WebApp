import './settingWindow.css';
import SettingBlock from './settingBlock/settingBlock'
function SettingWindow({setting, changeStatusSetting}) {
    function Close(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.add('hidden')
    }
    return (
        <div className='settingWindow dark-theme-setting-window hidden'>
            <div className='close-setting-window'>
                <div onClick={() => Close('settingWindow')}>✖</div>
            </div>
            <div className='title'>Настройки</div>
            <div className='container'>
                {setting.map(setting => <SettingBlock message={setting.message} id={setting.id} status={setting.status} changeStatus={() => changeStatusSetting(setting.id)}/>)}
            </div>
        </div>
    );
}

export default SettingWindow;
