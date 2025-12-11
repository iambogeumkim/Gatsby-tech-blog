import React, { createContext, useState, useContext } from 'react'
import { navigate } from "gatsby"

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
  // Initial open folders
  // Added 'timeline' to manage its state globally so it persists across navigations
  const [openFolders, setOpenFolders] = useState({
    'src': true,
    'content': true,
    'blog': true,
    'root': true,
    'pages': true,
    'timeline': false // Default closed
  })

  const toggleFolder = (folder) => {
    setOpenFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }))
  }

  // Tabs State: Array of objects { path, title, type }
  // path should include query params for uniqueness
  const [openTabs, setOpenTabs] = useState([
    { path: '/', title: 'README.md', type: 'md' }
  ])

  // State to temporarily ignore a path from being re-added
  // This prevents the active tab from being immediately re-added by Layout's useEffect
  // when we close it and navigate away.
  const [ignorePath, setIgnorePath] = useState(null)

  const addTab = (tab) => {
    // 1. If this path is currently ignored (just closed), do not add it.
    if (ignorePath && tab.path === ignorePath) {
        return;
    }

    // 2. If we are adding a DIFFERENT tab (meaning navigation completed), clear ignorePath.
    if (ignorePath && tab.path !== ignorePath) {
        setIgnorePath(null);
    }

    setOpenTabs(prev => {
      // Check if tab already exists
      const exists = prev.find(t => t.path === tab.path)
      if (exists) {
          // If title changed, update it
          if (exists.title !== tab.title || exists.type !== tab.type) {
              return prev.map(t => t.path === tab.path ? tab : t);
          }
          return prev;
      }
      return [...prev, tab]
    })
  }

  const closeTab = (e, pathToClose, currentPath) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Calculate new tabs
    const newTabs = openTabs.filter(tab => tab.path !== pathToClose)
    
    // 2. Determine if we need to navigate (if closing active tab)
    const shouldNavigate = pathToClose === currentPath;

    // 3. Update State
    if (shouldNavigate) {
         setIgnorePath(pathToClose); // Prevent re-adding this tab immediately
         
         if (newTabs.length === 0) {
             setOpenTabs([{ path: '/', title: 'README.md', type: 'md' }]);
         } else {
             setOpenTabs(newTabs);
         }
    } else {
         setOpenTabs(newTabs);
    }

    // 4. Navigate
    if (shouldNavigate) {
        // Use setTimeout to allow state updates to settle before navigation triggers re-renders
        setTimeout(() => {
            if (newTabs.length > 0) {
                const lastTab = newTabs[newTabs.length - 1]
                navigate(lastTab.path)
            } else {
                navigate('/')
            }
        }, 0);
    }
  }

  return (
    <SidebarContext.Provider value={{ 
        openFolders, toggleFolder,
        openTabs, addTab, closeTab
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
