import React, { useState, useEffect, useRef } from 'react';
import '../css/APIDialog.css';

function APIDialog({ isOpen, onClose, onSubmit, defaultSqlInput }) {
  const [formData, setFormData] = useState({
    name: '',
    endpoint: '',
    sqlInput: ''
  });
  const sqlInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        endpoint: generateDefaultEndpoint(),
        sqlInput: defaultSqlInput
      });
    }
  }, [isOpen, defaultSqlInput]);

  useEffect(() => {
    if (sqlInputRef.current) {
      adjustTextareaHeight(sqlInputRef.current);
    }
  }, [formData.sqlInput]);

  const generateDefaultEndpoint = () => {
    const timestamp = new Date().getTime();
    return `/api/gmp/${timestamp}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      updateBy: 'Current User',
      updateTime: new Date().toLocaleString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="api-dialog-overlay">
      <div className="api-dialog">
        <h2>新增 API</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="API 名稱"
            required
          />
          <input
            type="text"
            name="endpoint"
            value={formData.endpoint}
            onChange={handleChange}
            placeholder="Endpoint"
            required
          />
          <textarea
            ref={sqlInputRef}
            name="sqlInput"
            value={formData.sqlInput}
            onChange={handleChange}
            placeholder="SQL Input"
            required
          ></textarea>
          <div className="dialog-buttons">
            <button type="submit">提交</button>
            <button type="button" onClick={onClose}>取消</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default APIDialog;