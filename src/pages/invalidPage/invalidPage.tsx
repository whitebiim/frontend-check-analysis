import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import './invalidPage.css';

export const InvalidPage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Неалидные чеки" />
        <div className="content-area">
          {/* основной контент страницы */}
          <h2>Список невалидных чеков и пупупу...</h2>
        </div>
      </div>
    </div>
  );
};