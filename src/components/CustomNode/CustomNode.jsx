import React, { useState } from 'react';

const CustomNode = ({ data, onLabelChange }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleConfirmLabel = () => {
    onLabelChange(label);
    setEditing(false);
  };

  return (
    <div style={{ padding: '10px' }}>
      {editing ? (
        <div>
          <input type="text" value={label} onChange={handleLabelChange} />
          <button onClick={handleConfirmLabel}>Confirm</button>
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          {data.label}
        </div>
      )}
    </div>
  );
};

export default CustomNode;
