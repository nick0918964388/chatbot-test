import React, { useState } from 'react';
import { 
    LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import '../css/RailwayDashboard.css';

const RailwayDashboard = () => {
  const [selectedDate, setSelectedDate] = useState('May 1 - 31, 2023');
  const [selectedYear, setSelectedYear] = useState('2023');

  // 模擬動力車可用率數據
  const locomotiveAvailabilityData = Array.from({ length: 30 }, (_, i) => {
    const totalVehicles = 100;
    const availableVehicles = Math.floor(80 + Math.random() * 15);
    const availability = (availableVehicles / totalVehicles) * 100;
    return {
      date: `2023-05-${String(i + 1).padStart(2, '0')}`,
      totalVehicles: totalVehicles,
      availableVehicles: availableVehicles,
      availability: availability.toFixed(2)
    };
  });

  const latestData = locomotiveAvailabilityData[locomotiveAvailabilityData.length - 1];

  // 模擬數據
  const passengerData = [
    { date: '01 May', current: 150, previous: 14000 },
    { date: '07 May', current: 17000, previous: 16000 },
    { date: '14 May', current: 16000, previous: 15500 },
    { date: '21 May', current: 18000, previous: 17000 },
    { date: '28 May', current: 20000, previous: 18500 },
    { date: '04 Jun', current: 19000, previous: 18000 },
    { date: '11 Jun', current: 21000, previous: 19500 },
  ];

  const ticketTypeData = [
    { name: '一般票', value: 60 },
    { name: '優惠票', value: 30 },
    { name: '團體票', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // 模擬維修車輛數據
  const maintenanceData = {
    '2023': [
      { month: '01', actual: 150, projected: 165 },
      { month: '02', actual: 170, projected: 180 },
      { month: '03', actual: 160, projected: 170 },
      { month: '04', actual: 180, projected: 190 },
      { month: '05', actual: 200, projected: 210 },
      { month: '06', actual: 190, projected: 200 },
      { month: '07', actual: 210, projected: 220 },
      { month: '08', actual: 195, projected: 205 },
      { month: '09', actual: 180, projected: 190 },
      { month: '10', actual: 200, projected: 210 },
      { month: '11', actual: 220, projected: 230 },
      { month: '12', actual: 230, projected: 240 },
    ],
  };

  // 生成模擬數據的函數
  const generateAvailabilityData = (baseAvailability, totalVehicles) => {
    return Array.from({ length: 30 }, (_, i) => {
      const availableVehicles = Math.floor(baseAvailability + Math.random() * 5);
      const availability = (availableVehicles / totalVehicles) * 100;
      return {
        date: `2024-07-${String(i + 1).padStart(2, '0')}`,
        totalVehicles: totalVehicles,
        availableVehicles: availableVehicles,
        availability: availability.toFixed(2)
      };
    });
  };

  const passengerCarData = generateAvailabilityData(85, 100);
  const freightCarData = generateAvailabilityData(85, 100);
  const specialPurposeCarData = generateAvailabilityData(30, 50);

  // 渲染單個可用率圖表的函數
  const renderAvailabilityChart = (title, data, color) => {
    const latestData = data[data.length - 1];
    return (
      <div className="data-card">
        <div className="card-header">
          <div className="title-section">
            <h2>{title}</h2>
            <p className="subtitle">近30天可用率統計</p>
          </div>
          <div className="indicators">
            <div className="indicator">
              <span className="indicator-label">總車輛數:</span>
              <span className="indicator-value">{latestData.totalVehicles}</span>
            </div>
            <div className="indicator">
              <span className="indicator-label">可用車輛數:</span>
              <span className="indicator-value">{latestData.availableVehicles}</span>
            </div>
            <div className="indicator">
              <span className="indicator-label">本日可用率:</span>
              <span className="indicator-value">{latestData.availability}%</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(tick) => tick.slice(5)} />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="availability" 
              stroke={color} 
              fill={color} 
              fillOpacity={0.3}
              name="可用率 (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="railway-dashboard">
      <div className="data-cards">
        <div className="data-card full-width">
          <div className="card-header">
            <div className="title-section">
              <h2>動力車可用率</h2>
              <p className="subtitle">近30天可用率統計</p>
            </div>
            <div className="indicators">
              <div className="indicator">
                <span className="indicator-label">總車輛數:</span>
                <span className="indicator-value">100</span>
              </div>
              <div className="indicator">
                <span className="indicator-label">可用車輛數:</span>
                <span className="indicator-value">83</span>
              </div>
              <div className="indicator">
                <span className="indicator-label">本日可用率:</span>
                <span className="indicator-value">83.00%</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={locomotiveAvailabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(tick) => tick.slice(5)} />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="availability" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
                name="可用率 (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="data-cards three-charts">
        {renderAvailabilityChart("客車可用率", passengerCarData, "#82ca9d")}
        {renderAvailabilityChart("貨車可用率", freightCarData, "#ffc658")}
        {renderAvailabilityChart("非常運用可用率", specialPurposeCarData, "#ff8042")}
      </div>

      <div className="status-cards">
        <div className="status-card">
          <div className="card-header">
            <h3>維修車輛數</h3>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="year-selector"
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={maintenanceData[selectedYear]}
              barGap={0}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="projected" name="預計維修數" fill="#adc5ff" />
              <Bar dataKey="actual" name="實際維修數" fill="#004dff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="status-card">
          <h3>車站客流量</h3>
          <div className="big-number">
            <span>2,345,678</span>
            <span className="change positive">+5.7%</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={[
              {name: '台北', value: 1200000},
              {name: '台中', value: 800000},
              {name: '高雄', value: 600000}
            ]}>
              <Bar dataKey="value" fill="#8884d8" />
              <XAxis dataKey="name" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="status-cards">
        <div className="status-card">
          <h3>列車使用率</h3>
          <div className="big-number">
            <span>78.3%</span>
            <span className="change negative">-2.1%</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <PieChart>
              <Pie
                data={[
                  { name: '已使用', value: 78.3 },
                  { name: '未使用', value: 21.7 }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#82ca9d" />
                <Cell fill="#8884d8" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="status-card">
          <h3>維修請求數</h3>
          <div className="big-number">
            <span>127</span>
            <span className="change negative">+12</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={[
              {name: '週一', value: 30},
              {name: '週二', value: 25},
              {name: '週三', value: 20},
              {name: '週四', value: 15},
              {name: '週五', value: 37}
            ]}>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              <XAxis dataKey="name" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="data-cards">
        <div className="data-card full-width">
          <div className="card-header">
            <h2>總乘客數</h2>
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-selector"
            >
              <option value="May 1 - 31, 2023">May 1 - 31, 2023</option>
              <option value="June 1 - 30, 2023">June 1 - 30, 2023</option>
              <option value="July 1 - 31, 2023">July 1 - 31, 2023</option>
            </select>
          </div>
          <div className="big-number">
            <span>126,247</span>
            <span className="change positive">+3.2%</span>
          </div>
          <p>過去 7 天</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={passengerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="近7天"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#82ca9d" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="前14天"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="data-cards">
        <div className="data-card full-width">
          <h2>票種分佈</h2>
          <p>過去 7 天</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={ticketTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ticketTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {ticketTypeData.map((entry, index) => (
              <div key={`legend-${index}`}>
                <span style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}: {entry.value}%
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RailwayDashboard;