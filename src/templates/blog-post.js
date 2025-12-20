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
