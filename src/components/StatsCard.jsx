import { useTheme } from '../contexts/ThemeContext'

function StatsCard({ label, value, icon, gradient }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      isDark
        ? 'bg-white/10 border-white/20 hover:bg-white/15'
        : 'bg-white/60 border-gray-200/50 hover:bg-white/80 shadow-md'
    }`}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className={`text-xs sm:text-sm font-medium mb-1 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {label}
          </p>
          <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {value}
          </p>
        </div>
        <div className={`text-3xl sm:text-4xl bg-gradient-to-br ${gradient} bg-clip-text text-transparent opacity-80 flex-shrink-0 ml-2`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsCard

