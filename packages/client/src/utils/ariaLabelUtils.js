export const createActionLabel = (action, name) => {
  switch (action) {
    case 'check':
      return `Check Item ${name}`
    case 'uncheck':
      return `Uncheck Item ${name}`
    case 'love':
      return `Love Collection ${name}`
    case 'unlove':
      return `Unlove Collection ${name}`
    case 'share':
      return `Share Collection ${name}`
    case 'save':
      return `Save Collection ${name} to My Library`
    case 'unsave':
      return `Unsave Collection ${name} from My Library`
    default:
      throw new Error('Unknow action.')
  }
}