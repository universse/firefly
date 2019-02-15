const functions = require('firebase-functions')

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// // const cors = require('cors')({
// //   origin: true
// // })

// admin.initializeApp();
// const db = admin.firestore();
// db.settings({
//   timestampsInSnapshots: true
// });

// exports.create = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(403).send("Forbidden!");
//   }

//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith("Bearer ")
//   ) {
//     res.status(403).send("Unauthorized");
//     return;
//   }

//   const idToken = req.headers.authorization.split("Bearer ")[1];
//   let decodedIdToken;

//   try {
//     decodedIdToken = await admin.auth().verifyIdToken(idToken);
//     res.send(decodedIdToken);
//   } catch {
//     res.status(403).send("Unauthorized");
//   }

//   // const { uid } = decodedIdToken
//   // const data = req.body.data
//   // const batch = db.batch()
//   // const docRef = db.collection('collections').doc()
//   // batch.set(docRef, collectionData)

//   // return batch
//   //   .commit()
//   //   .then(() => res.status(200).json({ id: docRef.id }))
//   //   .catch(() => res.sendStatus(500))
// });
