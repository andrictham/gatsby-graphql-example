const { createFilePath } = require(`gatsby-source-filesystem`)

// OBJECTIVE: Whenever a new “node” is created from a Markdown file, we want to bless it with some additional properties. For some reason, Gatsby won’t give it to us automatically, so we need to do some magic here to get its file name and store it as a “slug” for use later.

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
// `node` and `getNode` let us access information about the node that was created, such as its type and its relative path.

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
