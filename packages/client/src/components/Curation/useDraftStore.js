import create from 'zustand'

const emptyDraft = {
  id: '',
  name: '',
  category: 0,
  level: 0,
  urls: [],
  tags: []
}

const [useDraftStore] = create((set, get) => ({
  ...emptyDraft,
  actions: {
    setDraft: set,
    createNewDraft: id => set({ ...emptyDraft, id }),

    // urls
    setUrl: ({ index, ...url }) =>
      set(({ urls }) => ({
        urls: index
          ? urls.concat(url)
          : urls.filter(currentUrl =>
            url.id === currentUrl.id ? url : currentUrl
          )
      })),

    dropUrl: ({ dragIndex, dropIndex }) => {
      if (dragIndex === dropIndex) return
      set(({ urls }) => {
        const updated = [...urls]

        const dragUrl = updated.splice(dragIndex, 1)[0]
        updated.splice(dropIndex, 0, dragUrl)

        return { urls: updated }
      })
    },

    removeUrl: index =>
      set(({ urls }) => ({
        removed: urls[index],
        urls: urls.filter((_, i) => i !== index)
      })),

    undoRemoveUrl: index =>
      set(({ urls, removed }) => ({
        urls: [...urls.slice(0, index), removed, ...urls.slice(index)],
        removed: null
      })),

    // tags
    addTag: tag => set(({ tags }) => ({ tags: tags.concat(tag) })),

    removeTag: index =>
      set(({ tags }) => ({
        removed: tags[index],
        tags: tags.filter((_, i) => i !== index)
      })),

    undoRemoveTag: index =>
      set(({ tags, removed }) => ({
        tags: [...tags.slice(0, index), removed, ...tags.slice(index)],
        removed: null
      }))
  }
}))

export function useDraft () {
  return useDraftStore(({ actions, ...draft }) => draft)
}

export function useDraftActions () {
  return useDraftStore(state => state.actions)
}

export default useDraftStore
