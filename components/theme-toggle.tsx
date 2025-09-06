// ThemeToggle.tsx
"use client"
import React, { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // On mount, check localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Update theme and localStorage on toggle
  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      setIsDark(true)
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <label className="inline-flex items-center cursor-pointer space-x-3">
      <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="toggle-checkbox hidden"
        id="theme-toggle"
      />
      <div className="toggle-slider w-10 h-5 bg-gray-300 rounded-full relative transition-colors dark:bg-gray-600">
        <div
          className={`dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  )
}
