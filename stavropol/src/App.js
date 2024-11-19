import './App.css';
import React, { useState, useEffect } from 'react';
import TopPanel from './components/topPanel/topPanel';
import BottomPanel from './components/bottomPanel/bottomPanel';
import CenterButton from './components/centerButton/centerButton';
import {useDispatch} from 'react-redux';
import { addDataUser } from './store/client/telegramDataSlice';
const App = () => {
    const [isOpenRegWindow, setIsOpenRegWindow] = useState(getInitialRegWindowState());
    const [registerAnswers, setRegisterAnswers] = useState(false);
    const [setting, setSetting] = useState(getInitialSettings());
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe
    const userData = {
        userID : user.id,
        platform: user.platform,
        userName: user.username,
        user: user.first_name,
        chatId: user.chat_id
    }
    const dispatch = useDispatch();
    dispatch(addDataUser(userData));
    console.log('User data -----'+ userData.userID)
    function getInitialRegWindowState() {
        // return JSON.parse(localStorage.getItem('isOpenRegWindow')) || false;
        return false; 
    }

    function getInitialSettings() {
        const defaultSettings = [
            { id: 1, message: 'Темная тема' },
            { id: 2, message: 'NotWork' },
            { id: 3, message: 'NotWork' },
            { id: 4, message: 'NotWork' },
            { id: 5, message: 'NotWork' },
            { id: 6, message: 'NotWork' }
        ];

        return defaultSettings.map(setting => ({
            ...setting,
            status: JSON.parse(localStorage.getItem(setting.id)) !== null 
                ? JSON.parse(localStorage.getItem(setting.id)) 
                : false
        }));
    }

    useEffect(() => {
        const isDarkTheme = JSON.parse(localStorage.getItem(1));
        performingSettings(1, isDarkTheme);
    }, []);

    const handleRegistrationSuccess = () => {
        setIsOpenRegWindow(true);
        setRegisterAnswers(false);
    };

    const changeStatusSetting = (id) => {
        setSetting(prevSettings => {
            const updatedSettings = prevSettings.map(setting => 
                setting.id === id ? { ...setting, status: !setting.status } : setting
            );
            const newStatus = !prevSettings.find(setting => setting.id === id).status;
            localStorage.setItem(id, JSON.stringify(newStatus));
            performingSettings(id, newStatus);
            return updatedSettings;
        });
    };

    const performingSettings = (id, isDarkTheme) => {
        const themeClass = isDarkTheme ? 'dark-theme' : 'light-theme';
        const oppositeThemeClass = isDarkTheme ? 'light-theme' : 'dark-theme';

        document.querySelector('body').classList.add(themeClass);
        document.querySelector('body').classList.remove(oppositeThemeClass);
        document.querySelector('.bottomPanel').classList.add(`${themeClass}-bottom-panel`);
        document.querySelector('.bottomPanel').classList.remove(`${oppositeThemeClass}-bottom-panel`);
        document.querySelector('.settingWindow').classList.add(`${themeClass}-setting-window`);
        document.querySelector('.settingWindow').classList.remove(`${oppositeThemeClass}-setting-window`);
        document.querySelector('.blockReg').classList.add(`${themeClass}-regWindow`);
        document.querySelector('.blockReg').classList.remove(`${oppositeThemeClass}-regWindow`);
        document.querySelector('.notificationsWindows').classList.add(`${themeClass}-notificationsWindows`);
        document.querySelector('.notificationsWindows').classList.remove(`${oppositeThemeClass}-notificationsWindows`);
        document.querySelector('.textReg').classList.add(`${themeClass}-regWindow`);
        document.querySelector('.textReg').classList.remove(`${oppositeThemeClass}-regWindow`);
        document.querySelector('.btnReg').classList.add(`${themeClass}-regWindow-btnReg`);
        document.querySelector('.btnReg').classList.remove(`${oppositeThemeClass}-regWindow-btnReg`);
        document.querySelector('.centerButton').classList.add(`${themeClass}-central-btn`);
        document.querySelector('.centerButton').classList.remove(`${oppositeThemeClass}-central-btn`);
        document.querySelector('.treeWindow').classList.add(`${themeClass}-treeWindow`);
        document.querySelector('.treeWindow').classList.remove(`${oppositeThemeClass}-treeWindow`);
        document.querySelector('.btn-tree').classList.add(`${themeClass}-btn-tree`);
        document.querySelector('.btn-tree').classList.remove(`${oppositeThemeClass}-btn-tree`);
        
        const buttonsBottomPanel = document.querySelectorAll('.btnBottom');
        buttonsBottomPanel.forEach(button => {
            button.classList.add(`${themeClass}-bottom-panel-btn`);
            button.classList.remove(`${oppositeThemeClass}-bottom-panel-btn`);
        });

        const buttonsTopPanel = document.querySelectorAll('.btnTop');
        buttonsTopPanel.forEach(button => {
            button.classList.add(`${themeClass}-top-panel-btn`);
            button.classList.remove(`${oppositeThemeClass}-top-panel-btn`);
        });
    };

    return (
        <div className="App">
            <TopPanel 
                notifications={[]}  // Замените на актуальные данные, если нужно
                onRemoveNotification={() => {}} // Замените на актуальную функцию, если нужно
                setting={setting} 
                changeStatusSetting={changeStatusSetting}
            />
            <CenterButton />
            <BottomPanel 
                onSuccess={handleRegistrationSuccess} 
                statusCheck={{ isOpenRegWindow, registerAnswers }} 
                countNotifications={0} // Замените на актуальные данные, если нужно
            />
        </div>
    );
};

export default App;
