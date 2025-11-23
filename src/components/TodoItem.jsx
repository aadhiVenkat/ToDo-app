import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

function TodoItem({ todo, isEditing, onToggle, onDelete, onEdit, onEditStart, onUpdatePriority }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [editText, setEditText] = useState(todo.text)
  const [showPriorityMenu, setShowPriorityMenu] = useState(false)
  const inputRef = useRef(null)
  const priorityRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditText(todo.text)
  }, [todo.text])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (priorityRef.current && !priorityRef.current.contains(event.target)) {
        setShowPriorityMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDoubleClick = () => {
    if (!todo.completed) {
      onEditStart(todo.id)
    }
  }

  const handleEditSubmit = () => {
    onEdit(todo.id, editText)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit()
    } else if (e.key === 'Escape') {
      setEditText(todo.text)
      onEditStart(null)
    }
  }

  const handleBlur = () => {
    handleEditSubmit()
  }

  const priorityColors = {
    low: isDark 
      ? 'border-green-500/50 bg-green-500/10' 
      : 'border-green-300 bg-green-50',
    medium: isDark 
      ? 'border-yellow-500/50 bg-yellow-500/10' 
      : 'border-yellow-300 bg-yellow-50',
    high: isDark 
      ? 'border-red-500/50 bg-red-500/10' 
      : 'border-red-300 bg-red-50'
  }

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  }

  return (
    <div
      className={`group flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 backdrop-blur-sm border-2 rounded-xl sm:rounded-2xl transition-all duration-300 ${
        todo.completed
          ? isDark
            ? 'border-white/10 bg-white/5 opacity-60'
            : 'border-gray-200 bg-gray-50 opacity-60'
          : `${priorityColors[todo.priority || 'medium']} ${
              isDark 
                ? 'hover:border-white/30 hover:shadow-xl' 
                : 'hover:border-gray-400 hover:shadow-lg'
            } hover:scale-[1.01] sm:hover:scale-[1.02]`
      }`}
    >
      {/* Checkbox */}
      <div className="relative flex-shrink-0 mt-0.5 sm:mt-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={`w-5 h-5 sm:w-6 sm:h-6 appearance-none border-2 rounded-lg checked:bg-gradient-to-br checked:from-blue-500 checked:to-purple-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all duration-200 relative ${
            isDark
              ? 'border-white/30 bg-white/10'
              : 'border-gray-300 bg-white'
          }`}
        />
        {todo.completed && (
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Todo Text or Edit Input */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`flex-1 min-w-0 px-3 sm:px-4 py-2 backdrop-blur-sm border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors text-sm sm:text-base ${
            isDark
              ? 'bg-white/20 text-white placeholder-gray-400'
              : 'bg-white text-gray-800 placeholder-gray-400'
          }`}
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className={`flex-1 min-w-0 cursor-pointer select-none transition-all font-medium text-sm sm:text-base break-words ${
            todo.completed
              ? isDark
                ? 'line-through text-gray-400'
                : 'line-through text-gray-400'
              : isDark
              ? 'text-white hover:text-purple-300'
              : 'text-gray-800 hover:text-purple-600'
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Priority Badge */}
      {!todo.completed && !isEditing && (
        <div className="relative flex-shrink-0" ref={priorityRef}>
          <button
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-110 active:scale-95 ${
              todo.priority === 'low'
                ? isDark
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-green-100 text-green-700 border border-green-300'
                : todo.priority === 'high'
                ? isDark
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-red-100 text-red-700 border border-red-300'
                : isDark
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
            }`}
          >
            <span className="hidden sm:inline">{priorityLabels[todo.priority || 'medium']}</span>
            <span className="sm:hidden">{(todo.priority || 'medium').charAt(0).toUpperCase()}</span>
          </button>
          {showPriorityMenu && (
            <div className={`absolute right-0 sm:right-auto sm:left-0 mt-2 backdrop-blur-xl rounded-xl shadow-2xl p-2 z-20 min-w-[100px] transition-colors ${
              isDark
                ? 'bg-white/20 border border-white/30'
                : 'bg-white border border-gray-200 shadow-lg'
            }`}>
              {['low', 'medium', 'high'].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    onUpdatePriority(todo.id, p)
                    setShowPriorityMenu(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all mb-1 last:mb-0 ${
                    p === 'low'
                      ? isDark ? 'text-green-300' : 'text-green-700'
                      : p === 'high'
                      ? isDark ? 'text-red-300' : 'text-red-700'
                      : isDark ? 'text-yellow-300' : 'text-yellow-700'
                  } ${
                    todo.priority === p 
                      ? isDark ? 'bg-white/20' : 'bg-gray-100'
                      : isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'
                  }`}
                >
                  {priorityLabels[p]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        className={`opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-2 sm:p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 transform hover:scale-110 active:scale-95 flex-shrink-0 ${
          isDark
            ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20'
            : 'text-red-500 hover:text-red-600 hover:bg-red-50'
        }`}
        aria-label="Delete todo"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
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
  )
}

export default TodoItem

