import './registrationWindow.css';

function RegistrationWindow() {
    async function AppcetReg() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const number = document.getElementById('number');
        const blockReg = document.querySelector('.blockReg');
        const textReg = document.querySelector('.textReg');
        if(/\d/.test(name.value) || String(number.value).length == 0){
            name.className = 'inputError'
            } else if(!/\d/.test(name.value)){
            name.className="inputReg"
            }
            if(!email.value.includes('@')){
            email.className = 'inputError'
            }else if(email.value.includes('@')){
            email.className = 'inputReg'
            }
            if(String(number.value).length!= 11){
            number.className = 'inputError'
            } else if(String(number.value).length == 11){
            number.className = 'inputReg'
            }
        if (!/\d/.test(name.value) && email.value.includes('@') && String(number.value).length === 11 && String(name.value).length > 1) {
            const dataReg = {
                name: name.value,
                email: email.value,
                number: number.value
            };
                        if (blockReg) {
                            blockReg.classList.add('hidden');
                        }
                        if (textReg) {
                            textReg.classList.remove('hidden'); 
                            textReg.classList.add('visible');
                        }
            try {
                const response = await fetch('http://localhost/reg.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({data: dataReg})
                });
                const data = await response.json();
    
                console.log('Успешно:', data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
    }
    function Close(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.add('hidden')
    }
    return (
        <div className="regWindow">
            <div className="blockReg">
            <button className="close">
                <div onClick={() =>Close('regWindow')}>x</div>
            </button>
                <div className="text">
                    Пройдите регистрацию
                </div>
                <div className="inputBlock">
                    <input type="text" id="name" className="inputReg" placeholder="Введите имя" />
                    <input type="email" id="email" className="inputReg" placeholder="Введите почту" />
                    <input type="number" id="number" className="inputReg" placeholder="Введите номер" />
                    <button className="btnReg" onClick={AppcetReg}>Зарегистрироваться</button>
                </div>
            </div>
            <div className="textReg hidden ">
            <button className="close">
                <div onClick={() =>Close('regWindow')} >x</div>
            </button>
                <p>Ваши данные успешно отправлены, в скором времени мы рассмотрим вашу заявку</p>
            </div>
        </div>
    );
}

export default RegistrationWindow;
