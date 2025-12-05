import React, { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved === "true") {
      setDarkMode(true)
      document.body.classList.add("dark-mode")
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("darkMode", "true")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode])

  const handleToggle = () => setDarkMode((prev) => !prev)

  return (
    <button
      className="theme-toggle-btn icon-square-btn"
      onClick={handleToggle}
      aria-label="다크모드 토글"
      type="button"
    >
      <span role="img" aria-label={darkMode ? "Moon" : "Sun"}>
        {darkMode ? "🌞" : "🌙"}
      </span>
    </button>
  )
}

export default ThemeToggle