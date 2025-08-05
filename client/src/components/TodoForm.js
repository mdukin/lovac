import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    const result = await onAddTodo(formData);
    
    if (result.success) {
      setFormData({ title: '', description: '' });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="todo-form-container">
      <h2>Add New Todo</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-row">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="title-input"
            maxLength="255"
          />
          <button type="submit" disabled={loading} className="add-button">
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
        
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description (optional)..."
          className="description-input"
          rows="3"
        />
      </form>
    </div>
  );
};

export default TodoForm;