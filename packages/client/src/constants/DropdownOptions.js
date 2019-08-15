import { Categories, DifficultyLevels, toTitleCase } from '@firefly/core'

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
