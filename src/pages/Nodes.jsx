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
  { id: '1', type: 'customNode' ,position: { x: 650, y: 350 }, data:  { label: 'Узел 1', description: 'Описание узла 1', color:'#1C2130' }},
]; 
const initialEdges = [{ id: 'e1-2' }];

const getPosition = () => ({
  x:400,
  y:350,
});

const addNode = (setNodes, nodes) => {
  const nextId = nodes.length > 0 ? parseInt(nodes[nodes.length - 1].id) + 1 : 1;
  const prevColor = nodes.length > 0 ? nodes[nodes.length - 1].data.color : '#1C2130';
  setNodes((prev) => [
    ...prev,
    {
      id: nextId.toString(),
      type: 'customNode', 
      position: getPosition(),
      data: { label: `Узел ${nextId}`, description: `Описание узла ${nextId}`, color: prevColor },
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
  updateNodeSize: () => {},
  updateNodeTitle: () => {},
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
  const handleNodeSelection = (node) => {
    setSelectedNodeLabel(node.data.label);
    setNodeDescription(node.data.description);
    setCardPageTitle(node.data.label); 
  }
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const updateNodeTitleAndDescription = (newTitle, newDescription) => {
    const updatedNodes = nodes.map((node) => {
      if (node.data.label === selectedNodeLabel) {
        return {
          ...node,
          data: {
            ...node.data,
            label: newTitle,
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
  const handleDeleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.data.label !== selectedNodeLabel));
    setSelectedNodeLabel('');
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
      <NodeUpdateContext.Provider value={{ updateNodeTitleAndDescription, updateNodeColor, updateNodeSize}}>
      <div className={styles.customReactflow} style={{ width: '210vh', height: '100vh' }}>
      <div className={styles.nodeEditorStyles}>

              <NodeEditor 
                node={{ data: { label: selectedNodeLabel } }}
                onColorChange={updateNodeColor} 
                onSizeChange={updateNodeSize} 
                onApply={(color, size) => onApplyChanges(color, size, selectedNodeLabel)}
                onDeleteNode={handleDeleteNode}
                onAddNode={() => addNode(setNodes, nodes)}
              />
            
          </div>
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
          
          <Controls className={styles.control} showZoom={true} showInteractive={false} showPan={false} showFitView={false}/>
           <Background variant="dots" gap={15} />
        </ReactFlow>
      </div>
      <ControlPanel />
      {selectedNodeLabel && (
        <div className={styles.CardPageBlock }>
              <CardPage 
            title={selectedNodeLabel}
            description={nodes.find(node => node.data.label === selectedNodeLabel)?.data?.description}
            onTitleChange={(newTitle) => {
              updateNodeTitleAndDescription(newTitle, nodes.find(node => node.data.label === selectedNodeLabel)?.data?.description);
            }}
            onDescriptionChange={(newDescription) => updateNodeTitleAndDescription(selectedNodeLabel, newDescription)}
            onAddNode={() => addNode(setNodes, nodes)}
            handleNodeSelection={handleNodeSelection}
            setCardPageTitle={setSelectedNodeLabel}
            onNodeLabelChange={(newLabel) => {
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
            }}
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

