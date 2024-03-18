import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { Link,useNavigate } from 'react-router-dom';
import maximisationIcon from '../assets/expand_icon.svg';
import 'reactflow/dist/style.css';
import ControlPanel from'../components/ControlPanel/ControlPanel.jsx';
import styles from './Nodes.module.css';

const initialNodes = [
  { id: '1', position: { x: 650, y: 350 }, data:  { label: 'Node 1', description: 'Some description for Node 1' }},
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
      position: getPosition(),
      data: { label: `Node ${nextId}`, description: `Some description for Node ${nextId}` },
    },
  ]);
};


export default function Nodes() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const navigate = useNavigate();
  const onNodeClick = (event, node) => {
    setSelectedNode(node.data);
  };
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.customReactflow} style={{ width: '196vh', height: '96vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        >
          <Controls className={styles.control} >
            <button className={styles.button} onClick={() => addNode(setNodes, nodes)}>Добавить узел</button>
          </Controls>
          <Background variant="dots" size="2" />
        </ReactFlow>
      </div>
      <ControlPanel />
      {selectedNode && (
        <div className={styles.nodeInfo}>
          <p>{selectedNode.label}</p>
          <p>{selectedNode.description}</p>
          <Link to="/card" className={styles.maximal}>
            <button className={styles.maximal} onClick={() => navigate('/')}>
              <img src={maximisationIcon} className={styles.maximisationIcon} alt='Развернуть' />
            </button>

          </Link>  
        </div>
      )}
    </div>
  );
}
export {Nodes};
