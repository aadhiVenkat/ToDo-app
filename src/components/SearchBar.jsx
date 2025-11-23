import { useTheme } from '../contexts/ThemeContext'

function SearchBar({ searchQuery, onSearchChange }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="relative">
      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg 
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className={`w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 backdrop-blur-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm sm:text-base ${
          isDark
            ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
            : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:bg-white'
        }`}
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${
            isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-white/10' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar
