import React from 'react';
import { useNavigate } from 'react-router-dom';

function ScanButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/qr-reader');
  };

  return (
    <button onClick={handleClick}>Scan QR code</button>
  );
}

export default ScanButton;
