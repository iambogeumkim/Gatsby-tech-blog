import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { VscChevronRight, VscFolder, VscEllipsis, VscRefresh, VscListFlat, VscNewFile, VscInfo } from "react-icons/vsc"
import { useSidebar } from "../../context/SidebarContext"

const Sidebar = ({ width, view }) => { // view: 'explorer' | 'search'
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            category
          }
          id
          rawMarkdownBody
          excerpt(pruneLength: 200)
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "timeline" } }, sort: { fields: name, order: ASC }) {
        nodes {
          id
          name
          relativePath
          publicURL
          birthTime(formatString: "YYYY-MM-DD")
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes
  const timelineFiles = data.allFile.nodes
  
  // --- Explorer Logic ---
  const categories = {}
  posts.forEach(post => {
    const cat = post.frontmatter.category || "Uncategorized"
    if (!categories[cat]) {
      categories[cat] = []
    }
    categories[cat].push(post)
  })
  const sortedCategories = Object.keys(categories).sort()

  // Use global sidebar context for persistence
  const { openFolders, toggleFolder } = useSidebar()
  
  // Removed local sections state, use openFolders for timeline persistence
  // OUTLINE remains local as it's less critical, or can be added to context if needed.
  // Let's keep outline local for now or use openFolders['outline'] if we want consistency.
  // For simplicity and user request regarding timeline closing, we'll keep outline local but fix timeline.
  const [outlineOpen, setOutlineOpen] = useState(false);


  // --- Search Logic ---
  const [searchQuery, setSearchQuery] = useState("")
  
  const searchResults = useMemo(() => {
      if (!searchQuery) return [];
      const lowerQuery = searchQuery.toLowerCase();
      
      return posts.filter(post => {
          const titleMatch = post.frontmatter.title?.toLowerCase().includes(lowerQuery);
          const bodyMatch = post.rawMarkdownBody?.toLowerCase().includes(lowerQuery);
          return titleMatch || bodyMatch;
      }).map(post => {
          // Find snippet
          let snippet = "";
          if (post.rawMarkdownBody) {
              const lowerBody = post.rawMarkdownBody.toLowerCase();
              const idx = lowerBody.indexOf(lowerQuery);
              if (idx !== -1) {
                  const start = Math.max(0, idx - 20);
                  const end = Math.min(post.rawMarkdownBody.length, idx + 50);
                  snippet = "..." + post.rawMarkdownBody.substring(start, end).replace(/\n/g, ' ') + "...";
              }
          }
          return { ...post, snippet };
      });
  }, [searchQuery, posts]);


  // --- Helper Components ---
  const Arrow = ({ isOpen }) => (
    <span style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '16px', // Fixed width to match HashtagIcon
      height: '16px',
      marginRight: '6px', // Same margin as HashtagIcon
      flexShrink: 0,
      paddingLeft: '4px' // Shift arrow right to align with # icon visually
    }}>
      <VscChevronRight 
        style={{ 
          transform: isOpen ? 'rotate(90deg)' : 'none', 
          transition: 'transform 0.1s',
          fontSize: '12px'
        }} 
      />
    </span>
  )

  const HashtagIcon = () => (
    <span style={{ 
      color: '#3b82f6', 
      fontWeight: 'bold', 
      fontSize: '15px', 
      marginRight: '6px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '16px',
      height: '16px',
      fontFamily: 'Consolas, monospace',
      lineHeight: '1',
      flexShrink: 0
    }}>#</span>
  )

  const InfoIcon = () => (
      <VscInfo style={{
          color: '#3b82f6',
          fontSize: '16px',
          marginRight: '6px',
          flexShrink: 0
      }} />
  )


  // --- Render Views ---

  const renderExplorer = () => (
    <>
      <div className="vscode-sidebar-header">
        <span>EXPLORER</span>
        <span style={{ cursor: 'pointer' }}><VscEllipsis /></span>
      </div>
      
      {/* Project Section */}
      <div className="vscode-explorer-section">
        <div className="vscode-explorer-title" onClick={() => toggleFolder('root')}>
          <Arrow isOpen={openFolders['root'] !== false} />
          GOLD-VIBES-ONLY
        </div>
        
        {openFolders['root'] !== false && (
          <div className="vscode-file-tree">
            
            {/* Content Folder */}
             <div className="vscode-folder" onClick={() => toggleFolder('content')} style={{ paddingLeft: '20px' }}>
               <Arrow isOpen={openFolders['content']} />
               <VscFolder className="icon-margin" />
               content
            </div>

            {openFolders['content'] && (
                <div>
                     <div className="vscode-folder" onClick={() => toggleFolder('blog')} style={{ paddingLeft: '35px' }}>
                        <Arrow isOpen={openFolders['blog']} />
                        <VscFolder className="icon-margin" />
                        blog
                    </div>

                    {openFolders['blog'] && sortedCategories.map(category => (
                        <div key={category}>
                             <div className="vscode-folder" onClick={() => toggleFolder(category)} style={{ paddingLeft: '50px' }}>
                                <Arrow isOpen={!!openFolders[category]} />
                                <VscFolder className="icon-margin" />
                                {category}
                            </div>
                            
                            {!!openFolders[category] && categories[category].map(post => (
                                <Link 
                                    to={post.fields.slug} 
                                    key={post.id} 
                                    className="vscode-file-item"
                                    activeClassName="active"
                                    style={{ paddingLeft: '65px' }}
                                >
                                    <HashtagIcon />
                                    {post.frontmatter.title}.md
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            
            <Link to="/" className="vscode-file-item" style={{ paddingLeft: '20px' }}>
               <InfoIcon /> README.md
            </Link>
          </div>
        )}
      </div>

      {/* Timeline Section */}
      <div className="vscode-explorer-section">
          <div className="vscode-explorer-title" onClick={() => toggleFolder('timeline')}>
              <Arrow isOpen={openFolders['timeline']} />
              TIMELINE
          </div>
           {openFolders['timeline'] && (
               <div className="vscode-file-tree">
                   {timelineFiles.length > 0 ? timelineFiles.map(file => (
                       <Link 
                           to={`/preview?file=${file.publicURL}`} 
                           key={file.id} 
                           className="vscode-file-item" 
                           style={{paddingLeft: '20px'}}
                        >
                           <span style={{
                               display: 'inline-block', width: '9px', height: '9px', 
                               borderRadius: '50%', border: '2px solid var(--vscode-fg-secondary)', 
                               marginRight: '8px', flexShrink: 0
                           }}></span>
                           <span style={{color: 'var(--vscode-fg-secondary)', fontSize: '0.9em'}}>
                               {file.name.replace(/_/g, ' ')}
                           </span>
                       </Link>
                   )) : (
                       <div style={{padding: '5px 20px', color: 'var(--vscode-fg-secondary)', fontSize: '0.85em'}}>
                           No timeline images found
                       </div>
                   )}
               </div>
           )}
      </div>

      {/* Dummy Sections */}
      <div className="vscode-explorer-section">
          <div className="vscode-explorer-title" onClick={() => setOutlineOpen(!outlineOpen)}>
              <Arrow isOpen={outlineOpen} />
              OUTLINE
          </div>
          {outlineOpen && <div style={{padding: '10px', fontSize: '0.8rem', color: 'var(--vscode-fg-secondary)'}}>No symbols found</div>}
      </div>
    </>
  )

  const renderSearch = () => (
      <div className="vscode-search-container">
          <div className="vscode-search-header">
              <div className="vscode-search-title-row">
                  <span>SEARCH</span>
                  <div style={{display:'flex', gap: 6}}>
                      <VscRefresh style={{cursor:'pointer'}} />
                      <VscListFlat style={{cursor:'pointer'}} />
                      <VscNewFile style={{cursor:'pointer'}} />
                  </div>
              </div>
              <div className="vscode-search-input-wrapper">
                  <input 
                    type="text" 
                    className="vscode-search-input" 
                    placeholder="Search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
              </div>
          </div>
          
          {searchQuery && (
              <div className="vscode-search-summary">
                  {searchResults.length} results in {searchResults.length} files
              </div>
          )}

          <div className="vscode-search-results">
              {searchResults.map(post => (
                  <div key={post.id} className="vscode-search-result-item">
                       <Link to={post.fields.slug} style={{textDecoration:'none', color: 'inherit'}}>
                            <div className="vscode-search-file-header">
                                <Arrow isOpen={true} />
                                <HashtagIcon />
                                <span style={{marginLeft: 4}}>{post.frontmatter.title}.md</span>
                                <span style={{marginLeft: 6, fontSize: '0.75rem', color: 'var(--vscode-fg-secondary)'}}>
                                    src/content/blog/{post.frontmatter.category}
                                </span>
                            </div>
                       </Link>
                       {post.snippet && (
                           <Link to={post.fields.slug} style={{textDecoration:'none'}}>
                                <div className="vscode-search-match">
                                    {post.snippet}
                                </div>
                           </Link>
                       )}
                  </div>
              ))}
              {searchQuery && searchResults.length === 0 && (
                  <div style={{padding: '20px', textAlign: 'center', color: 'var(--vscode-fg-secondary)', fontSize: '0.85rem'}}>
                      No results found
                  </div>
              )}
          </div>
      </div>
  )

  return (
    <div className="vscode-sidebar" style={{ width: width }}>
       {view === 'search' ? renderSearch() : renderExplorer()}
    </div>
  )
}

export default Sidebar
