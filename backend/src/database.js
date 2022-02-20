const admin = require("firebase-admin");

const serviceAccount = require("./secrets/fullstack-hamster-daniel-firebase-adminsdk-w7ffp-8f0c6737e8.json");

function connect() {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});

	const db = admin.firestore()
	return db

}

module.exports = { connect}

// const admin = require("firebase-admin");


// let privateKey;
// if( process.env.PRIVATE_KEY) {
//     privateKey = JSON.parse(process.env.PRIVATE_KEY)
// } else  {
//     privateKey = require('./secrets/fullstack-hamster-daniel-firebase-adminsdk-w7ffp-8f0c6737e8.json')
// }
 

// function connect() {
//   admin.initializeApp({
//     credential: admin.credential.cert(privateKey)
//   });
//   const db = admin.firestore();
//   return db
// }

// module.exports = { connect };