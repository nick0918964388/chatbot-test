import React, { useState, useEffect } from 'react';
import '../css/AlertSettings.css';

function AlertSettings() {
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [target, setTarget] = useState('系統管理員');
  const cdmidOptions = {
    L1: ['*','SWG', 'EVE', 'LCA', 'SEM'],
    L2: ['*','STA', 'ISN', 'SIG', 'VEH'],
    L3: ['*','CAR', 'INK'],
    L4: ['*','INN', 'LCR', 'CEI'],
    L5: ['*','CET']
  };

  const [selectedCDMIDs, setSelectedCDMIDs] = useState({
    L1: '', L2: '', L3: '', L4: '', L5: ''
  });

  useEffect(() => {
    const testAlerts = [
      { 
        id: 1, 
        name: '系統異常告警', 
        notificationType: '告警觸發', 
        alertType: '系統異常',
        triggerCondition: '系統警示錯誤超過',
        daysWithoutData: 3,
        unit: '次',
        target: '系統管理員',
        channel: '操作介面彈出訊息',
        repeatFrequency: '隨指數遞增',
        updatedBy: 'Admin',
        updatedAt: '2023-05-01 10:00:00'
      },
      { 
        id: 2, 
        name: 'CDM週期數據異常告警', 
        notificationType: '告警觸發', 
        alertType: '數據異常',
        triggerCondition: 'CDMID:* / * / * / * / *',
        daysWithoutData: 5,
        unit: '天',
        target: '特定人員',
        channel: '郵件',
        repeatFrequency: '隨指數遞增',
        updatedBy: 'Admin',
        updatedAt: '2023-05-02 14:30:00'
      },
    ];
    setAlerts(testAlerts);
  }, []);

  const handleCDMIDChange = (level, value) => {
    setSelectedCDMIDs(prev => ({...prev, [level]: value}));
  };

  const openModal = (alert = null) => {
    setCurrentAlert(alert);
    setIsModalOpen(true);
    if (alert) {
      setTarget(alert.target);
      const cdmids = alert.triggerCondition.split(' / ');
      setSelectedCDMIDs({
        L1: cdmids[0] || '',
        L2: cdmids[1] || '',
        L3: cdmids[2] || '',
        L4: cdmids[3] || '',
        L5: cdmids[4] || ''
      });
    } else {
      setTarget('系統管理員');
      setSelectedCDMIDs({ L1: '', L2: '', L3: '', L4: '', L5: '' });
    }
  };

  const closeModal = () => {
    setCurrentAlert(null);
    setIsModalOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const triggerCondition = Object.values(selectedCDMIDs).filter(Boolean).join(' / ');
    const updatedAlert = {
      id: currentAlert ? currentAlert.id : Date.now(),
      name: formData.get('name'),
      notificationType: formData.get('notificationType'),
      alertType: formData.get('alertType'),
      triggerCondition: triggerCondition,
      daysWithoutData: formData.get('daysWithoutData'),
      unit: formData.get('unit'),
      target: formData.get('target'),
      channel: formData.get('channel'),
      repeatFrequency: formData.get('repeatFrequency'),
      updatedBy: 'Current User', // 這裡應該是當前登錄用戶的名稱
      updatedAt: new Date().toLocaleString()
    };

    if (currentAlert) {
      setAlerts(alerts.map(alert => alert.id === currentAlert.id ? updatedAlert : alert));
    } else {
      setAlerts([...alerts, updatedAlert]);
    }
    closeModal();
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="alert-settings">
      <h1>告警設定</h1>
      <button className="add-button" onClick={() => openModal()}>新增告警</button>
      
      <div className="table-container">
        <table className="alert-table wide-table">
          <thead>
            <tr>
              <th>規則名稱</th>
              <th>通知方式</th>
              <th>告警類型</th>
              <th>告警觸發條件</th>
              <th>警戒值</th>
              <th>單位</th>
              <th>對象</th>
              <th>渠道</th>
              <th>重複通知頻率</th>
              <th>更新人員</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id}>
                <td>{alert.name}</td>
                <td>{alert.notificationType}</td>
                <td>{alert.alertType}</td>
                <td>{alert.triggerCondition}</td>
                <td>{alert.daysWithoutData}</td>
                <td>{alert.unit}</td>
                <td>{alert.target}</td>
                <td>{alert.channel}</td>
                <td>{alert.repeatFrequency}</td>
                <td>{alert.updatedBy}</td>
                <td>{alert.updatedAt}</td>
                <td>
                  <button className="edit-button" onClick={() => openModal(alert)}>編輯</button>
                  <button className="delete-button" onClick={() => deleteAlert(alert.id)}>刪除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{currentAlert ? '編輯告警' : '新增告警'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                規則名稱:
                <input type="text" name="name" defaultValue={currentAlert?.name} required />
              </label>
              <label>
                通知方式:
                <select name="notificationType" defaultValue={currentAlert?.notificationType}>
                  <option value="告警觸發">告警觸發</option>
                  <option value="告警恢復">告警恢復</option>
                </select>
              </label>
              <label>
                告警類型:
                <select name="alertType" defaultValue={currentAlert?.alertType}>
                  <option value="系統異常">系統異常</option>
                  <option value="數據異常">數據異常</option>
                </select>
              </label>
              <label>
                告警觸發條件:
                <div className="condition-group">
                  {['L1', 'L2', 'L3', 'L4', 'L5'].map(level => (
                    <select 
                      key={level}
                      value={selectedCDMIDs[level]} 
                      onChange={(e) => handleCDMIDChange(level, e.target.value)}
                    >
                      <option value="">{level}</option>
                      {cdmidOptions[level].map(cdmid => (
                        <option key={cdmid} value={cdmid}>{cdmid}</option>
                      ))}
                    </select>
                  ))}
                </div>
                <div name="triggerCondition" className="selected-cdmids">
                  {Object.values(selectedCDMIDs).filter(Boolean).join(' / ')}
                </div>
              </label>
              <label>
                超過幾日未有資料:
                <input type="number" name="daysWithoutData" defaultValue={currentAlert?.daysWithoutData} required />
              </label>
              <label>
                單位:
                <input type="text" name="unit" defaultValue={currentAlert?.unit} required />
              </label>
              <label>
                告警對象:
                <select name="target" value={target} onChange={(e) => setTarget(e.target.value)}>
                  <option value="系統管理員">系統管理員</option>
                  <option value="特定人員">特定人員</option>
                </select>
              </label>
              {target === '特定人員' && (
                <label>
                  特定人員Email:
                  <input type="email" name="targetEmail" defaultValue={currentAlert?.targetEmail} required />
                </label>
              )}
              <label>
                告警接收渠道:
                <select name="channel" defaultValue={currentAlert?.channel}>
                  <option value="操作介面彈出訊息">操作介面彈出訊息</option>
                  <option value="郵件">郵件</option>
                  <option value="簡訊">簡訊</option>
                </select>
              </label>
              <label>
                重複通知頻率:
                <select name="repeatFrequency" defaultValue={currentAlert?.repeatFrequency}>
                  <option value="不重複">不重複</option>
                  <option value="5分鐘">5分鐘</option>
                  <option value="10分鐘">10分鐘</option>
                  <option value="30分鐘">30分鐘</option>
                  <option value="隨指數遞增">隨指數遞增</option>
                </select>
              </label>
              <div className="form-buttons">
                <button type="submit">保存</button>
                <button type="button" onClick={closeModal}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertSettings;