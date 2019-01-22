import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'

import ArticleLayout from '../layouts/ArticleLayout'
import { outline3API } from '../services/outline'
// import { mercuryAPI, mercuryConfig } from '../services/mercury'

export default function ({
  data: {
    urls: { url }
  }
}) {
  const [html, setHTML] = useState('')
  const [title, setTitle] = useState()

  const parseUrl = async url => {
    const res = await fetch(`${outline3API}${url}`)
    const {
      data: { title, html }
    } = await res.json()
    setTitle(title)
    setHTML(html)
  }

  useEffect(() => {
    parseUrl(url)
  }, [])

  return (
    <ArticleLayout>
      {!html.startsWith('<h1>') && <h1>{title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </ArticleLayout>
  )
}

export const query = graphql`
  query($id: String!) {
    urls(id: { eq: $id }) {
      url
    }
  }
`
