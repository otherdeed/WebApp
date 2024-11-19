import './registrationWindow.css';
import React from 'react';
import { updateFormData, setStatusMessage} from '../../store/client/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';
function RegistrationWindow (){
    const dispatch = useDispatch();
    const formData = useSelector(state => state.registration.registrationData);
    const statusMess = useSelector(state => state.registration.statusMessage);
    const tdData = useSelector(state => state.telegramDataSlice.tgDataUser)
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ name, value }));
    };

    const registerUser  = async () => {
        try {
            const response = await fetch("http://localhost:8888/stavropol/php/registration.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            dispatch(setStatusMessage(data.message));
        } catch (error) {
            dispatch(setStatusMessage(`Ошибка регистрации: ${error.message}`));
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
                            <input type='text' name='tgId' className="inputReg" placeholder="telegramID" value={tdData.userID} onChange={handleChange} required/>
                            <div className="resMessage">{statusMess}</div>
                            {tdData.platform}
                            <button className="btnReg dark-theme-regWindow-btnReg" type='submit'>Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
                <div className="textReg dark-theme-regWindow hidden ">
                <div className="close-reg-window">
                    <div onClick={() =>Close('regWindow')} >✖</div>
                </div>
                    <p>{statusMess}</p>
                </div>
            </div>
        );
}

export default RegistrationWindow;
