import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Giscus from "../components/Giscus"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const tocHeadings = post.headings.filter(heading => heading.depth <= 2)

  return (
    <Layout 
        location={location} 
        title={siteTitle}
        currentFileName={post.frontmatter.title + ".md"}
        category={post.frontmatter.category || "Uncategorized"}
    >
      {/* Wrapper for centering content and positioning minimap relative to it */}
      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Main Content Area */}
          <div className="vscode-readme-container" style={{ padding: '20px' }}>
            
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 itemProp="headline" style={{ 
                        fontSize: '2.5rem', 
                        borderBottom: 'none', 
                        marginBottom: '10px', 
                        marginTop: '0',
                        fontWeight: 'bold', 
                        color: 'var(--vscode-fg)' 
                    }}>
                        {post.frontmatter.title}
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'var(--vscode-fg-secondary)', marginBottom: '40px' }}>
                        {post.frontmatter.date}
                    </p>
                </header>

                <section
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                />
                
                {/* Footer Navigation as Python Code */}
                <nav className="blog-post-nav" style={{ marginTop: '60px', marginBottom: '40px' }}>
                    <div style={{color: 'var(--vscode-fg)'}}><span className="variable">navigation</span> = {'{'}</div>
                    {previous && (
                        <div className="indent">
                            <span className="meta-string">"previous"</span>: <Link to={previous.fields.slug} rel="prev" style={{color: 'var(--vscode-accent)'}}>"{previous.frontmatter.title}"</Link>,
                        </div>
                    )}
                    {next && (
                        <div className="indent">
                            <span className="meta-string">"next"</span>: <Link to={next.fields.slug} rel="next" style={{color: 'var(--vscode-accent)'}}>"{next.frontmatter.title}"</Link>
                        </div>
                    )}
                    <div style={{color: 'var(--vscode-fg)'}}>{'}'}</div>
                </nav>
            </article>

            {/* Comments Section */}
            <div style={{ marginTop: '20px' }}>
                <Giscus />
            </div>

          </div>

          {/* Minimap Sidebar - Positioned absolute to the right of the content */}
          <aside 
            className="vscode-minimap-toc" 
            style={{
                position: 'fixed', // Use fixed to stay on screen
                left: '50%', // Center base
                marginLeft: '520px', // 1000px/2 + 20px padding
                top: '100px',
                width: '200px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                display: 'none', // Hidden by default on small screens
                '@media (minWidth: 1500px)': { // This needs to be handled by CSS or logic
                    display: 'block'
                }
            }}
          >
             {/* Note: Inline media queries don't work in React style prop. 
                 We'll rely on the class 'vscode-minimap-toc' and add specific overrides if needed.
                 Or better, just use the class and add a style block for positioning.
             */}
             <style>{`
                @media (min-width: 1450px) {
                    .vscode-minimap-toc-container {
                        display: block !important;
                    }
                }
                .vscode-minimap-toc-container {
                    display: none;
                    position: fixed;
                    top: 100px;
                    left: 50%;
                    margin-left: 520px; /* Half of 1000px content + gap */
                    width: 200px;
                }
             `}</style>
             
             <div className="vscode-minimap-toc-container">
                 <div className="minimap-title" style={{
                     fontSize: '0.8rem', 
                     fontWeight: 'bold', 
                     color: 'var(--vscode-fg-secondary)', 
                     marginBottom: '10px'
                 }}>OUTLINE</div>
                 <ul className="minimap-list" style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                  {tocHeadings.map((heading, idx) => (
                    <li key={idx} className={`minimap-item depth-${heading.depth}`} style={{ marginBottom: '4px', paddingLeft: heading.depth > 1 ? '10px' : '0' }}>
                      <a href={`#${heading.id}`} style={{ textDecoration: 'none', color: 'var(--vscode-fg-secondary)', opacity: 0.8 }}>
                        {heading.value}
                      </a>
                    </li>
                  ))}
                </ul>
             </div>
          </aside>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => (
  <Seo
    title={post.frontmatter.title}
    description={post.frontmatter.description || post.excerpt}
  />
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
      }
      headings {
        depth
        value
        id
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
