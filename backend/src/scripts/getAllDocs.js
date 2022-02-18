const database = require('../database')
const connect = database.connect
const db = connect()

const USERS = 'users'

getAll();

async function getAll() {
	console.log('Retrieving all documents from database...');
	const usersRef = db.collection(USERS)
	const usersSnapshot = await usersRef.get()

	if(usersSnapshot.empty) {
		console.log('you have no documents');
		return
	}
	const array = []

	await usersSnapshot.forEach(async docRef => {
		const document = await docRef.data()
		document.id = docRef.id
		array.push(document)
	})
	return array
}
