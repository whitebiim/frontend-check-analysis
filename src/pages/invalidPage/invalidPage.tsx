
import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import './invalidPage.css';

export const InvalidPage = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Невалидные чеки" />
        <div className="invalid-content-area">
          {/* 1 строка */}
          <div className="invalid-row">
            <div className="invalid-stats-block">
              <h3>Ежедневная статистика</h3>
              <div className="invalid-stats-content">
                {/* статистика по невалидным чекам */}
                <div className="invalid-placeholder">Статистика невалидных чеков</div>
              </div>
            </div>
            <div className="invalid-chart-block">
              <h3>График невалидных чеков</h3>
              <div className="invalid-chart-container">
                {/* график */}
                <div className="invalid-placeholder">График невалидных чеков</div>
              </div>
            </div>
          </div>

          {/* 2 строка */}
          <div className="invalid-row">
            <div className="invalid-list-block">
              <h3>Список невалидных чеков</h3>
              <div className="invalid-list-container">
                {/* таблица чеков */}
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Id клиента</th>
                      <th>Статус</th>
                      <th>Дата</th>
                      <th>Сумма, ₽</th>
                      <th>О чеке</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center' }}>
                        <div className="invalid-placeholder">Таблица невалидных чеков</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
               
              </div>
            </div>
            <div className="invalid-details-block">
      
              <h3>Подробнее о чеке</h3>
              <div className="invalid-details-container">
                {/* Здесь будет детальная информация */}
                <div className="invalid-details-card">
                  <div className="invalid-detail-label">Id клиента:</div>
                  <div className="invalid-detail-value">-</div>
                  
                  <div className="invalid-detail-label">Дата покупки:</div>
                  <div className="invalid-detail-value">-</div>
                  
                  <div className="invalid-detail-label">Тип оплаты:</div>
                  <div className="invalid-detail-value">-</div>
                  
                  <div className="invalid-detail-label">Сумма:</div>
                  <div className="invalid-detail-value">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};