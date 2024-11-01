import React, { useState } from 'react';
import './treeWindow.css';

function TreeWindow() {
    const [imageSrcs, setImageSrcs] = useState([]);
    const [countImage, setCountImage] = useState(1);    
    function Close(tagName) {
        const elem = document.querySelector('.' + tagName);
        elem.classList.add('hidden');
    }

    function ExamplePhoto() {
        return (
            <div className='examplePhoto'>
                Здесь будет пример как сфоткать дерево
            </div>
        );
    }
    function senData(){

    }
    function handleFileChange(event) {
        if(countImage <=4){
            setCountImage(countImage + 1)
            const files = event.target.files;
            
            const newImageSrcs = []; 
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImageSrcs.push(reader.result); 
                    if (newImageSrcs.length === files.length) {
                        setImageSrcs(prevImageSrcs => [...prevImageSrcs, ...newImageSrcs]);
                    }
                };
                reader.readAsDataURL(file);
            }
        }else if(countImage > 4){
            const blockError = document.querySelector('.error')
            blockError.classList.remove('hidden')
            blockError.classList.add('visible')
            setTimeout(()=> {
                blockError.classList.remove('visible')
                blockError.classList.add('hidden')
            }, 4000)
        }
    }

    return (
        <div className='treeWindow dark-theme-treeWindow hidden'>
            <div className='close' onClick={() => Close('treeWindow')}>✖</div>
            <div className='title'>Добавить дерево</div>
            <div className='container-tree'>
                <ExamplePhoto />
                <ExamplePhoto />
                <ExamplePhoto />
                <ExamplePhoto />
            </div>
            <div className="description">
                Здесь находится подробное описание что нужно сделать для отправки заявки
            </div>
            <div className='blockInput'>
            <label for="fileInput" class="custom-file-input">
                <span class="custom-file-label">Добавить фотографию</span>
                <input type="file" id="fileInput" class="file-input"  onChange={handleFileChange} multiple/>
            </label>
            </div>
            <div className='uploadedImages'>
                    {imageSrcs.map((src, index) => (
                        <div key={index} className='uploadedImage'>
                            <img src={src} alt={`Uploaded ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="error hidden">
                    Максимальное количество фотографий достигнуто
                </div>
            <div className='button-tree'>
                <button className="btn-tree dark-theme-btn-tree" onClick={senData}>Отправить фотографии</button>
            </div>
        </div>
    );
}

export default TreeWindow;
