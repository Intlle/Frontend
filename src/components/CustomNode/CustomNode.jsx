import { useContext, useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeUpdateContext } from '../../pages/Nodes.jsx';

function CustomNode({ data, isConnectable, onTitleChange }) {
  const { updateNodeTitleAndDescription } = useContext(NodeUpdateContext); 

  const [label, setLabel] = useState(data.label);

  const onInputChange = useCallback((evt) => {
    const newLabel = evt.target.value;
    setLabel(newLabel);
    updateNodeTitleAndDescription(newLabel, data.description);
    onTitleChange(newLabel); 
  }, [updateNodeTitleAndDescription, data.description, onTitleChange]);

  const nodeStyle = {
    width: `${data.size}px`, 
    height:`${data.size * 0.5}px`,
    backgroundColor: data.color,
  };
  
  const inputContainerStyle = {
    width: `${data.size}px`,
    height: `${data.size * 0.3}px`,
    fontSize: `${data.size * 0.2}px`,
  };
  
  return (
    <div className="custom_node1" style={nodeStyle}>
      <Handle
       type="target"
        position={Position.Top} 
        isConnectable={isConnectable} 
        style={{ borderRadius: '50%', width: '10px', height: '10px', background: 'blue' }} />
      <div>
        <input
          id="text"
          name="text"
          value={label}
          onChange={onInputChange}
          style={inputContainerStyle}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
        style={{ borderRadius: '50%', width: '10px', height: '10px', background: 'blue' }}
      />
    </div>
  );
}

export default CustomNode;














