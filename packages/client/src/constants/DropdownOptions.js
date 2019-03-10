import { Categories, DifficultyLevels } from 'common'

export default {
  CATEGORY_OPTIONS: Categories.map((category, i) => ({
    label: category,
    value: i
  })),
  DIFFICULTY_LEVEL_OPTIONS: DifficultyLevels.map((level, i) => ({
    label: level,
    value: i
  }))
}
