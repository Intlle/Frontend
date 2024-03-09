
import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ControlPanel from './ControlPanel';

const initialNodes = [
  { id: '1', position: { x: 550, y: 350 }, data: { label: '1'}},
]; 
const initialEdges = [{ id: 'e1-2' }];


const addNode = (setNodes, nodes) => {
  const nextId = nodes.length > 0 ? parseInt(nodes[nodes.length - 1].id) + 1 : 1;
  setNodes((prev) => [
    ...prev,
    {
      id: nextId.toString(),
      position: getPosition(),
      data: { label: nextId.toString() },
    },
  ]);
};

const getPosition = () => ({
  x:300,
  y:350,
});

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <div className="app-container">
     
    <div className =  'custom-reactflow' style={{ width: '196vh', height: '96vh' }}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls>
          <button onClick={() => addNode(setNodes, nodes)}>Добавить узел</button>
        </Controls>
        <Background variant="dots" />
      </ReactFlow>
    </div>
    <ControlPanel />
    </div>
  );
}
