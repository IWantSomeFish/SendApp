import React from 'react';
import Button from '@mui/material/Button';

const regularTextStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  color: 'rgb(241, 246, 248)',
  fontWeight: 650,
  textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)',
};

interface FileLog {
  id: string;
  fileName: string;
  peer: string;
  timestamp: number;
  type: 'sent' | 'received';
}

interface FileHistoryProps {
  onBack: () => void;
}

const FileHistory: React.FC<FileHistoryProps> = ({ onBack }) => {
  const [logs, setLogs] = React.useState<FileLog[]>([]);

  React.useEffect(() => {
    const storedLogs = localStorage.getItem('fileLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    } else {
      // Фейковые логи для демонстрации
      const fakeLogs: FileLog[] = [
        {
          id: '1',
          fileName: 'example.txt',
          peer: 'Peer1',
          timestamp: Date.now() - 3600000, // 1 час назад
          type: 'sent',
        },
        {
          id: '2',
          fileName: 'image.jpg',
          peer: 'Peer2',
          timestamp: Date.now() - 1800000, // 30 мин назад
          type: 'received',
        },
        {
          id: '3',
          fileName: 'document.pdf',
          peer: 'Peer3',
          timestamp: Date.now() - 600000, // 10 мин назад
          type: 'sent',
        },
      ];
      setLogs(fakeLogs);
      localStorage.setItem('fileLogs', JSON.stringify(fakeLogs));
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={regularTextStyle}>История файлов:</div>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '60vh', overflowY: 'auto' }}>
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} style={{ padding: '10px', backgroundColor: '#83c5fcff', borderRadius: '5px', minWidth: '300px' }}>
              <div style={regularTextStyle}>{log.type === 'sent' ? 'Отправлен' : 'Получен'}: {log.fileName}</div>
              <div style={{ ...regularTextStyle, fontSize: '12px' }}>Пир: {log.peer}</div>
              <div style={{ ...regularTextStyle, fontSize: '12px' }}>Время: {new Date(log.timestamp).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div style={regularTextStyle}>Нет истории</div>
        )}
      </div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onBack}
        style={{ marginTop: '20px', minWidth: '200px' }}
      >
        <div style={regularTextStyle}>Назад</div>
      </Button>
    </div>
  );
};

export default FileHistory;