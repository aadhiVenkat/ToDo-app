import { useTheme } from '../contexts/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-3 right-3 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 backdrop-blur-xl rounded-full border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group ${
        isDark
          ? 'bg-white/10 border-white/20'
          : 'bg-white/80 border-gray-200/50'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle

