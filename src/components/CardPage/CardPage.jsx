import React, { useState } from 'react';

export default function CardPage({ title, description, onTitleChange, onDescriptionChange }) {
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setCurrentTitle(newTitle);
    onTitleChange(newTitle);
    onDescriptionChange(description.replace(currentTitle, newTitle));
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    onDescriptionChange(newDescription);
  };

  return (
    <div className='cardpage_text'>
      <input
        className='cardpage_text1_input'
        type="text"
        value={currentTitle}
        onChange={handleTitleChange}
      />
      <textarea
        className='cardpage_text1_input'
        value={description}
        onChange={handleDescriptionChange}
      />
    </div>
  );
}





