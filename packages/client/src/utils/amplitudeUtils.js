const EventTypes = {
  CLICK_CTA: 'click CTA',
  CLICK_LEARNING_RESOURCE: 'click learning resource',
  CLICK_SEARCH_RESULT: 'click search result',
  CLICK_TAG: 'click tag',
  CLICK_TAG_FILTER: 'click tag filter',
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

export const logClickTag = ({ tag }) =>
  window.amplitude &&
  window.amplitude.getInstance().logEvent(EventTypes.CLICK_TAG, { tag })

export const logClickTagFilter = ({ tag, updatedTags }) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.CLICK_TAG_FILTER, { tag, updatedTags })

export const logInputSearch = input => {
  window.amplitude &&
    window.amplitude.getInstance().logEvent(EventTypes.INPUT_SEARCH, { input })
}

export const logSignUpIntent = () =>
  window.amplitude &&
  window.amplitude.getInstance().logEvent(EventTypes.SIGN_UP_INTENT)

export const logSortDifficulty = ({ sort }) =>
  window.amplitude &&
  window.amplitude
    .getInstance()
    .logEvent(EventTypes.SORT_DIFFICULTY, { sort: sort || 'latest' })
