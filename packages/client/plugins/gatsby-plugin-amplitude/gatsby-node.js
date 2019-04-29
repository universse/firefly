exports.createPages = async ({ actions: { createRedirect } }) => {
  process.env.NODE_ENV === 'production' &&
    createRedirect({
      fromPath: '/api/fire/*',
      toPath: 'https://api.amplitude.com/:splat',
      statusCode: 200
    })
}
