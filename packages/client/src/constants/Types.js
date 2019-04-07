import PropTypes from 'prop-types'

export const CollectionType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  itemCount: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
}).isRequired

export const CollectionsType = PropTypes.arrayOf(
  PropTypes.shape({
    node: CollectionType
  }).isRequired
)

export const UrlType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}).isRequired

export const UrlsType = PropTypes.arrayOf(UrlType).isRequired

export const CollectionViewType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urls: UrlsType
}).isRequired
