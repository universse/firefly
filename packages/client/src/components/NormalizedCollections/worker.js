import workerize from 'workerize'

const worker =
  typeof window === 'object' &&
  workerize(`
export function normalizeCollections (allCollections) {
  const normalizedCollections = {}

  allCollections.forEach(({ node }) => {
    normalizedCollections[node.id.toLowerCase()] = node
  })

  return normalizedCollections
}
`)

export default worker
