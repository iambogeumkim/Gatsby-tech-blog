/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: ASC } }, limit: 1000
        ) {
          categoryList: distinct(field: frontmatter___category)
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              category
            }
          }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const currentCategory = post.frontmatter.category

      // 같은 카테고리의 이전 글 찾기
      let previousPostId = null
      for (let i = index - 1; i >= 0; i--) {
        if (posts[i].frontmatter.category === currentCategory) {
          previousPostId = posts[i].id
          break
        }
      }

      // 같은 카테고리의 다음 글 찾기
      let nextPostId = null
      for (let i = index + 1; i < posts.length; i++) {
        if (posts[i].frontmatter.category === currentCategory) {
          nextPostId = posts[i].id
          break
        }
      }

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Create category pages
  const categoryPosts = path.resolve(`./src/templates/category-posts.js`)

  // Get the list of categories from the GraphQL query
  const categories = result.data.allMarkdownRemark.categoryList
  const slugify = str => str.toLowerCase().replace(/\s+/g, '-');
  categories.forEach(category => {
    createPage({
      path: `/${slugify(category)}/`,
      component: categoryPosts,
      context: { category },
    });
  });
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      category: String
      thumbnail: String
    }

    type Fields {
      slug: String
    }
  `)
}
