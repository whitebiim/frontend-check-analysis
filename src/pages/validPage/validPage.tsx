import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import './validPage.css';

export const ValidPage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Валидные чеки" />
        <div className="content-area">
          {/*основной контент страницы */}
          <h2>Список валидных чеков и пупупу!</h2>
        </div>
      </div>
    </div>
  );
};