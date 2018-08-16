import React from 'react';
import './Input.css';

const Input = ({type = 'text', label, name, value, onChange, required = false, pattern, max}) => {
  return (
    <label>
      {label}
      <input type={type} name={name} value={value} onChange={onChange} required={required} pattern={pattern} max={max} />
    </label>
  );
}

export default Input;