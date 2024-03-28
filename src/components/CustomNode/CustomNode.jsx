import { useContext, useCallback, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeUpdateContext } from '../../pages/Nodes.jsx';

function CustomNode({ data, isConnectable}) {
  const { updateNodeTitleAndDescription} = useContext(NodeUpdateContext); 

  const [label, setLabel] = useState(data.label);
  const onInputChange = useCallback((evt) => {
    const newLabel = evt.target.value;
    setLabel(newLabel);
    updateNodeTitleAndDescription(newLabel, data.description);
  }, [updateNodeTitleAndDescription, data.description]);

  const nodeStyle = {
    width: `${data.size*0.5}vh`, 
    height:`${data.size*0.2}vh`,
    backgroundColor: data.color,
    border: '3px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: `${data.size*0.1}vh`,
  };
  
  return (
    <div >
         <Handle
        type="target"
        position={Position.Bottom}
        id={`input-${data.id}`}
        isConnectable={isConnectable}
        style={{ borderRadius: '50%', width: '10px', height: '10px', background: 'white' }}
      />
      <div>
        <input
          className="custom_node1"
          value={label}
          onChange={onInputChange}
          style={nodeStyle}
        />
      </div>
      <Handle
        type="sourse"
        position={Position.Bottom}
        id={`output-${data.id}`}
        isConnectable={isConnectable}
        style={{ borderRadius: '50%', width: '10px', height: '10px', background: 'white' }}
      />
    </div>
  );
}

export default CustomNode;














