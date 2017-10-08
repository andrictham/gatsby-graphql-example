import React from 'react'
import g from 'glamorous'
import { css } from 'glamor'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'

const linkStyle = css({
  marginRight: `1rem`
})

export default ({ children, data }) =>
  <div>
    <g.Div
      margin={`0 auto`}
      maxWidth={700}
      padding={rhythm(2)}
      paddingTop={rhythm(1.5)}
      paddingBottom={rhythm(1)}
      display={`flex`}
      flexDirection={`row`}
      justifyContent={`space-between`}
    >
      <Link to={'/'}>
        <g.H3
          marginBottom={rhythm(2)}
          display={`inline-block`}
          fontStyle={`normal`}
        >
          {data.site.siteMetadata.title}
        </g.H3>
      </Link>
      <div>
        <Link className={linkStyle} to={`/about`}>
          About
        </Link>
        <Link className={linkStyle} to={`/my-files`}>
          Files
        </Link>
      </div>
    </g.Div>
    <g.Div
      margin={`0 auto`}
      maxWidth={700}
      padding={rhythm(2)}
      paddingTop={0}
    >
      {children()}
    </g.Div>
  </div>

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
