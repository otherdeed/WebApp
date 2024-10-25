import './topPanel.css'
import NoficationWindow from '../noficationWindow/noficationWindow';

function TopPanel(){
    return(
        <div>
            <NoficationWindow />
            <div className="topPanel">
            <div className="containerTop">
                <div className="setting">
                    <button className="btnTop">x</button>
                </div>
                <div className="nofication">
                    <button className="btnTop">n</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TopPanel;