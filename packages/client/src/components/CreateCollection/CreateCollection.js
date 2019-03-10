import React from 'react'
import { css } from '@emotion/core'

import LearningItemInput from './LearningItemInput'
import { Dropdown, IconButton } from 'components/common'
import {
  Item,
  OptionList,
  OptionButton,
  ToggleButton,
  TogglerLabel
} from './styled'
import useCreateCollection from 'hooks/useCreateCollection'
import DropdownOptions from 'constants/DropdownOptions'

export default function CreateCollection () {
  const {
    collection,
    handleCategoryChange,
    handleLearningItemChange,
    handleLevelChange,
    handleNameChange,
    handleSubmit,
    hasError
  } = useCreateCollection()

  // const handleUrlInput = e => {
  //   const url = e.target.value
  //   // fetch title
  //   fetch('')
  // }

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label='Collection Title'
        autoComplete='off'
        name='title'
        onChange={handleNameChange}
        placeholder='A Super Catchy Title'
        type='text'
        value={collection.name}
      />
      <Dropdown
        handleChange={handleCategoryChange}
        initialValue={collection.category}
        items={DropdownOptions.CATEGORY_OPTIONS}
        label=''
        Item={Item}
        OptionList={OptionList}
        OptionButton={OptionButton}
        ToggleButton={ToggleButton}
        TogglerLabel={TogglerLabel}
      />
      <Dropdown
        handleChange={handleLevelChange}
        initialValue={collection.level}
        items={DropdownOptions.DIFFICULTY_LEVEL_OPTIONS}
        label=''
        Item={Item}
        OptionList={OptionList}
        OptionButton={OptionButton}
        ToggleButton={ToggleButton}
        TogglerLabel={TogglerLabel}
      />
      <LearningItemInput />
      {/* tag popular tags for different category */}
      {/* url */}
      {collection.urls.map(({ url, type, title, description }, i) => (
        <li key={url}>
          <LearningItemInput index={i} />
        </li>
      ))}
    </form>
  )
}