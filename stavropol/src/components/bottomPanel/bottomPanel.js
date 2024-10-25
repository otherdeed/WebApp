import './bottomPanel.css';
import RegistrationWindow from '../registrationWindow/registrationWindow';
function BottomPanel(props){
    function openWindowReg(){
        const blockReg = document.querySelector('.blockReg');
        const textReg = document.querySelector('.textReg');
        const regWindow = document.querySelector('.regWindow');
       if(!props.statusCheck.isOpenRegWindow){
        blockReg.classList.remove('hidden');
       }
       if(props.statusCheck.isOpenRegWindow){
        textReg.classList.remove('hidden');
        regWindow.classList.remove('hidden');
       }
    }
    return(
        <div>
            <RegistrationWindow onSuccess={props.onSuccess}/>
        <div className="bottomPanel">
            <div className="containerBottom">
                <div className="menu">
                    <button className="btnBottom" onClick={openWindowReg}>reg</button>
                </div>
                <div className="menu">
                    <button className="btnBottom">x</button>
                </div>
                <div className="menu">
                    <button className="btnBottom">x</button>
                </div>
                <div className="menu">
                    <button className="btnBottom">x</button>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default BottomPanel;