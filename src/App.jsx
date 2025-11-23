import { useState, useEffect } from 'react'
import { useTheme } from './contexts/ThemeContext'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFilters from './components/TodoFilters'
import StatsCard from './components/StatsCard'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const { theme } = useTheme()
  const [todos, setTodos] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos) : []
      }
      return []
    } catch (error) {
      console.error('Error loading todos:', error)
      return []
    }
  })
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)

  // Save to localStorage whenever todos change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('todos', JSON.stringify(todos))
      }
    } catch (error) {
      console.error('Error saving todos:', error)
    }
  }, [todos])

  const addTodo = (text, priority = 'medium') => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        priority: priority,
        createdAt: new Date().toISOString()
      }
      setTodos([...todos, newTodo])
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const editTodo = (id, newText) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ))
    }
    setEditingId(null)
  }

  const updatePriority = (id, priority) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, priority } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeTodosCount = todos.filter(todo => !todo.completed).length
  const completedTodosCount = todos.filter(todo => todo.completed).length
  const totalTodos = todos.length
  const completionPercentage = totalTodos > 0 
    ? Math.round((completedTodosCount / totalTodos) * 100) 
    : 0

  return (
    <div className={`min-h-screen py-4 sm:py-8 px-3 sm:px-4 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      <ThemeToggle />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8 animate-fade-in pt-12 sm:pt-0">
          <div className="inline-block mb-3 sm:mb-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300 ${
              theme === 'light' ? 'shadow-blue-500/50' : ''
            }`}>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight px-2">
            TaskMaster
          </h1>
          <p className={`text-sm sm:text-base md:text-lg transition-colors px-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Organize your life, one task at a time
          </p>
        </div>

        {/* Stats Cards */}
        {totalTodos > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fade-in">
            <StatsCard
              label="Total Tasks"
              value={totalTodos}
              icon="📋"
              gradient="from-blue-500 to-cyan-500"
            />
            <StatsCard
              label="Active"
              value={activeTodosCount}
              icon="⚡"
              gradient="from-purple-500 to-pink-500"
            />
            <StatsCard
              label="Completed"
              value={completedTodosCount}
              icon="✅"
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        )}

        {/* Main Card */}
        <div className={`backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-white/10 border border-white/20'
            : 'bg-white/80 border border-gray-200/50 shadow-xl'
        }`}>
          {/* Progress Bar */}
          {totalTodos > 0 && (
            <div className={`h-2 transition-colors ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200'
            }`}>
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          )}

          {/* Todo Form */}
          <div className={`p-4 sm:p-6 border-b transition-colors ${
            theme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}>
            <TodoForm onAdd={addTodo} />
          </div>

          {/* Todo List */}
          <div className="p-4 sm:p-6 min-h-[200px] sm:min-h-[300px]">
            <TodoList
              todos={filteredTodos}
              editingId={editingId}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onEditStart={setEditingId}
              onUpdatePriority={updatePriority}
            />
          </div>

          {/* Filters */}
          {todos.length > 0 && (
            <div className={`px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm border-t transition-colors ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-gray-50/80 border-gray-200'
            }`}>
              <TodoFilters
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeTodosCount}
                completedCount={completedTodosCount}
                onClearCompleted={clearCompleted}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`text-center mt-4 sm:mt-8 text-xs sm:text-sm animate-fade-in transition-colors px-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="mb-2">Built with React & Tailwind CSS</p>
          <a 
            href="https://github.com/aadhiVenkat/ToDo-app" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 hover:text-purple-500 transition-colors ${
              theme === 'dark' ? 'hover:text-purple-400' : 'hover:text-purple-600'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default App

