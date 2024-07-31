import React from 'react';
import '../css/CollapsibleJSON.css';

const CollapsibleJSON = ({ data }) => {
  const renderValue = (value, depth) => {
    if (typeof value === 'string') {
      return <span className="json-string">"{value}"</span>;
    }
    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>;
    }
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      return renderJSON(value, depth);
    }
    return <span>{JSON.stringify(value)}</span>;
  };

  const renderJSON = (obj, depth = 0) => {
    const isArray = Array.isArray(obj);
    const items = Object.entries(obj);
  
    return (
      <div className="json-item">
        <span className="json-bracket">{isArray ? '[' : '{'}</span>
        <div className="json-content">
          {items.map(([key, value], index) => (
            <React.Fragment key={key}>
              <div className="json-property" style={{ marginLeft: '1tab' }}>
                {!isArray && <span className="json-key">"{key}": </span>}
                {renderValue(value, depth + 1)}
              </div>
              {index < items.length - 1 && <div className="json-comma">,</div>}
            </React.Fragment>
          ))}
        </div>
        <div className="json-bracket-close">
          {isArray ? ']' : '}'}
        </div>
        {depth === 0 && isArray && items.length > 0 && <div className="json-comma">,</div>}
      </div>
    );
  };

  return <div className="collapsible-json">{renderJSON(data)}</div>;
};

export default CollapsibleJSON;