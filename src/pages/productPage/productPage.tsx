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
        <div className="product-content-area">
          {/* 1 строка */}
          <div className="product-row">
            <div className="product-stats-block">
              <h3>Статистика товаров</h3>
              <div className="product-stats-content">
                <div className="product-placeholder">График статистики товаров</div>
              </div>
            </div>
            <div className="product-types-block">
              <h3>Популярные категории</h3>
              <div className="product-types-content">
                <div className="product-placeholder">Список категорий</div>
              </div>
            </div>
            <div className="product-popular-block">
              <h3>Топ товаров</h3>
              <div className="product-popular-content">
                <div className="product-placeholder">Рейтинг товаров</div>
              </div>
            </div>
          </div>

          {/* 2 строка */}
          <div className="product-row">
            <div className="product-list-block">
              <h3>Список товаров</h3>
              <div className="product-list-container">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Id товара</th>
                      <th>Название</th>
                      <th>Цена, ₽</th>
                      <th>Продано, шт</th>
                      <th>Общая выручка</th>
                      <th>О товаре</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center' }}>
                        <div className="product-placeholder">Таблица товаров</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="product-details-block">
              <h3>Детали товара</h3>
              <div className="product-details-container">
                <div className="product-details-card">
                  <div className="product-detail-label">Товар:</div>
                  <div className="product-detail-value">-</div>
                  
                  <div className="product-detail-label">Кол-во, шт:</div>
                  <div className="product-detail-value">-</div>
                  
                  <div className="product-detail-label">Цена:</div>
                  <div className="product-detail-value">-</div>
                  
                  <div className="product-detail-label">Сумма:</div>
                  <div className="product-detail-value">-</div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};