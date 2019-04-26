import { toTitleCase } from 'common'

export const createActionLabel = (action, name) => {
  switch (action) {
    case 'check':
    case 'uncheck':
      return `${toTitleCase(action)} Item ${name}`
    case 'love':
    case 'unlove':
    case 'share':
    case 'save':
    case 'unsave':
      return `${toTitleCase(action)} Collection ${name}`
    default:
      throw new Error('Unknow action.')
  }
}
