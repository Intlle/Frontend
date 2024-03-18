import React, { useState } from 'react';

export default function CardPage({ title, description, onTitleChange }) {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardDescription, setCardDescription] = useState(description);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setCardTitle(newTitle);
    onTitleChange(newTitle);
  };

  const handleDescriptionChange = (e) => {
    setCardDescription(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={cardTitle}
        onChange={handleTitleChange}
      />
      <textarea
        value={cardDescription}
        onChange={handleDescriptionChange}
      />
    </div>
  );
}


