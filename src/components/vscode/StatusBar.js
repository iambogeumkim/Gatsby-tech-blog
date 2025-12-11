import React from "react"

const StatusBar = () => {
  return (
    <div className="vscode-status-bar">
      <div style={{ display: 'flex' }}>
        <div className="vscode-status-item">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: 4 }}>
            <path d="M10 12a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-4-8a2 2 0 1 1-2-2 2 2 0 0 1 2 2zM4 6h2v4H4z"/>
          </svg>
          main
        </div>
        <div className="vscode-status-item">
            0 errors, 0 warnings
        </div>
      </div>
      <div style={{ display: 'flex' }}>
         <div className="vscode-status-item">
             Ln 1, Col 1
         </div>
         <div className="vscode-status-item">
             UTF-8
         </div>
         <div className="vscode-status-item">
             Python
         </div>
         <div className="vscode-status-item">
            3.14.2 64-bit
         </div>
      </div>
    </div>
  )
}

export default StatusBar
