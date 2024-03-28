import React, {useEffect, useState } from 'react';

export default function CardPage({ title, description, onTitleChange, onDescriptionChange, onAddNode,  setCardPageTitle, onNodeLabelChange}) {
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setCurrentTitle(newTitle);
    onTitleChange(newTitle);
    setCardPageTitle(newTitle);
    onNodeLabelChange(newTitle);
  };
 
  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    onDescriptionChange(newDescription); 
  };
  
  const CardPageBlock = {
    backgroundColor: '#282f44',
    position: 'absolute',
    bottom: '30px',
    right: '20px',
    border: '3px solid white',
    borderRadius: '20px',
    padding: '17px',
    paddingBottom: '50px',
    maxWidth: '190px', 
    height:'230px',
  };
  const CardPageBlockText1 = {
    backgroundColor:'#282f44',
    border: 'none',
    fontFamily: 'inherit',
    fontWeight: '800',
    color: 'white',
    fontSize: '20px',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '100%', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const CardPageBlockText2 = {
    backgroundColor:'#282f44',
    border: 'none',
    fontFamily: 'inherit',
    fontWeight: '500',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '100%',
    overflowY: 'auto',
    height: 'calc(100% - 30px)',
    paddingRight: '27px',
    marginBottom: '7px',
    
  };
  const scrollbarStyle = `
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: white; 
    border-radius: 5px; 
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #CDCDCD;
  }
`;
const addButton = {
  padding: '6px',
  paddingRight:'30px',
  paddingLeft:'30px',
  marginLeft:'5px',
  fontFamily: 'inherit',
  fontWeight: '500',
  backgroundColor: '#ffffff',
  borderRadius: '7px',
  border:'none',
 

}
const handleAddNode = () => {
  onAddNode();
};
  return (
    <div style={CardPageBlock}>
      <input
        style={CardPageBlockText1}
        value={currentTitle}
        onChange={handleTitleChange}
      />

      <textarea
        style={{ ...CardPageBlockText2, ...{ scrollBehavior: 'smooth' } }}
        value={description}
        onChange={handleDescriptionChange}
      />
      <button style={addButton} onClick={handleAddNode}>Добавить узел</button>
       <style>{scrollbarStyle}</style>
    </div>
    
  );
}





