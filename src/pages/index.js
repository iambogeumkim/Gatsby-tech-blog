import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  // Sort posts explicitly if needed, though query handles it
  
  return (
    <Layout location={location} title={siteTitle} currentFileName="README.md">
      <Seo title="Home" />
      {/* Padding reduced from '20px 40px' to '20px' */}
      <div className="vscode-readme-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '20px' }}>
            <h1 style={{ 
                fontSize: '2.5rem', 
                borderBottom: 'none', 
                marginBottom: '10px', 
                fontWeight: 'bold',
                color: 'var(--vscode-fg)' 
            }}>
                Gold Vibes Only <span role="img" aria-label="wave">👋</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--vscode-fg-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
                Welcome to my tech blog. Here I document my learning journey, errors, and insights.
            </p>
        </div>

        {/* Recent Posts Section */}
        <h2 style={{ 
            borderBottom: '1px solid var(--vscode-border)', 
            paddingBottom: '10px', 
            marginBottom: '10px',
            marginTop: '0',
            color: 'var(--vscode-fg)'
        }}>
            Latest Posts
        </h2>

        <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--vscode-fg-secondary)', 
            lineHeight: '1.6', 
            marginTop: '0',
            marginBottom: '20px' 
        }}>
            This section will be updated periodically.
        </p>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <li key={post.fields.slug} style={{ marginBottom: '12px', display: 'flex', alignItems: 'baseline' }}>
                <span style={{ 
                    color: 'var(--vscode-fg-secondary)', 
                    fontFamily: 'monospace', 
                    marginRight: '15px', 
                    minWidth: '140px',
                    fontSize: '0.9rem'
                }}>
                    - [{post.frontmatter.date}]
                </span>
                <Link to={post.fields.slug} style={{ 
                    textDecoration: 'none', 
                    color: 'var(--vscode-accent)',
                    fontSize: '1rem'
                }}>
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>

      </div>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 7) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          description
          category
        }
      }
    }
  }
`
