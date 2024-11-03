import React from 'react';
import './App.css';
import RegistrationBlock from './registration/registration';

class App extends React.Component {
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
      isAuthorized: false, // Состояние авторизации
      applicationsregistration:[
        {name:'Ivan', nickName:'ochoxvat', number:89888221109, email:'ochoxvat@gmail.com', tgId:1111},
        {name:'Artur', nickName:'bigsanke', number:89213321903, email:'bigsanke@gmail.com', tgId:2222},
        {name:'Dima', nickName:'xer', number:89092013245, email:'xer@gmail.com', tgId:3333},
        {name:'Timur', nickName:'krasavchick', number:89891235607, email:'krasavchick@gmail.com', tgId:4444},
        {name:'Elena', nickName:'sosalka', number:89128943678, email:'sosalka@gmail.com', tgId:5555},
        {name:'Anna', nickName:'urury', number:898881234567, email:'urury@gmail.com', tgId:6666},
        {name:'Ekaterina', nickName:'koxaxi', number:89218740111, email:'koxaxi@gmail.com', tgId:7777},
        {name:'Irina', nickName:'lipula', number:89345679012, email:'lipula@gmail.com', tgId:8888},
        {name:'Danil', nickName:'zizima', number:89011238956, email:'zizima@gmail.com', tgId:9999},
        {name:'Mark', nickName:'webur', number:89887645690, email:'webur@gmail.com', tgId:1010},
      ],
      myIp:'',
      callBackMess:''
    };
    this.removeInListUser = this.removeInListUser.bind(this);
    this.handleAuthorization = this.handleAuthorization.bind(this);
    this.addHistory = this.addHistory.bind(this);
  }
  componentDidMount() {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        this.setState({ myIp: data.ip }); // Сохраняем IP-адрес в состоянии
      })
      .catch(error => console.error('Error fetching IP:', error));
    this.handleAuthorization();
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

export default App;
