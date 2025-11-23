import { useTheme } from '../contexts/ThemeContext'

function TodoFilters({ filter, onFilterChange, activeCount, completedCount, onClearCompleted }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const filters = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'active', label: 'Active', icon: '⚡' },
    { id: 'completed', label: 'Completed', icon: '✅' }
  ]

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Todo Count */}
      <div className={`text-xs sm:text-sm transition-colors text-center sm:text-left ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        <span className={`font-bold text-base sm:text-lg transition-colors ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {activeCount}
        </span>{' '}
        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Buttons */}
        <div className={`flex gap-1.5 sm:gap-2 backdrop-blur-sm p-1 sm:p-1.5 rounded-xl border transition-colors w-full sm:w-auto justify-center ${
          isDark
            ? 'bg-white/10 border-white/20'
            : 'bg-gray-100 border-gray-200'
        }`}>
          {filters.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => onFilterChange(id)}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 ${
                filter === id
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : isDark
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
            >
              <span className="text-sm sm:text-base">{icon}</span>
              <span className="hidden xs:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center gap-2 w-full sm:w-auto ${
              isDark
                ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20 border-red-500/30'
                : 'text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300'
            }`}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear ({completedCount})</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default TodoFilters

