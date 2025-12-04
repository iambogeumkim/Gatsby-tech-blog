import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [numPostsToShow, setNumPostsToShow] = React.useState(6)
  const posts = data.allMarkdownRemark.nodes
  const categories = data.allMarkdownRemark.categoryList

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        {/* <Bio /> */}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  // 문자열을 slug 형태로 변환하는 함수
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-')

  return (
    <Layout location={location} title={siteTitle}>
      <Seo />
      <div className="blog-index-wrapper">
        {/* 큰 제목 */}
        <h1 className="blog-main-title">All posts</h1>

        {/* 카테고리 내비게이션 */}
        <nav className="blog-category-nav">
          {categories.map(category => (
            <Link
              key={category}
              to={`/${slugify(category)}/`}
              className="category-btn"
              activeClassName="category-btn--active"
            >
              {category}
            </Link>
          ))}
        </nav>

        {/* 카드 그리드로 글 리스트 출력 */}
        <div className="blog-card-grid">
          {posts.slice(0, numPostsToShow).map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <Link to={post.fields.slug} key={post.fields.slug} className="blog-card">
                {post.frontmatter.thumbnail && (
                  <img
                    src={post.frontmatter.thumbnail}
                    alt={title}
                    className="blog-card-thumb"
                  />
                )}
                <div className="blog-card-title">{title}</div>
                <div className="blog-card-summary">
                  {post.frontmatter.description
                    ? post.frontmatter.description
                    : post.excerpt}
                </div>
              </Link>
            )
          })}
        </div>
        {numPostsToShow < posts.length && (
          <button className="load-more-btn" onClick={() => setNumPostsToShow(posts.length)}>
            더 보기
          </button>
        )}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      categoryList: distinct(field: frontmatter___category)
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          category
        }
      }
    }
  }
`