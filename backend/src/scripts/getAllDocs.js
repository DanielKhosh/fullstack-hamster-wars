const database = require('../database')
const connect = database.connect
const db = connect()

const HAMSTERS = 'hamsters'

getAll();

async function getAll() {
	console.log('Retrieving all documents from database...');
	const usersRef = db.collection(HAMSTERS)
	const usersSnapshot = await usersRef.get()

	// om tom
	if(usersSnapshot.empty) {
		console.log('you have no documents');
		return
	}
	const array = []

	// om vi får data
	await usersSnapshot.forEach(async docRef => {
		const document = await docRef.data()
		document.id = docRef.id
		array.push(document)
	})
	return array
}
