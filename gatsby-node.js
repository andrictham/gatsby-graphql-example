const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path');

// OBJECTIVE: Whenever a new “node” is created from a Markdown file, we want to bless it with some additional properties. For some reason, Gatsby won’t give it to us automatically, so we need to do some magic here to get its file name and store it as a “slug” for use later.

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
// `node` and `getNode` let us access information about the node that was created, such as its type and its relative path.

  // “Bound Action Creators” are functions Gatbsy gives us for free, which create and dispatch Redux actions when called, that let us manipulate state on our site. https://www.gatsbyjs.org/docs/bound-action-creators/

  // Let’s pull out createNodeField, which lets us modify the node that was just created.
  const { createNodeField } = boundActionCreators

  // Select nodes only if it was created by MarkdownRemark (meaning it was a Markdown file)
  if (node.internal.type === `MarkdownRemark`) {

    // `createFilePath` helps us pull off a part of a file path that we want (the slug). For example, `/pages/article.md`. We want `article`.
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    // Add a new field to the node that was created (in this case, our Markdown file), with the name of “slug”, and pass in the slug we parsed from the node’s file path.
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// OBJECTIVE: Now that we have the “slug” of the Markdown file, we want to create pages from it programmatically. That means, for every Markdown file MarkdownRemark detects, we want Gatsby to generate a page from its contents. We have to supply it a template of course, to be rendered to.

exports.createPages = ({ graphql, boundActionCreators }) => {
  // Later in the lifecycle, after nodes have been created, we can create our pages. We can access our Markdown nodes now (they will have a `slug` field) and create pages from them.

  // Let’s pull out createPage, which lets us, well, create pages.
  const { createPage } = boundActionCreators

  // Query our nodes, then do something with them
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.map(({node}) => {
        // Let’s create a page for every MarkdownRemark node we find.
        createPage({
          path: node.fields.slug, // Create page with this path
          component: path.resolve(`./src/templates/blog-post.js`), // Use this React component as a template
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
