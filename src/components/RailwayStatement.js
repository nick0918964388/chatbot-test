import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/RailwayStatement.css';

const RailwayStatements = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 模擬根據日期獲取數據的函數
  const getDispatchData = (date) => {
    // 這裡應該是從後端 API 獲取數據的邏輯
    // 現在我們只是返回一些模擬數據
    return [
      { depot: '七堵機務段', projected: 150, actual: Math.floor(Math.random() * 10) + 140 },
      { depot: '台北機務段', projected: 150, actual: Math.floor(Math.random() * 10) + 140 },
      { depot: '新竹機務段', projected: 120, actual: Math.floor(Math.random() * 10) + 110 },
      { depot: '彰化機務段', projected: 180, actual: Math.floor(Math.random() * 10) + 170 },
      { depot: '嘉義機務段', projected: 100, actual: Math.floor(Math.random() * 10) + 90 },
      { depot: '高雄機務段', projected: 200, actual: Math.floor(Math.random() * 10) + 190 },
      { depot: '花蓮機務段', projected: 80, actual: Math.floor(Math.random() * 10) + 70 },
      { depot: '臺東機務段', projected: 80, actual: Math.floor(Math.random() * 10) + 70 },
    ];
  };

  const dispatchData = getDispatchData(selectedDate);

  // 模擬各機務段各車種的實際出車數量與預計出車數量差異數據
  const getDispatchDifferenceData = () => {
    const depots = ['七堵機務段', '台北機務段', '新竹機務段', '彰化機務段', '嘉義機務段', '高雄機務段', '花蓮機務段', '臺東機務段'];
    return depots.map(depot => ({
      depot,
      locomotiveProjected: Math.floor(Math.random() * 50) + 50,
      locomotiveActual: Math.floor(Math.random() * 50) + 50,
      passengerProjected: Math.floor(Math.random() * 100) + 100,
      passengerActual: Math.floor(Math.random() * 100) + 100,
    }));
  };

  const dispatchDifferenceData = getDispatchDifferenceData();

  return (
    <div className="railway-statements">
      <div className="data-cards">
        <div className="data-card full-width">
          <div className="card-header">
            <h2>各機務段 {selectedDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })}車輛運用(輛)</h2>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
            />
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={dispatchData}
              margin={{top: 20, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="depot" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="projected" name="預計派車數" fill="#8884d8" />
              <Bar dataKey="actual" name="實際回報數" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="data-cards">
        <div className="data-card full-width">
          <h2>各機務段各車種實際出車數量與預計出車數量差異</h2>
          <table className="dispatch-difference-table">
            <thead>
              <tr>
                <th>機務段</th>
                <th>動力車預計</th>
                <th>動力車實際</th>
                <th>動力車差異</th>
                <th>客車預計</th>
                <th>客車實際</th>
                <th>客車差異</th>
              </tr>
            </thead>
            <tbody>
              {dispatchDifferenceData.map((item, index) => (
                <tr key={index}>
                  <td>{item.depot}</td>
                  <td>{item.locomotiveProjected}</td>
                  <td>{item.locomotiveActual}</td>
                  <td>{item.locomotiveActual - item.locomotiveProjected}</td>
                  <td>{item.passengerProjected}</td>
                  <td>{item.passengerActual}</td>
                  <td>{item.passengerActual - item.passengerProjected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RailwayStatements;