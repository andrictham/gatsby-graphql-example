import React from 'react'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <div>
      <h1>
        {post.frontmatter.title}
      </h1>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
  )
}

// http://graphql.org/learn/queries/
// $slug is a variable that we passed in as context
// `eq` is a GraphQL operator meaning “equal”

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
