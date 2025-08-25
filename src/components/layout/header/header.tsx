import React from 'react';
import './header.css';
import Icon from '../../../assets/icons/name/bg.svg';

export const Header = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{pageTitle}</h1>
      </div>
      <div className="company-container">
        <img src={Icon} alt="Иконка" className="header-icon" />
        <div className="company-name">ККМ Аналитика </div>
      </div>
    </header>
  );
};