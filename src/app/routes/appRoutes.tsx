import React, { ReactNode } from 'react';

const HomePage = React.lazy(() => import('pages/homePage'));

export type RoutsType = {
  component: ReactNode;
  name: string;
  path: string;
};

const routes: RoutsType[] = [
  { name: 'Начальная страница', path: '/home', component: (<HomePage />) },
];

export default routes;
