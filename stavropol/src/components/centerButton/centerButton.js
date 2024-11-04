import './centerButton.css'
import TreeWindow from './treeWindow/treeWindow'
// import tree  from'./nui8_dx9o_210607.jpg'
function CenterButton(){
    function OpenWindow(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.remove('hidden')
    }
    return(
        <div>
            <TreeWindow/>
        <div className='centerButton dark-theme-central-btn'>
            <div className='tree' onClick={() => OpenWindow('treeWindow')}>
                +
            </div>
        </div>
        </div>
    )
}
export default CenterButton