import React from 'react';
import './ResetButton.css';

const ResetButton = ({resetBoard}) => {
  return (
    <button className='reset-btn' onClick={resetBoard}>ResetButton</button>
  )
}

export default ResetButton