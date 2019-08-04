import PropTypes from 'prop-types'

export const RefType = PropTypes.shape({ current: PropTypes.object }).isRequired
export const TagsType = PropTypes.arrayOf(PropTypes.string).isRequired

export const CollectionIdsType = PropTypes.arrayOf(
  PropTypes.exact({
    id: PropTypes.string.isRequired
  }).isRequired
)

// TODO add image + publisher
export const UrlType = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // image: PropTypes.string.isRequired,
  // publisher: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cutOff: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
}

export const UrlsType = PropTypes.arrayOf(PropTypes.exact(UrlType).isRequired)
  .isRequired

export const CollectionViewType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: TagsType,
  urls: UrlsType
})
