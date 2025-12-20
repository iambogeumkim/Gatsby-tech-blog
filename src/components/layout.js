import * as React from "react"
import { Link } from "gatsby"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import { VscClose, VscInfo, VscFileMedia } from "react-icons/vsc"
import { SiPython } from "react-icons/si"
import TitleBar from "./vscode/TitleBar"
import ActivityBar from "./vscode/ActivityBar"
import Sidebar from "./vscode/Sidebar"
import StatusBar from "./vscode/StatusBar"
import { useSidebar } from "../context/SidebarContext"
import "../styles/vscode.css"

deckDeckGoHighlightElement();

const Layout = ({ location, title, children, currentFileName: propFileName, category }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  
  // Context for Sidebar & Tabs
  const { openTabs, addTab, closeTab } = useSidebar()

  // Sidebar State (Local UI state like width/visibility)
  const [sidebarWidth, setSidebarWidth] = React.useState(250)
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true)
  const [activeSidebarView, setActiveSidebarView] = React.useState('explorer') // 'explorer' | 'search'
  const isResizing = React.useRef(false)

  React.useEffect(() => {
    document.body.classList.add('vscode-theme');
    return () => {
      document.body.classList.remove('vscode-theme');
    }
  }, []);

  // Define Icons first
  const HashtagIcon = () => (
    <span style={{ 
      color: '#3b82f6', 
      fontWeight: 'bold', 
      fontSize: '15px', 
      marginRight: '4px', // Reduced from 6px
      display: 'inline-block',
      lineHeight: '1'
    }}>#</span>
  )

  const InfoIcon = () => (
      <VscInfo style={{
          color: '#3b82f6',
          fontSize: '16px',
          marginRight: '4px', // Reduced from 6px
          display: 'inline-block',
          verticalAlign: 'middle'
      }} />
  )

  const ImageIcon = () => (
      <VscFileMedia style={{
          color: '#e37933', 
          fontSize: '16px',
          marginRight: '4px', // Reduced from 6px
          display: 'inline-block',
          verticalAlign: 'middle'
      }} />
  )

  // --- Determine Current File Info ---
  let displayFileName = "index.py";
  let breadcrumbsPath = "";
  let fileType = "md";

  if (isRootPath) {
      displayFileName = "README.md"; 
      breadcrumbsPath = (
          <div style={{display: 'flex', alignItems: 'center'}}>
              <InfoIcon /> README.md
          </div>
      );
  } else if (location.pathname.includes('about')) {
      displayFileName = "about.py";
      fileType = "py";
      breadcrumbsPath = "src > pages > about.py";
  } else {
      // Blog Post or Preview
      if (propFileName) {
          displayFileName = propFileName;
      } else {
          const slug = location.pathname.replace(/\/$/, '').split('/').pop();
          displayFileName = slug ? `${slug}.md` : "index.py";
      }

      const isPreview = location.pathname.startsWith('/preview');

      // Construct breadcrumbs
      if (isPreview) {
          breadcrumbsPath = `static > timeline > ${displayFileName}`;
      } else if (category) {
          breadcrumbsPath = `src > content > blog > ${category} > ${displayFileName}`;
      } else {
          breadcrumbsPath = `src > content > blog > ${displayFileName}`;
      }
  }

  // --- Check if Image File ---
  // Fix: Do not treat /preview page as a direct image file in Layout. 
  // PreviewPage handles the image rendering.
  const isPreviewPage = location.pathname.startsWith('/preview');
  const isImageFile = !isPreviewPage && (location.pathname.match(/\.(png|jpg|jpeg|gif|svg)$/i) || 
                      (displayFileName && displayFileName.match(/\.(png|jpg|jpeg|gif|svg)$/i)));


  // --- Sync Current Page to Open Tabs ---
  React.useEffect(() => {
      // Use pathname + search for unique tab identification (especially for preview page)
      const currentPath = location.pathname + location.search; 
      addTab({
          path: currentPath,
          title: displayFileName,
          type: isImageFile || isPreviewPage ? 'img' : fileType 
      })
  }, [location.pathname, location.search, displayFileName, fileType, addTab, isImageFile, isPreviewPage]);


  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  // Handle resizing
  const startResizing = React.useCallback((mouseDownEvent) => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (mouseMoveEvent) => {
      if (isResizing.current) {
        let newWidth = mouseMoveEvent.clientX - 48;
        if (newWidth < 150) newWidth = 150;
        if (newWidth > 600) newWidth = 600;
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);


  return (
    <div className="vscode-layout-container">
       <TitleBar />
       <div className="vscode-layout">
        <ActivityBar 
            onToggleSidebar={toggleSidebar} 
            isSidebarVisible={isSidebarVisible} 
            activeView={activeSidebarView}
            onActiveViewChange={setActiveSidebarView}
        />
        
        {isSidebarVisible && (
            <>
                <Sidebar width={sidebarWidth} view={activeSidebarView} />
                <div 
                    className="vscode-resizer" 
                    onMouseDown={startResizing}
                ></div>
            </>
        )}
        
        <div className="vscode-editor-area">
            {/* Dynamic Tabs Container */}
            <div className="vscode-tabs-container">
                {openTabs.map((tab) => {
                    const currentPath = location.pathname + location.search;
                    const isActive = currentPath === tab.path || 
                                     (tab.path !== '/' && currentPath.startsWith(tab.path) && tab.path !== '/preview'); // Extra check to prevent /preview prefix match if exact match exists
                    
                    // Determine Icon
                    let TabIcon = HashtagIcon;
                    if (tab.title === 'README.md') TabIcon = InfoIcon;
                    else if (tab.type === 'py') TabIcon = () => <SiPython className="icon-python" style={{marginRight: '4px'}} />;
                    else if (tab.type === 'img' || (tab.title && tab.title.match(/\.(png|jpg|jpeg|gif|svg)$/i))) TabIcon = ImageIcon;

                        return (
                        <Link 
                            to={tab.path} 
                            key={tab.path}
                            className={`vscode-tab ${isActive ? 'active' : ''}`}
                            style={{textDecoration: 'none', gap: '4px'}} 
                        >
                            <TabIcon />
                            
                            <span className="vscode-tab-title" title={tab.title}>
                                {tab.title}
                            </span>
                            
                            {/* Close Button */}
                            <span 
                                className="tab-close-btn"
                                onClick={(e) => closeTab(e, tab.path, location.pathname + location.search)}
                                style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', flexShrink: 0}}
                            >
                                <VscClose />
                            </span>
                        </Link>
                    )
                })}
            </div>
            
            <div className="vscode-breadcrumbs">
                {breadcrumbsPath}
            </div>

            <div className="vscode-editor-content">
                {isImageFile ? (
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '100%', 
                        backgroundColor: 'var(--vscode-bg)'
                    }}>
                        <img 
                            src={location.pathname} 
                            alt={displayFileName} 
                            style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} 
                        />
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
        
        </div>
        <StatusBar />
    </div>
  )
}

export default Layout
