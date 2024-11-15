import './registrationWindow.css';
import React from 'react';
import { updateFormData, regUser } from '../../store/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';
function RegistrationWindow (){
    const dispatch = useDispatch();
    const formData = useSelector(state => state.registration.registrationData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ name, value }))
    };
    const registerUser  = async () => {
        dispatch(regUser());
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
                            <div className="resMessage">{formData.statusMessage}</div>
                            <button className="btnReg dark-theme-regWindow-btnReg" type='submit'>Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
                <div className="textReg dark-theme-regWindow hidden ">
                <div className="close-reg-window">
                    <div onClick={() =>Close('regWindow')} >✖</div>
                </div>
                    <p>{formData.statusMessage}</p>
                </div>
            </div>
        );
}

export default RegistrationWindow;
