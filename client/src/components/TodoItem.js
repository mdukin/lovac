import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: todo.title,
      description: todo.description || '',
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description || '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editData.title.trim()) {
      alert('Title is required');
      return;
    }

    setLoading(true);
    const result = await onUpdate(todo.id, editData);
    
    if (result.success) {
      setIsEditing(false);
    } else {
      alert(result.error || 'Failed to update todo');
    }
    
    setLoading(false);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          id={`todo-${todo.id}`}
        />
        <label htmlFor={`todo-${todo.id}`}></label>
      </div>

      <div className="todo-content">
        {isEditing ? (
          <div className="todo-edit-form">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="edit-title-input"
              placeholder="Todo title..."
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="edit-description-input"
              placeholder="Description (optional)..."
              rows="2"
            />
            <div className="edit-actions">
              <button 
                onClick={handleSaveEdit} 
                disabled={loading}
                className="save-button"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={handleCancelEdit}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-display">
            <h4 className="todo-title">{todo.title}</h4>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <div className="todo-meta">
              <span className="todo-date">
                Created: {formatDate(todo.created_at)}
              </span>
              {todo.updated_at !== todo.created_at && (
                <span className="todo-date">
                  Updated: {formatDate(todo.updated_at)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button 
            onClick={handleEdit}
            className="edit-button"
            title="Edit todo"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete}
            className="delete-button"
            title="Delete todo"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;