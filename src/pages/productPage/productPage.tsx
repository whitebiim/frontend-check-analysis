import React from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { DailyStatsProduct } from '../../components/stats/DailyStatsProduct';
import { ProductType } from '../../components/productTop/ProductType';
import { ProductName } from '../../components/productTop/ProductName';
import { ProductCategoriesChart } from '../../components/productTop/topProductTypeDiag';
import { ProductCountChart } from '../../components/productTop/productInReceipt';

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
              <div className="stats-grid-wrapper">
                 <DailyStatsProduct />
                 </div>
                {/* <div className="product-placeholder">График статистики товаров</div> */}
              </div>
            </div>
            <div className="product-types-block">
              <h3>Популярные категории</h3>
              <div className="product-types-content">
                {/* <div className="product-placeholder">Список категорий</div> */}
                <ProductType />
              </div>
            </div>
            <div className="product-popular-block">
              <h3>Топ товаров</h3>
              <div className="product-popular-content">
                <ProductName />
              </div>
            </div>
          </div>

          {/* 2 строка */}
          <div className="product-row">
            <div className="product-list-block">
            <h3> Товаров в чеке по дням </h3>
          
              <ProductCountChart />

            </div>


            
            <div className="product-details-block">
          
              <h3>Популярные категории</h3>
            <div className="product-types-content">
              <ProductCategoriesChart />
            </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};