import Button from '@mui/material/Button';
import React from 'react';

interface IconButtonsProps {
  style?: React.CSSProperties;
  iconSrc: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonsProps> = ({ style, iconSrc, onClick }) => {
  return (
    <Button style={style} onClick={onClick}>
      <img
        src={iconSrc}
        style={{ width: 24, height: 24, marginRight: 8 }}
      />
    </Button>
  );
};

export default IconButton;