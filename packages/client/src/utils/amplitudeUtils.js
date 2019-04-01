const amplitude =
  typeof window === 'object' &&
  typeof window.amplitude === 'object' &&
  window.amplitude

const EventTypes = {
  CLICK_CTA: 'clickCTA',
  CLICK_TAG: 'clickTag',
  CLICK_TAG_FILTER: 'clickTagFilter',
  INPUT_SEARCH: 'inputSearch',
  SIGN_UP_INTENT: 'signUpIntent',
  SORT_DIFFICULTY: 'sortDifficulty'
}

export const logClickAction = ({ id, action }) =>
  amplitude &&
  amplitude.getInstance().logEvent(action, {
    id
  })

export const logClickCTA = () =>
  amplitude && amplitude.getInstance().logEvent(EventTypes.CLICK_CTA)

export const logClickTag = ({ tag }) =>
  amplitude && amplitude.getInstance().logEvent(EventTypes.CLICK_TAG, { tag })

export const logClickTagFilter = ({ tag, updatedTags }) =>
  amplitude &&
  amplitude
    .getInstance()
    .logEvent(EventTypes.CLICK_TAG_FILTER, { tag, updatedTags })

export const logInputSearch = input =>
  amplitude &&
  amplitude.getInstance().logEvent(EventTypes.INPUT_SEARCH, { input })

export const logSignUpIntent = () =>
  amplitude && amplitude.getInstance().logEvent(EventTypes.SIGN_UP_INTENT)

export const logSortDifficulty = ({ sort }) =>
  amplitude &&
  amplitude
    .getInstance()
    .logEvent(EventTypes.SORT_DIFFICULTY, { sort: sort || 'latest' })
