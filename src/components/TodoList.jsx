import TodoItem from './TodoItem'
import { useTheme } from '../contexts/ThemeContext'

function TodoList({ todos, editingId, onToggle, onDelete, onEdit, onEditStart, onUpdatePriority }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  if (todos.length === 0) {
    return (
      <div data-testid="todo-list-empty" className="text-center py-8 sm:py-16 animate-fade-in px-4">
        <div className={`inline-block p-4 sm:p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 border transition-colors ${
          isDark ? 'border-white/20' : 'border-blue-200/50'
        }`}>
          <svg
            className={`w-12 h-12 sm:w-16 sm:h-16 transition-colors ${isDark ? 'text-blue-400' : 'text-blue-500'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className={`text-lg sm:text-xl font-semibold mb-2 transition-colors ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          No tasks found
        </p>
        <p className={`text-xs sm:text-sm transition-colors px-2 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {editingId === null ? 'Add a new task to get started!' : 'Try a different filter'}
        </p>
      </div>
    )
  }

  return (
    <div data-testid="todo-list" className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className="animate-slide-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TodoItem
            todo={todo}
            isEditing={editingId === todo.id}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onEditStart={onEditStart}
            onUpdatePriority={onUpdatePriority}
          />
        </div>
      ))}
    </div>
  )
}

export default TodoList

