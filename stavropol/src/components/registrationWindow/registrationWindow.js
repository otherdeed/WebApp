import './registrationWindow.css'
function RegistrationWindow(){
    const postData = async (url, data) => {
        const response = await fetch(url, {
          // Метод, если не указывать, будет использоваться GET
          method: 'POST',
         // Заголовок запроса
          headers: {
            'Content-Type': 'application/json'
          },
          // Данные
          body: JSON.stringify(data)
        });
        return response.json(); 
      }
   async function AppcetReg(){
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const number = document.getElementById('number')
    const dataReg = {
        name: name.value,
        email: email.value,
        number: number.value
    }
    console.log(`Данные успешно софрмированны: ${dataReg}`);
    fetch('./php/reg.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({dataUser: dataReg}) // Ваши данные для отправки
      })
      .then(res => res.json())
      .then(data => console.log('Успешно:', data))
      .catch(error => console.error('Ошибка:', error));
   }
    return(
        <div className="regWindow">
            <div className="blockReg">
                <div className="text">
                    Пройдите регистрацию
                </div>
                <div className="inputBlock">
                    <input type="text" id="name"  className="inputReg" placeholder="Введите имя"/>
                    <input type="email" id="email"  className="inputReg" placeholder="Введите почту"/>
                    <input type="number" id="number"  className="inputReg" placeholder="Введите номер"/>
                    <button className="btnReg" onClick={AppcetReg}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationWindow;