import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, deleteTodo, setEditingTodo }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            No tasks yet!
          </p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            Add your first task to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          setEditingTodo={setEditingTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
