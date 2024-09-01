import React from 'react';
import "./styles.css";
function Button({text, onClick, disabled}) {
  return (
    <div className='custom-btn' disabled={disabled} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
