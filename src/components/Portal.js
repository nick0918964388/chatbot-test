import React, { useState } from 'react';
import '../css/Portal.css';
import TemperatureMonitor from './TemperatureMonitor';
import GMPDataRedefination from './GMPDataRedefination';

function Portal() {
  const [selectedFunction, setSelectedFunction] = useState(null);

  const renderContent = () => {
    switch (selectedFunction) {
      case 'temperatureMonitor':
        return <TemperatureMonitor />;
      case 'gmpDataRedefination':
        return <GMPDataRedefination />;
      default:
        return <div className="welcome-message">請從左側選單選擇功能</div>;
    }
  };

  return (
    <div className="portal">
      <div className="sidebar">
        <div className="home-icon" onClick={() => setSelectedFunction(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
        <h2 style={{ color: 'white' }}>前端測試功能選單</h2>
        <ul>
          <li onClick={() => setSelectedFunction('temperatureMonitor')} style={{ color: 'white' }}>溫度監控</li>
          <li onClick={() => setSelectedFunction('gmpDataRedefination')} style={{ color: 'white' }}>GMP 數據重定義</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Portal;