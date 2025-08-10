import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './sidebar.css';

import HomeActive from '../../../assets/icons/home/active.svg';
import HomeInactive from '../../../assets/icons/home/inactive.svg';
import ValidActive from '../../../assets/icons/valid/active.svg';
import ValidInactive from '../../../assets/icons/valid/inactive.svg';
import InvalidActive from '../../../assets/icons/invalid/active.svg';
import InvalidInactive from '../../../assets/icons/invalid/inactive.svg';
import ProductActive from '../../../assets/icons/product/active.svg';
import ProductInactive from '../../../assets/icons/product/inactive.svg';
import SettingsActive from '../../../assets/icons/settings/active.svg';
import SettingsInactive from '../../../assets/icons/settings/inactive.svg';

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {({ isActive }) => (
              <>
                <span className="icon">
                  <img 
                    src={isActive ? HomeActive : HomeInactive} 
                    alt="Главная" 
                  />
                </span>
                {/* <span className="tooltip">Главная</span> */}
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/valid"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {({ isActive }) => (
              <>
                <span className="icon">
                  <img 
                    src={isActive ? ValidActive : ValidInactive} 
                    alt="Валидные чеки" 
                  />
                </span>
                {/* <span className="tooltip">Валидные чеки</span> */}
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/invalid"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {({ isActive }) => (
              <>
                <span className="icon">
                  <img 
                    src={isActive ? InvalidActive : InvalidInactive} 
                    alt="Невалидные чеки" 
                  />
                </span>
               {/* <span className="tooltip">Невалидные чеки</span> */}
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/product"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {({ isActive }) => (
              <>
                <span className="icon">
                  <img 
                    src={isActive ? ProductActive : ProductInactive} 
                    alt="Товары" 
                  />
                </span>
                {/* <span className="tooltip">Товары</span> */}
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/set"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {({ isActive }) => (
              <>
                <span className="icon">
                  <img 
                    src={isActive ? SettingsActive : SettingsInactive} 
                    alt="Настройки" 
                  />
                </span>
                {/* <span className="tooltip">Настройки</span> */}
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};