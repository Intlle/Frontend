import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import maximisationIcon from '../assets/expand_icon.svg';
import CustomNode from '../components/CustomNode/CustomNode.jsx'
import CustomEdge from '../components/CustomEdge/CustomEdge.jsx'
import '../components/CustomNode/Custom.css'
import 'reactflow/dist/style.css';
import ControlPanel from'../components/ControlPanel/ControlPanel.jsx';
import styles from './Nodes.module.css';
import NodeEditor from '../components/NodeEditor/NodeEditor.jsx';
import CardPage from '../components/CardPage/CardPage.jsx';



const initialNodes = [
  { id: '1', type: 'customNode' ,position: { x: 650, y: 350 }, data:  { label: 'Node 1', description: 'Some description for Node 1' }},
]; 
const initialEdges = [{ id: 'e1-2' }];

const getPosition = () => ({
  x:400,
  y:350,
});

const addNode = (setNodes, nodes) => {
  const nextId = nodes.length > 0 ? parseInt(nodes[nodes.length - 1].id) + 1 : 1;
  setNodes((prev) => [
    ...prev,
    {
      id: nextId.toString(),
      type: 'customNode', 
      position: getPosition(),
      data: { label: `Node ${nextId}`, description: `Some description for Node ${nextId}` },
    },
  ]);
};


const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export const NodeUpdateContext = React.createContext({
  updateNode: () => {},
  updateNodeColor: () => {},
  updateNodeSize: () => {}
});
export default function Nodes() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeLabel, setSelectedNodeLabel] = useState('');
  const navigate = useNavigate();

  const onNodeClick = (event, node) => {
    event.preventDefault();
    setSelectedNodeLabel(node.data.label);
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const updateNode = (newLabel, newDescription) => {
    const updatedNodes = nodes.map((node) => {
      if (node.data.label === selectedNodeLabel) {
        return {
          ...node,
          data: {
            ...node.data,
            label: newLabel,
            description: newDescription,
          },
        };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const updateNodeColor = (color) => {
    if (selectedNodeLabel) {
      const updatedNodes = nodes.map((node) => {
        if (node.data.label === selectedNodeLabel) {
          return {
            ...node,
            data: {
              ...node.data,
              color: color,
            },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
      console.log('Updated nodes:', updatedNodes);
    }
  };
  
  const updateNodeSize = (size) => {
    if (selectedNodeLabel) {
      const updatedNodes = nodes.map((node) => {
        if (node.data.label === selectedNodeLabel) {
          return {
            ...node,
            data: {
              ...node.data,
              size: size,
            },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
      console.log('Updated nodes:', updatedNodes);
    }
  };
  
  const onApplyChanges = (color, size) => {
    updateNodeColor(color);
    updateNodeSize(size);
   
  };

  const onChange = useCallback((newLabel) => {
    const updatedNodes = nodes.map((node) => {
      if (node.data.label === selectedNodeLabel) {
        return {
          ...node,
          data: {
            ...node.data,
            label: newLabel,
            
          },
        };
      }
      return node;
    });
    setNodes(updatedNodes);
  }, [nodes, selectedNodeLabel, setNodes]);
  
  return (
    <div className={styles.appContainer}>
      <NodeUpdateContext.Provider value={{ updateNode, updateNodeColor, updateNodeSize }}>
      <div className={styles.customReactflow} style={{ width: '210vh', height: '98vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes} 
          edgeTypes={edgeTypes}
          fitView
        >
          
          <Controls className={styles.control} >
          {selectedNodeLabel && (
  <NodeEditor 
    node={{ data: { label: selectedNodeLabel } }}
    onColorChange={updateNodeColor} 
    onSizeChange={updateNodeSize} 
    onApply={(color, size) => onApplyChanges(color, size, selectedNodeLabel)}
  />
)}
            <div className={styles.addButtonContainer}>
              <button className={styles.button} onClick={() => addNode(setNodes, nodes)}>Добавить узел</button>
            </div>
          </Controls>
          <Background variant="dots" />        
        </ReactFlow>
      </div>
      <ControlPanel />
      {selectedNodeLabel && (
        <div className={styles.nodeInfo}>
       <CardPage 
          title={selectedNodeLabel}
          description={nodes.find(node => node.data.label === selectedNodeLabel)?.data?.description}
          onTitleChange={(newTitle) => updateNode(newTitle, nodes.find(node => node.data.label === selectedNodeLabel)?.data?.description)}
          onDescriptionChange={(newDescription) => updateNode(selectedNodeLabel, newDescription)}
        />
            <Link  to="/card" className={styles.maximal} >
              <button className={styles.maximal} onClick={() => navigate('/')}>
                <img src={maximisationIcon} className={styles.maximisationIcon} alt='Развернуть' />
              </button>
            </Link> 
        </div> 
      )}
      </NodeUpdateContext.Provider>
    </div>
  );
      };
export {Nodes};
