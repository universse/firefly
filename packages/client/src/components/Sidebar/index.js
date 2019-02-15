import React, { createContext } from 'react'

import CategoryFilter from 'components/CategoryFilter'
import TagFilter from 'components/TagFilter'
import { Wrapper } from './styled'

export const URLUtilsContext = createContext()

export default function Sidebar ({ aggregatedTags }) {
  return (
    <Wrapper>
      <CategoryFilter />
      <TagFilter aggregatedTags={aggregatedTags} />
    </Wrapper>
  )
}
