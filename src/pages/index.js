import React from "react"
import g from 'glamorous'
import Pluralize from 'react-pluralize'

import { rhythm } from '../utils/typography'

export default ({ data }) =>
  <div>
    <g.H1 display={"inline-block"}>
      Amazing Pandas Eating Things
    </g.H1>
    <g.H4 paddingBottom={rhythm(2)}>
      <Pluralize singular="post" plural="posts" count={data.allMarkdownRemark.totalCount} />
    </g.H4>
    {data.allMarkdownRemark.edges.map( ({ node }) =>
      <g.Div key={node.id} marginBottom={rhythm(1)} borderBottom={"1px solid #DDDDDD"}>
        <g.H3>
          {node.frontmatter.title}{" "}
          <g.Span color="#999999">– {node.frontmatter.date}</g.Span>
        </g.H3>
        <g.P>
          {node.excerpt} <br/>
        </g.P>
        <g.P color="#999999">
          {node.timeToRead} minute read
        </g.P>
      </g.Div>
    )}
  </div>

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {
      fields: [frontmatter___date],
      order: DESC
    }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`
