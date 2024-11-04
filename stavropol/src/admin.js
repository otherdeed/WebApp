import React from 'react';
import './App.css';
import RegistrationBlock from './registration/registration';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [
        { access: 'moderator', login: 'mod', password: '123', name:'Ivan', surname:'Ivanov' },
        { access: 'seniorModerator', login: 'senMod', password: '321', name:'Denis', surname:'Denisov' },
        { access: 'administrator', login: 'admin', password: '111', name:'Timur', surname:'Timurov' }
      ],
      thisEmployee:new Object(),
      thisHistory:[],
      isAuthorized: false,
      applicationsregistration:[],
      myIp:'',
      callBackMess:'',
      statusMessage:''
    };
    this.removeInListUser = this.removeInListUser.bind(this);
    this.handleAuthorization = this.handleAuthorization.bind(this);
    this.addHistory = this.addHistory.bind(this);
    this.loadPendingUsers = this.loadPendingUsers.bind(this);
  }
  loadPendingUsers = async () => {
    try {
      const response = await fetch("http://localhost:8888/reg-admin/my-app/php/getPendingUsers.php");
      const data = await response.json();
      this.setState({ applicationsregistration: data.pendingUsers || []});
    } catch (error) {
      this.state.statusMessage= "Ошибка загрузки данных пользователей"
      console.error("Ошибка при загрузке пользователей:", error); // вывод в консоль для отладки
    }
  };
  componentDidMount() {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        this.setState({ myIp: data.ip }); // Сохраняем IP-адрес в состоянии
      })
      .catch(error => console.error('Error fetching IP:', error));
    this.handleAuthorization();
    this.loadPendingUsers()
    const interval = setInterval(() => {
      this.loadPendingUsers(); // Обновление заявок каждые 5 секунд
    }, 5000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }

  removeInListUser (tgId, reason) {
    this.setState(prevState => ({
      applicationsregistration: prevState.applicationsregistration.filter(app => app.tgId !== tgId)
    }));
    this.addHistory('reject', tgId, this.state.myIp, reason)
  }
  addHistory(action, tgId, ip, mess = '') {
    const date = new Date().toISOString();
    const newHistoryEntry = {
      employee: this.state.thisEmployee.name,
      action: action,
      userId: tgId,
      date: date,
      ip: ip,
      message: mess
    };
    this.setState(prevState => ({
      thisHistory: [...prevState.thisHistory, newHistoryEntry]
    }));
  }
  handleAuthorization() {
    let isAuthenticated = false;

    while (!isAuthenticated) {
      const login = prompt('Enter your login:');
      const password = prompt('Enter your password:');
      const user = this.state.workers.find(worker => worker.login === login && worker.password === password);
      if (user) {
        this.setState({ message: `Welcome ${user.access}!`, isAuthorized: true });
        isAuthenticated = true;
        this.setState({ thisEmployee: user});
      } else {
        this.setState({ message: 'Invalid login or password!' });
      }
    }
  }
  render() {
    if(this.state.thisEmployee.access === 'administrator'){
      return (
        <div className="App">
          <RegistrationBlock registrationUsers={this.state.applicationsregistration} onRemoveInListUser={this.removeInListUser}/>
        </div>
      );
    }else if(this.state.thisEmployee.access === 'seniorModerator'){
      return (
        <div className="App">
          <h1>Welcome, {this.state.thisEmployee.name}!</h1>
          <p>You are a {this.state.thisEmployee.access}.</p>
        </div>
      );
    }
    else if(this.state.thisEmployee.access === 'moderator'){
      return (
        <div className="App">
          <h1>Welcome, {this.state.thisEmployee.name}!</h1>
          <p>You are a {this.state.thisEmployee.access}.</p>
        </div>
      );
    }
  }
}

export default Admin;
