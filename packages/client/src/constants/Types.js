import PropTypes from 'prop-types'

export const RefType = PropTypes.shape({ current: PropTypes.object }).isRequired
export const TagsType = PropTypes.arrayOf(PropTypes.string).isRequired

export const CollectionType = PropTypes.exact({
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  itemCount: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: TagsType
}).isRequired

export const CollectionsType = PropTypes.arrayOf(
  PropTypes.exact({
    node: CollectionType
  }).isRequired
)

export const UrlType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired
}).isRequired

export const UrlsType = PropTypes.arrayOf(UrlType).isRequired

export const CollectionViewType = PropTypes.exact({
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: TagsType,
  urls: UrlsType
}).isRequired
