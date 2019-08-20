const EventTypes = {
  CLICK_CTA: 'click CTA',
  CLICK_LEARNING_RESOURCE: 'click learning resource',
  CLICK_SEARCH_RESULT: 'click search result',
  CLICK_SIGN_UP: 'click sign up',
  CLICK_TAG: 'click tag',
  CLICK_TAG_FILTER: 'click tag filter',
  ERROR: 'error',
  INPUT_SEARCH: 'input search',
  SIGN_UP_INTENT: 'show signup intent',
  SORT_DIFFICULTY: 'sort by difficulty'
}

export const logClickAction = ({ id, action }) => window.___log(action, { id })

export const logClickCTA = () => window.___log(EventTypes.CLICK_CTA)

export const logClickLearningResource = ({ id, collectionId }) =>
  window.___log(EventTypes.CLICK_LEARNING_RESOURCE, { id, collectionId })

export const logClickSearchResult = ({ input, to }) =>
  window.___log(EventTypes.CLICK_SEARCH_RESULT, { input, to })

export const logClickSignUp = email =>
  window.___log(EventTypes.CLICK_SIGN_UP, { email })

export const logClickTag = ({ tag }) =>
  window.___log(EventTypes.CLICK_TAG, { tag })

export const logClickTagFilter = ({ tag, updatedTags }) =>
  window.___log(EventTypes.CLICK_TAG_FILTER, { tag, updatedTags })

export const logError = ({ error, componentStack }) =>
  window.___log(EventTypes.ERROR, { error, componentStack })

export const logInputSearch = (input, resultCount, isIndexPage = false) =>
  window.___log(EventTypes.INPUT_SEARCH, { input, isIndexPage, resultCount })

export const logSignUpIntent = () => window.___log(EventTypes.SIGN_UP_INTENT)

export const logSortDifficulty = ({ sort }) =>
  window.___log(EventTypes.SORT_DIFFICULTY, { sort: sort || 'latest' })
