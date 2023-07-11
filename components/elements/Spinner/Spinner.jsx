import React from 'react';
import './spinner.css';

export default function Spinner() {
  return (<div className = "spinner-container">
    <div className="spinner spinner--steps icon-spinner" aria-hidden="true"></div>
    </div>
  );
}
