import React, { MouseEventHandler } from 'react';
import styles from './Keycap.module.css';

interface KeycapProps {
  keyLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  keycapSize: number;
  borderRadius: string;
}

const Keycap: React.FC<KeycapProps> = ({ keyLabel, onClick, keycapSize, borderRadius }) => {
  const keycapStyle = {
    width: `${keycapSize}px`,
    borderRadius: `${borderRadius}`,
  };

  return (
    <button className={styles.keycap} onClick={onClick} style={keycapStyle}>
      {keyLabel}
    </button>
  );
};

export default Keycap;
