import './settingBlock.css';
import React, { useState, useEffect } from 'react';

function SettingBlock({ message, changeStatus, id, status }) {
    const [isChecked, setIsChecked] = useState(status); // Инициализируем состоянием из пропсов

    useEffect(() => {
        setIsChecked(status);
    }, [status]);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked; 
        setIsChecked(newCheckedState); 
        changeStatus();
        localStorage.setItem(id, JSON.stringify(newCheckedState));
    };

    return (
        <div>
            <div className='setBlock'>
                {message}
                <label className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange}
                    />
                    <span className="custom-checkbox-button"></span>
                </label>
            </div>
        </div>
    );
}

export default SettingBlock;
