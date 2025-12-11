import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"
import { VscFiles, VscSearch, VscSourceControl, VscAccount, VscSettingsGear, VscColorMode, VscGithub, VscGlobe } from "react-icons/vsc"
import { SiLinkedin } from "react-icons/si"

const ActivityBar = ({ onToggleSidebar, isSidebarVisible, activeView, onActiveViewChange }) => {
  // Default to false (Light Mode)
  const [darkMode, setDarkMode] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null) // 'account', 'settings', or null
  const accountRef = useRef(null)
  const settingsRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved === "true") {
      setDarkMode(true)
      document.body.classList.add("dark-mode")
    } else {
      setDarkMode(false)
      document.body.classList.remove("dark-mode")
    }

    // Close menus when clicking outside
    const handleClickOutside = (event) => {
        if (
            accountRef.current && !accountRef.current.contains(event.target) &&
            settingsRef.current && !settingsRef.current.contains(event.target)
        ) {
            setActiveMenu(null);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  const handleToggleTheme = () => {
    const newVal = !darkMode
    setDarkMode(newVal)
    if (newVal) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("darkMode", "true")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("darkMode", "false")
    }
    setActiveMenu(null); // Close menu after selection
  }

  const toggleMenu = (menuName) => {
      if (activeMenu === menuName) {
          setActiveMenu(null);
      } else {
          setActiveMenu(menuName);
      }
  }

  const handleIconClick = (viewName) => {
      // If we are clicking the same active view, toggle visibility
      if (activeView === viewName) {
          onToggleSidebar();
      } else {
          // If different view, ensure sidebar is open and switch view
          if (!isSidebarVisible) {
              onToggleSidebar();
          }
          onActiveViewChange(viewName);
      }
  }

  return (
    <div className="vscode-activity-bar">
      <div 
        className={`vscode-activity-icon ${isSidebarVisible && activeView === 'explorer' ? 'active' : ''}`} 
        title="Explorer"
        onClick={() => handleIconClick('explorer')}
      >
        <VscFiles size={24} />
      </div>
      <div 
        className={`vscode-activity-icon ${isSidebarVisible && activeView === 'search' ? 'active' : ''}`} 
        title="Search"
        onClick={() => handleIconClick('search')}
      >
         <VscSearch size={24} />
      </div>
      <div className="vscode-activity-icon" title="Source Control">
        <VscSourceControl size={24} />
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        
        {/* Account Icon & Menu */}
        <div 
            className={`vscode-activity-icon ${activeMenu === 'account' ? 'active' : ''}`} 
            title="Accounts" 
            onClick={() => toggleMenu('account')}
            ref={accountRef}
        >
            <VscAccount size={24} />
        </div>
        {activeMenu === 'account' && (
            <div className="vscode-context-menu account-menu" ref={accountRef}>
                <a href="https://github.com/iambogeumkim" target="_blank" rel="noopener noreferrer" className="vscode-context-menu-item">
                    <VscGithub size={16} /> GitHub
                </a>
                <a href="https://linkedin.com/in/iambogeumkim" target="_blank" rel="noopener noreferrer" className="vscode-context-menu-item">
                    <SiLinkedin size={14} /> LinkedIn
                </a>
                <div className="vscode-context-menu-separator"></div>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="vscode-context-menu-item">
                    <VscFiles size={16} /> Resume
                </a>
            </div>
        )}

        {/* Settings Icon & Menu */}
        <div 
            className={`vscode-activity-icon ${activeMenu === 'settings' ? 'active' : ''}`} 
            title="Manage" 
            onClick={() => toggleMenu('settings')}
            ref={settingsRef}
        >
             <VscSettingsGear size={24} />
        </div>
        {activeMenu === 'settings' && (
            <div className="vscode-context-menu settings-menu" ref={settingsRef}>
                <div className="vscode-context-menu-item" onClick={handleToggleTheme}>
                    <VscColorMode size={16} /> {darkMode ? "Light" : "Dark"}
                </div>
                {/* Add more settings if needed */}
            </div>
        )}
      </div>
    </div>
  )
}

export default ActivityBar
