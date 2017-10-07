import React from 'react'

export default (props) =>
  <div>
    <h1>About {props.data.site.siteMetadata.title}</h1>
    <p>
      We’re the only site running on your computer dedicated to  showing phoos and videos of pandas eating lots of food.
    </p>
  </div>

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
