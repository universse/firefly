export const isValidEmail = email =>
  /^[^@]+@[^@]+$/.test(email) && !/[.]$/.test(email) && !/yopmail/i.test(email)
