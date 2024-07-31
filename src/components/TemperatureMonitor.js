import React from 'react';
import '../css/TemperatureMonitor.css';

function TemperatureMonitor() {
  const renderTrainInfo = (direction, trainNumber, data) => (
    <div className="train-info">
      <h2>{direction} 車號 {trainNumber}</h2>
      <div className="train-details">
        <p>輕軌速率/時間</p>
        <p>60 km/hr</p>
        <p>2022/05/17 10:55:00</p>
      </div>
      <div className="temperature-grid">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="temperature-row">
            {row.map((temp, colIndex) => (
              <div key={colIndex} className={`temperature-cell ${temp > 80 ? 'alert' : ''} ${temp > 70 ? 'warning' : ''}`}>
                {temp}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="axle-temperatures">
        <span>42.1°</span>
        <span>40.6°</span>
        <span>42.1°</span>
        <span>40.6°</span>
        <span>42.1°</span>
        <span>40.6°</span>
      </div>
    </div>
  );

  const renderAlertInfo = () => (
    <div className="alert-info">
      <h3>溫度告警資訊</h3>
      <div className="alert-details">
        <p>設備異常告警</p>
        <p>2022/05/17 10:55:00</p>
      </div>
      <div className="alert-grid">
        {/* 這裡添加告警信息的網格 */}
      </div>
    </div>
  );

  return (
    <div className="temperature-monitor">
      {renderTrainInfo("上行軌", "201", [
        [38, 39, 38, 39, 38, 39, 38, 39, 38, 39],
        [38, 38, 81, 38, 38, 38, 38, 38, 38, 38],
        [38, 38, 38, 38, 38, 38, 38, 72, 38, 38],
        [38, 39, 38, 39, 38, 39, 38, 39, 38, 39]
      ])}
      {renderTrainInfo("下行軌", "101", [
        [38, 39, 38, 39, 38, 39, 38, 39, 38, 39],
        [38, 38, 38, 38, 38, 38, 38, 38, 38, 38],
        [38, 38, 38, 38, 38, 38, 38, 38, 38, 38],
        [38, 39, 38, 39, 38, 39, 38, 39, 38, 39]
      ])}
      {renderAlertInfo()}
      <div className="side-panel">
        <div className="legend">
          <h3>圖示說明</h3>
          <div className="legend-item">
            <span className="legend-color"></span>
            <span>車輛</span>
            <span>車片</span>
          </div>
        </div>
        <div className="data-collection-time">
          <h3>接收時間</h3>
          <p>上行軌：</p>
          <p>2022/05/17 10:53:11</p>
          <p>下行軌：</p>
          <p>2022/05/17 10:50:11</p>
        </div>
        <div className="alert-conditions">
          <h3>警示條件</h3>
          <p className="yellow-alert">黃色預警：</p>
          <p>車軸溫度 &gt;60°C</p>
          <p>碟片溫度 &gt;80°C</p>
          <p>對向車軸溫差 &gt;20°C</p>
          <p>對向碟片溫差 &gt;20°C</p>
          <p className="red-alert">紅色警報：</p>
          <p>車軸溫度 &gt;80°C</p>
          <p>碟片溫度 &gt;110°C</p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureMonitor;