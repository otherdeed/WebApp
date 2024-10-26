import './App.css';
import React from 'react';
import TopPanel from '../src/components/topPanel/topPanel';
import BottomPanel from '../src/components/bottomPanel/bottomPanel';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenRegWindow: this.getInitialRegWindowState(),
            registerAnswers: false,
            notifications: this.getInitialNotifications(),
            setting: this.getInitialSettings()
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
                : true
        }));
    }
    handleRegistrationSuccess() {
        this.setState({ isOpenRegWindow: true, registerAnswers: false });
    }

    removeNotification(id) {
        this.setState((prevState) => ({
            notifications: prevState.notifications.filter(notification => notification.id !== id),
        }));
    }

    changeStatusSetting(id) {
        this.setState((prevState) => {
            const updatedSettings = prevState.setting.map(setting => 
                setting.id === id ? { ...setting, status: !setting.status } : setting
            );
            localStorage.setItem(id, JSON.stringify(!prevState.setting.find(setting => setting.id === id).status));
            this.performingSettings(id)
            return { setting: updatedSettings };
        });
    }
    performingSettings(id){
        if(id === 1){
            if(JSON.parse(localStorage.getItem(id))){
                document.querySelector('body').classList.add('dark-theme')
                document.querySelector('body').classList.remove('light-theme')

                document.querySelector('.bottomPanel').classList.add('dark-theme-bottom-panel')
                document.querySelector('.bottomPanel').classList.remove('light-theme-bottom-panel')
                
                document.querySelectorAll('btnBottom').classList.add('dark-theme-bottom-panel-btn')
                document.querySelectorAll('btnBottom').classList.remove('light-theme-bottom-panel-btn')
                console.log('Темная тема включена');
            }else if(!JSON.parse(localStorage.getItem(id))){
                document.querySelector('body').classList.add('light-theme')
                document.querySelector('body').classList.remove('dark-theme')

                document.querySelectorAll('bottomPanel').classList.add('light-theme-bottom-panel')
                document.querySelectorAll('bottomPanel').classList.remove('dark-theme-bottom-panel')

                document.querySelector('.btnBottom').classList.add('light-theme-bottom-panel-btn')
                document.querySelector('.btnBottom').classList.remove('dark-theme-bottom-panel-btn')
                console.log('Темная тема выключена');
            }
        }
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
                <BottomPanel 
                    onSuccess={this.handleRegistrationSuccess} 
                    statusCheck={this.state} 
                />
            </div>
        );
    }
}

export default App;
