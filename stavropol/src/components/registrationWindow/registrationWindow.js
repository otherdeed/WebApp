import './registrationWindow.css'

function RegistrationWindow(){
    let name 
   function AppcetReg(){
    console.log(name);
   }
    return(
        <div className="regWindow">
            <div className="blockReg">
                <div className="text">
                    Пройдите регистрацию
                </div>
                <div className="inputBlock">
                    <input type="text" id="name"  className="inputReg" placeholder="Введите имя" onChange={name}/>
                    <input type="email" id="email"  className="inputReg" placeholder="Введите почту"/>
                    <input type="number" id="number"  className="inputReg" placeholder="Введите номер"/>
                    <button className="btnReg" onClick={AppcetReg}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationWindow;