const admin = require('firebase-admin')
const crypto = require('crypto')

exports.sourceNodes = async (
  { actions: { createNode } },
  { credential, types }
) => {
  admin.initializeApp({ credential: admin.credential.cert(credential) })
  const firestore = admin.firestore()

  await Promise.all(
    types.map(async ({ collection, type, map = node => node }) => {
      const docs = await firestore.collection(collection).get()

      docs.forEach(doc =>
        createNode({
          ...map(doc.data()),
          id: doc.id,
          parent: null,
          children: [],
          internal: {
            type,
            contentDigest: crypto
              .createHash('md5')
              .update(doc.id)
              .digest('hex')
          }
        })
      )
    })
  )
}
