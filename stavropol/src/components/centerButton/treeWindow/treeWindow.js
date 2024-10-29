import React, { useState } from 'react';
import './treeWindow.css';

function TreeWindow() {
    const [imageSrcs, setImageSrcs] = useState([]); // Состояние для хранения загруженных изображений

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

    function handleFileChange(event) {
        const files = event.target.files;
        const newImageSrcs = []; // Массив для хранения новых загруженных изображений

        // Прочитаем каждый файл
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                newImageSrcs.push(reader.result); // Добавляем загруженное изображение в массив
                if (newImageSrcs.length === files.length) {
                    setImageSrcs(prevImageSrcs => [...prevImageSrcs, ...newImageSrcs]); // Обновляем состояние с новыми изображениями
                }
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='treeWindow dark-theme-treeWindow hidden'>
            <div className='close' onClick={() => Close('treeWindow')}>x</div>
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
            <div className='button-tree'>
                <button className="btn-tree dark-theme-btn-tree">Отправить фотографии</button>
            </div>
            <div className='inputBlock'>
                <input type="file" id="file1" onChange={handleFileChange} multiple /> {/* Указываем атрибут multiple */}
                <div className='uploadedImages'>
                    {imageSrcs.map((src, index) => ( // Отображаем все загруженные изображения
                        <div key={index} className='uploadedImage'>
                            <img src={src} alt={`Uploaded ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TreeWindow;
