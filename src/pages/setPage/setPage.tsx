import React, { useState, useEffect } from 'react';
import { Header } from '../../components/layout/header/header';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import './setPage.css';
import DarkThemeImage from '../../assets/dark-theme.png';

export const SetPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false); 

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  
  useEffect(() => {
    if (isDarkMode) {
        setTimeout(() => {
        setIsVisible(true);
      }, 50); 
    } else { 
      setIsVisible(false);
    }
  }, [isDarkMode]);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle="Настройки" />
        <div className="content-area">
          <div className="setting-item">
            <label className="setting-label">
              Темная тема:
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={handleThemeToggle}
                />
                <span className="slider round"></span>
              </label>
            </label>
          </div>

          {isDarkMode && (
            <div className={`dark-theme-image-container ${isVisible ? 'visible' : ''}`}>
              <img src={DarkThemeImage} alt="Dark Theme Preview" className="dark-theme-image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};