import React, { useEffect, useState } from 'react';
import './App.css';
import RegistrationBlock from './registration/registration';
import { getMyIp, thisEmployee} from './store/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

const Admin = () => {
  const [applicationsregistration, setApplicationsRegistration] = useState([]);
  const dispatch = useDispatch();
  const workers = useSelector(state => state.admin.workers)
  const thisEmployeer = useSelector(state => state.admin.thisEmployee)
  const loadPendingUsers = async () => {
    try {
      const response = await fetch("http://localhost:8888/stavropol/php/getPendingUsers.php");
      const data = await response.json();
      setApplicationsRegistration(data.pendingUsers || []);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  const handleAuthorization = () => {
    let isAuthenticated = false;

    while (!isAuthenticated) {
      const login = prompt('Введите ваш логин:');
      const password = prompt('Введите ваш пароль:');

      const user = workers.find(worker => worker.login === login && worker.password === password);
      if (user) {
        console.log(user);
        dispatch(thisEmployee(user)); 
        isAuthenticated = true;
      } else {
        alert('Неверный логин или пароль!');
      }
    }
  };

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        dispatch(getMyIp(data.ip))
      } catch (error) {
        console.error('Ошибка при получении IP:', error);
      }
    };

    fetchIp();
    handleAuthorization();
    loadPendingUsers();
    
    const interval = setInterval(() => {
      loadPendingUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  if (thisEmployeer.access === 'administrator') {
    return (
      <div className="App">
        <RegistrationBlock registrationUsers={applicationsregistration} />
      </div>
    );
  } else if (thisEmployeer.access === 'seniorModerator' || thisEmployeer.access === 'moderator') {
    return (
      <div className="App">
        <h1>Добро пожаловать, {thisEmployeer.name}!</h1>
        <p>Вы {thisEmployeer.access}.</p>
      </div>
    );
  }

  return null; // Возвращаем null, если нет авторизованного пользователя
};

export default Admin;
