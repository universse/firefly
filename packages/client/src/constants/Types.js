import PropTypes from 'prop-types'

export const RefType = PropTypes.shape({ current: PropTypes.object }).isRequired
export const TagsType = PropTypes.arrayOf(PropTypes.string).isRequired

export const CollectionIdsType = PropTypes.arrayOf(
  PropTypes.exact({
    id: PropTypes.string.isRequired
  }).isRequired
)

export const UrlType = {
  id: PropTypes.string,
  cutOff: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  publisher: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.number,
  url: PropTypes.string.isRequired
}

export const UrlsType = PropTypes.arrayOf(PropTypes.exact(UrlType).isRequired)
  .isRequired

export const CollectionViewType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  category: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: TagsType,
  urls: UrlsType
})
