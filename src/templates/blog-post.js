import * as React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Giscus from "../components/Giscus"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const tocHeadings = post.headings.filter(heading => heading.depth <= 2)

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="post-outer-wrapper" style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* 본문 박스만큼만 max-width! */}
        <div className="post-main-area" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header className="post-header">
              <h1 className="post-title" itemProp="headline">{post.frontmatter.title}</h1>
              <div className="post-meta">{post.frontmatter.date}</div>
            </header>
            <section
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />
            <footer>
              {/* 이전/다음 네비 */}
              <nav className="blog-post-nav">
                <ul style={{
                  display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`,
                  listStyle: `none`, padding: 0,
                }}>
                  <li>
                    {previous && (
                      <Link to={previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link to={next.fields.slug} rel="next">
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
              {/* 댓글 및 리액션 */}
              <Giscus />
            </footer>
          </article>
        </div>
        {/* TOC는 흰 박스 바깥 노란 영역에 위치 */}
        <aside className="sidebar-toc-fixed"
          style={{
            top: 0,
            left: 'calc(50% + 400px)', // 800px/2 + offset
            marginLeft: '24px',
            width: '280px',
            minHeight: '160px',
            boxSizing: 'border-box',
            background: 'transparent',
            padding: '26px 18px 10px 10px',
            zIndex: 2,
          }}
        >
          <nav className="sidebar-toc">
            <h4 className="toc-title">📌 Table of Contents</h4>
            <ul className="toc-list">
              {tocHeadings.map((heading, idx) => (
                <li key={idx} className={`toc-item toc-depth-${heading.depth}`}>
                  <a 
                    href={`#${heading.id}`}
                    className="toc-link"
                  >
                    {heading.value}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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
