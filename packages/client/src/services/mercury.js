export const mercuryAPI = 'https://mercury.postlight.com/parser?url='
export const mercuryConfig = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.GATSBY_MERCURY_API_KEY
  }
}
