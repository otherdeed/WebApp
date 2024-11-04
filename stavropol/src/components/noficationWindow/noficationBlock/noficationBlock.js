import './noficationBlock.css'

function NoficationBlock({message, onClose}){
    return(
        <div>
            <div className='noficationBlock'>
                <div className='closeBtn' onClick={() => onClose()}>x</div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default NoficationBlock;