import React, { useState, useEffect } from 'react';

function TodoForm({ addTodo, updateTodo, editingTodo, setEditingTodo }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.text);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    if (editingTodo) {
      updateTodo(editingTodo.id, input);
    } else {
      addTodo(input);
    }
    setInput('');
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={editingTodo ? "Edit your task..." : "Add a new task..."}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white transition-all duration-300 shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          >
            {editingTodo ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </span>
            )}
          </button>
          {editingTodo && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-4 bg-gray-400 dark:bg-gray-600 text-white rounded-xl hover:bg-gray-500 dark:hover:bg-gray-700 transition-all duration-300 font-semibold shadow-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
