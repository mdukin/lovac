import React, { useState, useEffect } from 'react';
import { todoAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoAPI.getTodos();
      setTodos(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      setTodos([response.data, ...todos]);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to create todo' 
      };
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const response = await todoAPI.updateTodo(id, todoData);
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update todo' 
      };
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const response = await todoAPI.toggleTodo(id);
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ));
    } catch (error) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-container">
      <header className="todo-header">
        <div className="header-content">
          <h1>My Todo App</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="todo-content">
        <TodoForm onAddTodo={handleAddTodo} />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <div className="todos-section">
            <div className="todo-stats">
              <span>Total: {todos.length}</span>
              <span>Pending: {pendingTodos.length}</span>
              <span>Completed: {completedTodos.length}</span>
            </div>

            {todos.length === 0 ? (
              <div className="no-todos">
                <p>No todos yet. Create your first todo above!</p>
              </div>
            ) : (
              <>
                {pendingTodos.length > 0 && (
                  <div className="todo-section">
                    <h3>Pending Tasks ({pendingTodos.length})</h3>
                    <div className="todo-list">
                      {pendingTodos.map(todo => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onToggle={handleToggleTodo}
                          onUpdate={handleUpdateTodo}
                          onDelete={handleDeleteTodo}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {completedTodos.length > 0 && (
                  <div className="todo-section">
                    <h3>Completed Tasks ({completedTodos.length})</h3>
                    <div className="todo-list">
                      {completedTodos.map(todo => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onToggle={handleToggleTodo}
                          onUpdate={handleUpdateTodo}
                          onDelete={handleDeleteTodo}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;