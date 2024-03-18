import { useContext, useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeUpdateContext } from '../../pages/Nodes.jsx';


function CustomNode({ data, isConnectable }) {
  const { updateNode } = useContext(NodeUpdateContext); 

  const [label, setLabel] = useState(data.label);

  
  const onInputChange = useCallback((evt) => {
    const newLabel = evt.target.value;
    setLabel(newLabel);
    updateNode(newLabel); 
  }, [updateNode]);

  const nodeStyle = {
    width: `${data.size}px`, 
    height:`${data.size * 0.8}px`,
    color: data.color,
  };
  const inputContainerStyle = {
    width: `${data.size * 1}px`,
    height: `${data.size * 0.5}px`,
    fontSize: `${data.size * 0.2}px`,
    
  };
  return (
    <div  className="custom_node1" style={nodeStyle}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div >
        <input
          id="text"
          name="text"
          value={label}
          onChange={onInputChange}
          style={inputContainerStyle }
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;











