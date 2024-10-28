import './treeWindow.css'

function TreeWindow(){
    function Close(tagName){
        const elem = document.querySelector('.'+tagName)
        elem.classList.add('hidden')
    }
    function ExamplePhoto(){
        return(
           <div className='examplePhoto'>
             Здесь будет пример как сфоткать дерево
           </div>
        )
    }
    return(
        <div className='treeWindow dark-theme-treeWindow hidden'>
            <div className='close' onClick={() => Close('treeWindow')}>x</div>
            <div className='title'>Добавить дерево</div>
            <div className='container-tree'>
                <ExamplePhoto/>
                <ExamplePhoto/>
                <ExamplePhoto/>
                <ExamplePhoto/>
            </div>
        </div>
    )
}
export default TreeWindow