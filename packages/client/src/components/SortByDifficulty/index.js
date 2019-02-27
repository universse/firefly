import React, { useCallback, useContext } from 'react'
import { css } from '@emotion/core'
import Downshift from 'downshift'

import { URLUtilsContext } from 'pages'
import {
  Item,
  Label,
  OptionList,
  Root,
  SortButton,
  SortOption,
  ToggleButton,
  TogglerValue
} from './styled'
import SortOptions from 'constants/SortOptions'
import { ChevronDown } from 'icons'

export default function SortByDifficulty ({ sort }) {
  const { onSortClick } = useContext(URLUtilsContext)

  const handleChange = useCallback(({ value }) => onSortClick(value), [
    onSortClick
  ])

  return (
    <Downshift
      initialSelectedItem={SortOptions.find(({ value }) => value === sort)}
      itemToString={({ value }) => value}
      onChange={handleChange}
    >
      {({
        getToggleButtonProps,
        getItemProps,
        getLabelProps,
        getRootProps,
        highlightedIndex,
        isOpen,
        selectItem,
        selectedItem
      }) => (
        <Root {...getRootProps({ refKey: 'innerRef' })}>
          <div
            css={css`
              align-items: center;
              display: flex;
              justify-content: flex-end;
            `}
          >
            <label {...getLabelProps({ htmlFor: 'toggler' })}>Sort By:</label>
            <ToggleButton
              {...getToggleButtonProps({
                'aria-expanded': isOpen,
                id: 'toggler',
                'data-toggle': 'dropdown',
                onKeyDown: e => {
                  e.key === 'Tab' &&
                    highlightedIndex !== null &&
                    selectItem(SortOptions[highlightedIndex])
                }
              })}
            >
              <TogglerValue>{selectedItem.label}</TogglerValue>
              <div
                css={theme =>
                  css`
                    color: ${theme.colors.gray500};
                    height: 1.5rem;
                  `
                }
              >
                <ChevronDown />
              </div>
            </ToggleButton>
          </div>
          {isOpen && (
            <OptionList>
              {SortOptions.map((option, index) => (
                <Item
                  {...getItemProps({
                    item: option,
                    index,
                    isHighlighted: highlightedIndex === index
                  })}
                  key={option.value}
                >
                  <SortButton
                    aria-label={option.label}
                    isSelected={option === selectedItem}
                  >
                    {option.label}
                  </SortButton>
                </Item>
              ))}
            </OptionList>
          )}
        </Root>
      )}
    </Downshift>
  )
}

export function MobileSortByDifficulty ({ sort }) {
  const { onSortClick } = useContext(URLUtilsContext)

  const handleChange = useCallback(e => onSortClick(e.currentTarget.value), [
    onSortClick
  ])

  return (
    <div
      css={css`
        margin-bottom: 1.5rem;
      `}
      role='group'
      aria-labelledby='sort'
    >
      <div
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        <h4
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 0.875rem;
            font-weight: 700;
            line-height: 1.25rem;
            text-transform: uppercase;
          `}
          id='sort'
        >
          Sort by Difficulty Level
        </h4>
      </div>
      <div>
        {SortOptions.map(({ label, value }) => (
          <div
            key={value}
            css={css`
              align-items: center;
              display: flex;
              height: 2rem;
            `}
          >
            <SortOption
              checked={sort === value}
              id={label}
              onChange={handleChange}
              value={value}
            />
            <Label htmlFor={label}>{label}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
