import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, setEditingTodo }) {
  return (
    <div
      className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
        todo.completed
          ? 'bg-gray-100 dark:bg-gray-800 opacity-75'
          : 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg'
      }`}
    >
      <button
        onClick={() => toggleComplete(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
        }`}
      >
        {todo.completed && (
          <svg
            className="w-full h-full text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-lg transition-all duration-300 ${
            todo.completed
              ? 'line-through text-gray-500 dark:text-gray-500'
              : 'text-gray-800 dark:text-gray-200'
          }`}
        >
          {todo.text}
        </p>
        {todo.createdAt && (
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            {new Date(todo.createdAt).toLocaleString()}
          </p>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {!todo.completed && (
          <button
            onClick={() => setEditingTodo(todo)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
            aria-label="Edit task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
          aria-label="Delete task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
