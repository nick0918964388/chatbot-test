import React, { useState } from 'react';
import '../css/Portal.css';
import TemperatureMonitor from './TemperatureMonitor';
import GMPDataRedefination from './GMPDataRedefination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faIndustry, 
  faThermometer, 
  faFlask, 
  faTrain,
  faBars,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import RailwayDashboard from './RailwayDashboard';
import RailwayStatement from './RailwayStatement';
import WindTurbineDashboard from './WindTurbineDashboard';
import AlertSettings from './AlertSettings';

function Portal() {
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menu = [
    { name: 'Home', icon: faHome },
    { 
      name: 'TYM', 
      icon: faIndustry,
      children: [
        { name: '溫度監控', icon: faThermometer, component: TemperatureMonitor }
      ]
    },
    { 
      name: 'TSMC', 
      icon: faIndustry,
      children: [
        { name: 'GMP Data Refinery', icon: faFlask, component: GMPDataRedefination }
      ]
    },
    { name: 'TRA', icon: faTrain , 
      children: [
      { name: '可用率 Dashboard', icon: faFlask,  component: RailwayDashboard      },
      { name: '車輛運用 Dashboard', icon: faFlask,  component: RailwayStatement      }
    ] },
    { name: 'HL', icon: faTrain , 
      children: [
      { name: '風力發電 Dashboard', icon: faFlask,  component: WindTurbineDashboard      }
    ] },
    { name: 'TRC', icon: faTrain , 
      children: [
      { name: 'Alert Settings', icon: faFlask,  component: AlertSettings      }
    ] }
  ];

  const toggleExpand = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleItemClick = (item) => {
    if (item.name === 'Home') {
      setSelectedFunction(null);
    } else if (item.children && item.children.length > 0) {
      toggleExpand(item.name);
      setSelectedFunction(item.children[0]);
    } else if (item.component) {
      setSelectedFunction(item);
    }
  };

  const renderMenuItem = (item, depth = 0) => (
    <li key={item.name} className={depth === 0 ? 'menu-section' : ''}>
      <div 
        className={`menu-item ${item.name === 'Home' ? 'home' : ''} ${expandedItems[item.name] ? 'expanded' : ''}`} 
        onClick={() => handleItemClick(item)}
      >
        {item.icon && <FontAwesomeIcon icon={item.icon} className="menu-icon" />}
        {!isSidebarCollapsed && <span>{item.name}</span>}
        {!isSidebarCollapsed && item.children && <span className="expand-icon">{expandedItems[item.name] ? '▼' : '▶'}</span>}
      </div>
      {!isSidebarCollapsed && item.children && expandedItems[item.name] && (
        <ul className="submenu">
          {item.children.map(child => renderMenuItem(child, depth + 1))}
        </ul>
      )}
    </li>
  );

  const renderContent = () => {
    if (selectedFunction && selectedFunction.component) {
      const Component = selectedFunction.component;
      return <Component />;
    }
    return <div className="welcome-message">Nick Yin 的測試平台</div>;
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="portal">
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarCollapsed ? faBars : faChevronLeft} />
        </div>
        <ul className="menu">
          {menu.map(item => renderMenuItem(item))}
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Portal;