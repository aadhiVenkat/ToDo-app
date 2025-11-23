import React from 'react';

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="text-center">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1"></div>
        <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-800 flex-1">
          📝 Todo App
        </h1>
        <div className="flex-1 flex justify-end">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-yellow-400"
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
                className="w-6 h-6 text-indigo-600"
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
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-lg">
        Organize your tasks efficiently with style ✨
      </p>
    </header>
  );
}

export default Header;
