import './App.css';
import React from 'react';
import TopPanel from '../src/components/topPanel/topPanel';
import BottomPanel from '../src/components/bottomPanel/bottomPanel';
import CenterButton from './components/centerButton/centerButton';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenRegWindow: this.getInitialRegWindowState(),
            registerAnswers: false,
            notifications: this.getInitialNotifications(),
            setting: this.getInitialSettings(),
            countNotifications: this.getInitialNotifications().length
        };
        this.handleRegistrationSuccess = this.handleRegistrationSuccess.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
        this.changeStatusSetting = this.changeStatusSetting.bind(this);
    }
    getInitialRegWindowState() {
        return JSON.parse(localStorage.getItem('isOpenRegWindow')) || false;
    }
    getInitialNotifications() {
        return [
            { id: 1, message: 'Уведомление 1' },
            { id: 2, message: 'Уведомление 2' },
            { id: 3, message: 'Уведомление 3' },
            { id: 4, message: 'Уведомление 4' },
            { id: 5, message: 'Уведомление 5' },
            { id: 6, message: 'Уведомление 6' }
        ];
    }

    getInitialSettings() {
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

    componentDidMount() {
        const isDarkTheme = JSON.parse(localStorage.getItem(1));
        this.performingSettings(1, isDarkTheme);
    }

    handleRegistrationSuccess() {
        this.setState({ isOpenRegWindow: true, registerAnswers: false });
    }

    removeNotification = (id) => {
        this.setState(prevState => {
            const updatedNotifications = prevState.notifications.filter(notification => notification.id !== id);
            return {
                notifications: updatedNotifications,
                countNotifications: updatedNotifications.length,
            };
        });
    };
    changeStatusSetting(id) {
        this.setState((prevState) => {
            const updatedSettings = prevState.setting.map(setting => 
                setting.id === id ? { ...setting, status: !setting.status } : setting
            );
            const newStatus = !prevState.setting.find(setting => setting.id === id).status;
            localStorage.setItem(id, JSON.stringify(newStatus));
            this.performingSettings(id, newStatus);
            return { setting: updatedSettings };
        });
    }

    performingSettings(id, isDarkTheme) {
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
        document.querySelector('.textReg').classList.remove(`${oppositeThemeClass}-regWindow-`);
        document.querySelector('.btnReg').classList.add(`${themeClass}-regWindow-btnReg`);
        document.querySelector('.btnReg').classList.remove(`${oppositeThemeClass}-regWindow-btnReg`)
        document.querySelector('.centerButton').classList.add(`${themeClass}-central-btn`);
        document.querySelector('.centerButton').classList.remove(`${oppositeThemeClass}-central-btn`)
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
    }

    render() {
        return (
            <div className="App">
                <TopPanel 
                    notifications={this.state.notifications} 
                    onRemoveNotification={this.removeNotification} 
                    setting={this.state.setting} 
                    changeStatusSetting={this.changeStatusSetting}
                />
                <CenterButton/>
                <BottomPanel 
                    onSuccess={this.handleRegistrationSuccess} 
                    statusCheck={this.state} 
                    countNotifications={this.state.countNotifications} 
                />
            </div>
        );
    }
}

export default App;
