import React from 'react';
import './header.css';

export const Header = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <header className="header">
      <h1 className="header-title">{pageTitle}</h1>
      <div className="company-name">Название компании</div>
    </header>
  );
};