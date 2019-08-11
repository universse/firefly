// TODO switch to production

exports.createPages = async ({ actions: { createRedirect } }) => {
  createRedirect({
    fromPath: '/api/*',
    toPath:
      'https://us-central1-firefly-users-db-dev.cloudfunctions.net/:splat',
    statusCode: 200
  })
}
