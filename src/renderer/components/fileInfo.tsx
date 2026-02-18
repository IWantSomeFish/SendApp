import Button from '@mui/material/Button';
import React, { useRef } from 'react';

const regularTextStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  color: 'rgb(241, 246, 248)',
  fontWeight: 650,
  textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)',
};

const FileInfo: any = () => {
  const FileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>('Нет выбранного файла');
  const [isHidden, setIsHidden] = React.useState<boolean>(false);
  const [peers, setPeers] = React.useState<any>([]);
  const hadleButtonClick = () => {
    if (FileInputRef.current) {
      FileInputRef.current.click();
    }};

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setFileName(`Выбранный файл: ${file.name}`);
      setIsHidden(true);
    }
};
  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div style={{height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={regularTextStyle}>{peers.length > 0 ? `Найдено ${peers.length} пиров` : 'Пиры не найдены'}</div>
      </div>
      <div hidden={isHidden}>
        <div style={{height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'} }>
          <input type="file" ref={FileInputRef} style={{display: 'none'}} onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={hadleButtonClick}>
            <div style={regularTextStyle}>Выбрать файл</div>
          </Button>
        </div>
        <div style={{paddingTop:20, alignItems: 'center', display: 'flex', justifyContent: 'center'}}><div style={regularTextStyle}>{fileName}</div></div>
      </div>
    </div>
  );
};

export default FileInfo;