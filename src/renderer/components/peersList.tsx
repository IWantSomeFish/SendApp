import React from 'react';
import Button from '@mui/material/Button';
import { Peer } from '../../types';

const regularTextStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  color: 'rgb(241, 246, 248)',
  fontWeight: 650,
  textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)',
};

interface PeersListProps {
  peers: Peer[];
  onSend: (peer: Peer) => void;
  onCancel: () => void;
}

const PeersList: React.FC<PeersListProps> = ({ peers, onSend, onCancel }) => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={regularTextStyle}>Выберите пир для отправки:</div>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {peers.map((peer) => (
          <Button
            key={peer.id}
            variant="contained"
            color="primary"
            onClick={() => onSend(peer)}
            style={{ minWidth: '200px' }}
          >
            <div style={regularTextStyle}>{peer.hostname} ({peer.ip}:{peer.port})</div>
          </Button>
        ))}
      </div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onCancel}
        style={{ marginTop: '20px', minWidth: '200px' }}
      >
        <div style={regularTextStyle}>Отмена</div>
      </Button>
    </div>
  );
};

export default PeersList;
