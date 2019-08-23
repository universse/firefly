import create from 'zustand'

const [useStateStore] = create(setState => ({
  isAuthorized: false,
  authorizedEmails: [],
  invitee: '',
  recentDrafts: [],
  isLoading: true,
  errorMessage: false,
  setState
}))

export default useStateStore
