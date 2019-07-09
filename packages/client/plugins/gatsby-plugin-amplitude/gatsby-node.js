exports.createPages = async ({ actions: { createRedirect } }) => {
  createRedirect({
    fromPath: '/api/fire/*',
    toPath: 'https://api.amplitude.com/:splat',
    statusCode: 200
  })
}
