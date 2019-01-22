import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../layouts/Layout'

const link = css`
  color: rgba(0, 0, 0, 0.65);
`

// add helmet
export default function ({
  data: {
    collections: { name, level, urls, tags, suggestions }
  }
}) {
  return (
    <Layout>
      <main>
        <h1>{name}</h1>
        <ul>
          {urls.map(({ id, url, type }) => (
            <li key={id}>
              <a
                css={link}
                href={url}
                rel='noopener noreferrer'
                target='_blank'
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      name
      level
      urls {
        id
        url
        type
      }
      tags
      suggestions
    }
  }
`
