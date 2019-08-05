import { Categories, DifficultyLevels, toTitleCase } from 'common'

export default {
  CATEGORY_OPTIONS: Categories.map((category, i) => ({
    label: toTitleCase(category),
    value: i
  })),
  DIFFICULTY_LEVEL_OPTIONS: DifficultyLevels.map((level, i) => ({
    label: toTitleCase(level),
    value: i
  }))
}
