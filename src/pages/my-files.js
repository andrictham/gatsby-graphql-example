import React from 'react'

export default ({data}) => {
  console.log(data)
  return (
    <div>
      <h1>My Site’s Files</h1>
      <table>
        <thead>
          <tr>
            <th>Relative Path</th>
            <th>Pretty Size</th>
            <th>Extension</th>
            <th>Birth Time</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map( ({ node }) =>
            <tr key={node.id}>
              <td>{node.relativePath}</td>
              <td>{node.prettySize}</td>
              <td>{node.extension}</td>
              <td>{node.birthTime}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export const query = graphql`
  query MyFilesQuery {
    allFile {
      edges {
        node {
          id
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
