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
import 'reactflow/dist/style.css';
import ControlPanel from'../components/ControlPanel/ControlPanel.jsx';
import styles from './Nodes.module.css';
import NodeEditor from '../components/NodeEditor/NodeEditor.jsx';


const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

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
    event.preventDefault();
    setSelectedNode(node.data);
    setNodeName(node.data.label);
  };
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const updateNodeColor = (color) => {
    if (selectedNode) {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNode.id) {
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
    }
  };
  
  const updateNodeSize = (size) => {
    if (selectedNode) {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNode.id) {
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
    }
  };

  const onApply = (color, size) => {
    updateNodeColor(color);
    updateNodeSize(size);
  };

  const updateEdge = (edgeId, newSource, newTarget) => {
    const updatedEdges = edges.map((edge) => {
      if (edge.id === edgeId) {
        return {
          ...edge,
          source: newSource,
          target: newTarget,
        };
      }
      return edge;
    });
    setEdges(updatedEdges);
  };

  const handleLabelChange = (event) => {
    setNodeName(event.target.value); 
  };

  const handleUpdateNodeName = () => {
    if (selectedNode) {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: selectedNode.label,
            },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  };
  return (
    <div className={styles.appContainer}>
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
          handleLabelChange={handleLabelChange}
          handleUpdateNodeName={handleUpdateNodeName}
        >
          <Controls className={styles.control} >
          <NodeEditor 
            node={selectedNode} 
            onColorChange={updateNodeColor} 
            onSizeChange={updateNodeSize} 
            onApply={onApply}
          />
            <div className={styles.addButtonContainer}>
              <button className={styles.button} onClick={() => addNode(setNodes, nodes)}>Добавить узел</button>
            </div>
          </Controls>
          <Background variant="dots" />        
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