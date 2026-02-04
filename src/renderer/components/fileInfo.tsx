import Button from '@mui/material/Button';
import React from 'react';
import FileUpdater from './fileUpdater';

const FileInfo: any = () => {
  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div style={{height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Кнопка тута будет
      </div>
      <div style={{height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FileUpdater />
      </div>
    </div>
  );
};

export default FileInfo;