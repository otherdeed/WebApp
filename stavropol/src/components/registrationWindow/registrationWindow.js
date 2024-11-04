import './registrationWindow.css';
import React,{useState} from 'react';

function RegistrationWindow (props){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        tgId: "",
    });
    const [statusMessage, setStatusMessage] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const registerUser  = async () => {
        try {
            const response = await fetch("http://localhost:8888/WebApp/stavropol/php/registration.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            setStatusMessage(data.message);
    
            const blockReg = document.querySelector('.blockReg');
            const textReg = document.querySelector('.textReg');
            const resMess = 'Почта, телефон или имя пользователя уже существуют';
    
            if (data.message !== resMess) {
                blockReg.classList.add('hidden');
                textReg.classList.remove('hidden'); 
                textReg.classList.add('visible');
            }
            props.onSuccess();
            localStorage.setItem('isOpenRegWindow', true);
        } catch (error) {
            setStatusMessage(`Ошибка регистрации: ${error.message}`);
        }
    };
    function Close(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.add('hidden')
    }
        return (
            <div className="regWindow hidden">
                <div className="blockReg dark-theme-regWindow hidden">
                <div className="close-reg-window">
                    <div onClick={() =>Close('regWindow')}>✖</div>
                </div>
                    <div className="text">
                        Пройдите регистрацию
                    </div>
                    <div>
                        <form className="inputBlock" onSubmit={(e) => {
                            e.preventDefault();
                            registerUser();
                        }}>
                            <input type="text" name="name" id="name" className="inputReg" placeholder="Введите имя" value={formData.name} onChange={handleChange} required/>
                            <input type="email" name="email" id="email" className="inputReg" placeholder="Введите почту" value={formData.email} onChange={handleChange} required/>
                            <input type="tel" name="phone" id="number" className="inputReg" placeholder="Введите номер" value={formData.phone} onChange={handleChange} required/>
                            <input type='text' name='username' className="inputReg" placeholder="Придумайте уникальное имя" value={formData.username} onChange={handleChange} required/>
                            <input type='text' name='tgId' className="inputReg" placeholder="telegramID" value={formData.tgId} onChange={handleChange} required/>
                            <div className="resMessage">{statusMessage}</div>
                            <button className="btnReg dark-theme-regWindow-btnReg" type='submit'>Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
                <div className="textReg dark-theme-regWindow hidden ">
                <div className="close-reg-window">
                    <div onClick={() =>Close('regWindow')} >✖</div>
                </div>
                    <p>{statusMessage}</p>
                </div>
            </div>
        );
}

export default RegistrationWindow;
