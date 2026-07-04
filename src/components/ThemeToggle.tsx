import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const options = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' }
  ]

  return (
    <div className="flex items-center bg-bg-subtle rounded-full p-1 border border-border-strong">
      {options.map((option) => {
        const Icon = option.icon
        const isActive = theme === option.id
        return (
          <div key={option.id} className="relative group">
            <button
              onClick={() => setTheme(option.id as any)}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                isActive 
                  ? 'bg-bg-surface text-primary shadow-sm' 
                  : 'text-text-muted hover:text-text-base'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
            
            {}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-text-base text-bg-base text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-50">
              {option.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
