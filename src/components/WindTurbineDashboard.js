import React, { useEffect, useRef } from 'react';
import '../css/WindTurbineDashboard.css';
import Chart from 'chart.js/auto';

function WindTurbineDashboard() {
  const overviewChartRef = useRef(null);
  const pvCurveChartRef = useRef(null);
  const productionChartRef = useRef(null);
  const nacelleChartRef = useRef(null);
  const windChartRef = useRef(null);

  useEffect(() => {
    // 初始化圖表
    const overviewChart = new Chart(overviewChartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [309, 691],
          backgroundColor: ['#4CAF50', '#ddd']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    const pvCurveChart = new Chart(pvCurveChartRef.current, {
      type: 'line',
      data: {
        labels: Array.from({ length: 16 }, (_, i) => i + 1),
        datasets: [{
          data: [400, 200, 600, 300, 900, 200, 500, 400, 700, 300, 800, 400, 900, 600, 700, 500],
          borderColor: '#007bff',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1000
          }
        }
      }
    });

    const productionChart = new Chart(productionChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Today', 'Yesterday'],
        datasets: [{
          data: [1.2, 2],
          backgroundColor: ['#007bff', '#ddd']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 2.5
          }
        }
      }
    });

    const nacelleChart = new Chart(nacelleChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Yaw Error'],
        datasets: [{
          data: [61],
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 62
          }
        }
      }
    });

    const windChart = new Chart(windChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Wind Speed'],
        datasets: [{
          data: [27],
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 30
          }
        }
      }
    });

    // 清理函數
    return () => {
      overviewChart.destroy();
      pvCurveChart.destroy();
      productionChart.destroy();
      nacelleChart.destroy();
      windChart.destroy();
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="status-section">
        <div className="status-header">
          <h2>狀態</h2>
          <span className="status-active">啟動</span>
        </div>
        <div className="status-content">
          <div className="image-placeholder">
            風力發電機圖片無法顯示
          </div>
          <div className="status-info">
            <div className="status-alert">無警告</div>
            <div className="status-alert">無警報</div>
            <table>
              <tbody>
                <tr>
                  <td>渦輪機</td>
                  <td>啟動</td>
                </tr>
                <tr>
                  <td>螺距控制</td>
                  <td>順風</td>
                </tr>
                <tr>
                  <td>機艙</td>
                  <td>順風</td>
                </tr>
                <tr>
                  <td>變流器</td>
                  <td>運行中</td>
                </tr>
                <tr>
                  <td>本地時間</td>
                  <td>10:04:55 AM 31/10/2017</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="overview-section">
        <h2>概覽</h2>
        <div className="overview-content">
          <canvas ref={overviewChartRef}></canvas>
          <div className="overview-info">
            <p>平均風速 (10 分鐘): 6.9 m/s</p>
            <p>平均功率 (10 分鐘): 230.6 kW</p>
            <p>總能量: 4.0 GWh</p>
          </div>
        </div>
      </div>
      <div className="pv-curve-section">
        <h2>PV 曲線</h2>
        <div className="pv-curve-content">
          <canvas ref={pvCurveChartRef}></canvas>
        </div>
      </div>
      <div className="production-section">
        <h2>生產</h2>
        <div className="production-content">
          <canvas ref={productionChartRef}></canvas>
        </div>
      </div>
      <div className="nacelle-section">
        <h2>機艙</h2>
        <div className="nacelle-content">
          <canvas ref={nacelleChartRef}></canvas>
        </div>
      </div>
      <div className="wind-section">
        <h2>風</h2>
        <div className="wind-content">
          <canvas ref={windChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default WindTurbineDashboard;