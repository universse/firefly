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

export const logClickAction = ({ id, action }) =>
  window.amplitude &&
  window.amplitude.getInstance().logEvent(action, {
    id
  })

export const logClickCTA = () =>
  window.amplitude &&
  window.amplitude.getInstance().logEvent(EventTypes.CLICK_CTA)

export const logClickLearningResource = ({ id, collectionId }) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.CLICK_LEARNING_RESOURCE, { id, collectionId })

export const logClickSearchResult = ({ input, to }) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.CLICK_SEARCH_RESULT, { input, to })

export const logClickSignUp = email =>
  window.amplitude &&
  window.amplitude.getInstance().logEvent(EventTypes.CLICK_SIGN_UP, { email })

export const logClickTag = ({ tag }) =>
  window.amplitude &&
  window.amplitude.getInstance().logEvent(EventTypes.CLICK_TAG, { tag })

export const logClickTagFilter = ({ tag, updatedTags }) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.CLICK_TAG_FILTER, { tag, updatedTags })

export const logError = ({ error, componentStack }) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.ERROR, { error, componentStack })

export const logInputSearch = (input, isIndexPage = false) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.INPUT_SEARCH, { input, isIndexPage })

export const logSignUpIntent = () =>
  window.amplitude &&
  window.amplitude.getInstance().logEvent(EventTypes.SIGN_UP_INTENT)

export const logSortDifficulty = ({ sort }) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.SORT_DIFFICULTY, { sort: sort || 'latest' })
