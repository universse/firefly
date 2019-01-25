import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { ThemeContext, css } from '@emotion/core'

export function Category ({ category, to }) {
  const theme = useContext(ThemeContext)

  return (
    <Link
      activeStyle={{
        borderLeft: `4px solid ${theme.colors.brand500}`,
        color: `${theme.colors.brand500}`,
        fontWeight: 700
      }}
      css={theme => css`
        align-items: center;
        border-left: 4px solid transparent;
        color: ${theme.colors.gray900};
        display: inline-flex;
        height: 2rem;
        margin: 0.25rem 0;
        padding-left: 1rem;
        text-transform: capitalize;

        :hover {
          color: ${theme.colors.brand500};
          border-left: 4px solid ${theme.colors.brand500};
        }
      `}
      to={to}
    >
      {category}
    </Link>
  )
}
