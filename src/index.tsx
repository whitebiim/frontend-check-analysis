import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from 'app/routes/appRoutes';

import './index.css';

const container = document.querySelector('#root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter basename="content">
        <Suspense>
          <Routes>
            {routes.map((route) => (
              <Route
                element={route.component}
                key={route.path}
                path={route.path}
              />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
