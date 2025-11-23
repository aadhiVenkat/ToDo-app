import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (id, text) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: text } : todo
      )
    );
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="mt-8">
          <TodoForm
            addTodo={addTodo}
            updateTodo={updateTodo}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
          />
        </div>

        <div className="mt-8">
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            setEditingTodo={setEditingTodo}
          />
        </div>

        {todos.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm dark:text-gray-400 text-gray-600">
              {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
