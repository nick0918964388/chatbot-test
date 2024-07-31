import React, { useState, useEffect } from 'react';
import '../css/GMPDataRedefination.css';
import CollapsibleJSON from './CollapsibleJSON';
import JsonFormatter from 'react-json-formatter'
import APIDialog from './APIDialog';

function GMPDataRedefination() {
  const defaultSqlInput = `/*各廠用電量總和*/
select b.site , sum(a.reading) from meterreading a 
left join assetnum b on a.assetnum=b.assetnum
left join site c on b.site=c.site
where a.readingdate between '2024-07-01' and '2024-07-31'
and a.meter = 'electricity'
group by b.site
;`;

  const [sqlInput, setSqlInput] = useState(defaultSqlInput);
  const [formattedSql, setFormattedSql] = useState('');
  const [previewData, setPreviewData] = useState([]);
  const [apiList, setApiList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
      // 模擬查詢結果
  const mockQueryResult = () => {
    const sites = [
      'F12P12', 'F12P3', 'F12P45', 'F12P6', 'F12P7', 'F12P8',
      'F15P12', 'F15P34', 'F15P5', 'F15P6', 'F15P7',
      'F14P12', 'F14P34', 'F14P5', 'F14P6', 'F14P7', 'F14P8'
    ];
    
    return sites.map(site => ({
      site: site,
      total_reading: Math.round(Math.random() * 1000000)
    }));
  };

    setPreviewData(mockQueryResult());
  }, [sqlInput]);

  const handleSqlInputChange = (e) => {
    setSqlInput(e.target.value);
  };

  const renderFormattedSql = () => {
    return sqlInput.split(/(\{\{.*?\}\}|\n|\/\*[\s\S]*?\*\/)/).map((part, index) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        return <strong key={index}>{part}</strong>;
      } else if (part.startsWith('/*') && part.endsWith('*/')) {
        return <span key={index} className="comment">{part}</span>;
      }
      return part;
    });
  };

  const handleAddApi = (newApi) => {
    setApiList([...apiList, newApi]);
  };

  const jsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    numberStyle: { color: 'darkorange' }
  }

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="gmp-data-redefination">
      <h1>GMP Data Refinery</h1>
      
      <div className="sql-input-container">
        <h2>SQL Input</h2>
        <textarea
          value={sqlInput}
          onChange={handleSqlInputChange}
          rows={10}
        />
        <div className="formatted-sql">
          {renderFormattedSql()}
        </div>
      </div>

      <div className="preview-container">
        <h2>結果預覽</h2>
        <JsonFormatter json={previewData} tabWith={4} jsonStyle={jsonStyle} />
      </div>

      <div className="api-list">
        <h2>API 清單</h2>
        <button onClick={openDialog} className="add-api-button">新增 API</button>
        <table>
          <thead>
            <tr>
              <th>API Name</th>
              <th>Endpoint</th>
              <th>Update By</th>
              <th>Update Time</th>
              <th>SQL Input</th>
            </tr>
          </thead>
          <tbody>
            {apiList.map((api, index) => (
              <tr key={index}>
                <td>{api.name}</td>
                <td>{api.endpoint}</td>
                <td>{api.updateBy}</td>
                <td>{api.updateTime}</td>
                <td>{api.sqlInput}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <APIDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddApi}
        defaultSqlInput={sqlInput}
      />
    </div>
  );
}

export default GMPDataRedefination;