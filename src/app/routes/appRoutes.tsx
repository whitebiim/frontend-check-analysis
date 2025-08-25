import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/homePage/homePage';
import { ValidPage } from '../../pages/validPage/validPage';
import { InvalidPage } from '../../pages/invalidPage/invalidPage';
import { ProductPage } from '../../pages/productPage/productPage';
import { SetPage } from '../../pages/setPage/setPage';
import { ScrollToTop } from '../../components/scrollToTop/scrollToTop'; 


export const AppRoutes = () => {
  return (
    <>
     <ScrollToTop />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/valid" element={<ValidPage />} />
          <Route path="/invalid" element={<InvalidPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/set" element={<SetPage />} />
        </Routes>
      </div>
    </>
  );
};