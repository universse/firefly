import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics'

import { Dropdown, IconButton } from 'components/common'
import { Root, OptionButton, OptionList } from './styled'
import { Share } from 'icons'
import { logClickAction } from 'utils/amplitudeUtils'
import { createActionLabel } from 'utils/ariaLabelUtils'
import copyToClipboard from 'utils/copyToClipboard'
import withLocation from 'utils/withLocation'

function ShareDropdown ({ id, name, location: { href } }) {
  const onCopyClick = useCallback(e => {
    copyToClipboard(href)
    e.currentTarget.focus()
  }, [href])

  const items = useMemo(
    () => [
      { as: 'button', label: '', onClick: onCopyClick },
      {
        as: OutboundLink,
        href: '',
        label: '',
        rel: 'noopener noreferrer',
        target: '_blank'
      },
      { as: Link, label: '', to: '' }
    ],
    [onCopyClick]
  )

  const onToggleButtonClick = useCallback(
    e => logClickAction({ id, action: e.currentTarget.textContent }),
    [id]
  )

  return (
    <Dropdown
      Icon={Share}
      id='share-menu'
      items={items}
      label={createActionLabel('share', name)}
      onToggleButtonClick={onToggleButtonClick}
      OptionButton={OptionButton}
      OptionList={OptionList}
      Root={Root}
      ToggleButton={IconButton}
    />
  )
}

export default withLocation(ShareDropdown)

ShareDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}
