import React from "react"
import { VscSearch } from "react-icons/vsc"

const TitleBar = () => {
  return (
    <div className="vscode-title-bar">
      {/* Window Controls (Mac Style) */}
      <div className="vscode-window-controls">
        <div className="window-control close"></div>
        <div className="window-control minimize"></div>
        <div className="window-control maximize"></div>
      </div>

      {/* Navigation Arrows */}
      <div className="vscode-nav-arrows">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{opacity: 0.5}}>
            <path d="M10.5 13.5l-6-6 6-6 .7.7-5.3 5.3 5.3 5.3z"/>
         </svg>
         <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{opacity: 0.5}}>
             <path d="M5.5 13.5l6-6-6-6-.7.7 5.3 5.3-5.3 5.3z"/>
         </svg>
      </div>

      {/* Search Bar (Command Palette) */}
      <div className="vscode-search-bar">
        <VscSearch size={12} className="search-icon" />
        <span>GOLD-VIBES-ONLY</span>
      </div>

       {/* Right Layout Controls - Removed as requested */}
       <div className="vscode-layout-controls">
           {/* Empty div to maintain flex spacing if needed, or remove completely */}
       </div>
    </div>
  )
}

export default TitleBar
