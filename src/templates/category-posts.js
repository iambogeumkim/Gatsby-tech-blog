import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Bio from "../components/bio";
import { graphql } from "gatsby";

const CategoryPost = ({ data, location, pageContext }) => {
  const { category } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.nodes;
  const categories = data.categoryData.categoryList;
  const [numPostsToShow, setNumPostsToShow] = useState(3);

  // 문자열을 slug 형태로 변환하는 함수
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-');

  return (
    <Layout location={location} title={siteTitle}>
      <div className="blog-index-wrapper">
        {/* 상단 제목 */}
        <h1 className="blog-main-title">{category || "All posts"}</h1>

        {/* 카테고리 내비게이션 */}
        <nav className="blog-category-nav">
          <Link to="/" className="category-btn">
            All Posts
          </Link>
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/${slugify(cat)}/`}
              className={`category-btn ${cat === category ? 'category-btn--active' : ''}`}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* 리스트 형태로 글 출력 */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.slice(0, numPostsToShow).map(post => {
            const title = post.frontmatter.title || post.fields.slug;
            const description = post.frontmatter.description;
            const thumbnail = post.frontmatter.thumbnail || "/images/post_thumbnail.png";
            
            return (
              <li key={post.fields.slug}>
                <Link to={post.fields.slug} className="preview-card">
                  <div className="preview-thumb-wrapper">
                    <img src={thumbnail} alt={title} className="preview-thumb" />
                  </div>
                  <div className="preview-text">
                    <h2 className="preview-title">{title}</h2>
                    <div className="preview-desc">
                      {description || post.excerpt}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
        {numPostsToShow < posts.length && (
          <button className="load-more-btn" onClick={() => setNumPostsToShow(numPostsToShow + 3)}>
            More
          </button>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPost;

export const pageQuery = graphql`
  query($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    categoryData: allMarkdownRemark {
      categoryList: distinct(field: frontmatter___category)
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          thumbnail
          category
        }
      }
    }
  }
`
