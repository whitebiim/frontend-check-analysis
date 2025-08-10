import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import './productPage.css';

export const ProductPage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Товары" />
        <div className="content-area">
          {/* основной контент страницы */}
          <h2>Товарчики товарчики...</h2>
        </div>
      </div>
    </div>
  );
};