import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

function TodoForm({ onAdd }) {
  const { theme } = useTheme()
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input, priority)
      setInput('')
      setPriority('medium')
    }
  }

  const isDark = theme === 'dark'

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className={`w-full px-4 sm:px-5 py-3 sm:py-4 pr-24 sm:pr-28 backdrop-blur-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-base sm:text-lg font-medium ${
              isDark
                ? 'bg-white/20 border-white/30 text-white placeholder-gray-300'
                : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:bg-white'
            }`}
          />
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
            {['low', 'medium', 'high'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  priority === p
                    ? p === 'low'
                      ? 'bg-green-500 text-white shadow-lg'
                      : p === 'medium'
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'bg-red-500 text-white shadow-lg'
                    : isDark
                    ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {p.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      {priority !== 'medium' && (
        <div className={`flex items-center gap-2 text-sm transition-colors ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <span>Priority:</span>
          <span className={`font-semibold ${
            priority === 'low' ? 'text-green-500' :
            priority === 'high' ? 'text-red-500' : 'text-yellow-500'
          }`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
      )}
    </form>
  )
}

export default TodoForm

