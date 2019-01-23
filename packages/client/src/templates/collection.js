import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../layouts/Layout'
import { baseWrapper } from '../styles'

const link = theme => css`
  color: ${theme.colors.gray700};
`

// TODO: add helmet
// udacity dribbble

export default function ({
  data: {
    collections: { name, level, urls, tags, suggestions }
  }
}) {
  return (
    <Layout>
      <main>
        <div css={baseWrapper}>
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
        </div>
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
