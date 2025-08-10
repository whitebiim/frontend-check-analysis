import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import './setPage.css';

export const SetPage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Настройки" />
        <div className="content-area">
          {/* основной контент страницы */}
          <h2>Настроечки...</h2>
        </div>
      </div>
    </div>
  );
};