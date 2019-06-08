const facebookAppId = '604132180019762'

export function createFacebookShareURL ({ href, text }) {
  return `https://www.facebook.com/dialog/share?app_id=${facebookAppId}&redirect_uri=${href}&href=${href}&quote=${text}`
}

export function createTwitterShareURL ({ href, text }) {
  return `https://twitter.com/intent/tweet?text=${text}&url=${href}`
}
