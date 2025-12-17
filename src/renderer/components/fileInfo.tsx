import Button from '@mui/material/Button';
import React from 'react';

const FileInfo: any = () => {
  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div style={{height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Кнопка тута будет
      </div>
      <div style={{height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="contained" color="primary">
          Выбрать файл
        </Button>
      </div>
    </div>
  );
};

export default FileInfo;