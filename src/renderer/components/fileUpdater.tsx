import Button from '@mui/material/Button';
import React, { useRef } from 'react';

const FileUpdater: React.FC = () => {
  const FileInputRef = useRef<HTMLInputElement>(null);
  
  const hadleButtonClick = () => {
    if (FileInputRef.current) {
      FileInputRef.current.click();
    }};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      console.log('Selected file:', file.name);
    }
};

    return (
        <div>
            <input type="file" ref={FileInputRef} style={{display: 'none'}} onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={hadleButtonClick}>
                Выбрать файл
            </Button>
        </div>
    );
}

export default FileUpdater;