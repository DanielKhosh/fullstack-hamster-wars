const express = require('express');
const hamsterRouters = express.Router();
const database = require('../database.js')
const connect = database.connect;
const db = connect()
const cors = require('cors');

const hamsters = 'hamsters'
const app = express()

app.use(cors())

// get all 
hamsterRouters.get('/', async (req, res) => {
	let array = await getAll()

	if (array == 0) {
		res.sendStatus(404)
		console.log('No hamsters left')
	} else {
		res.send(array)
	}
})


// get cutest
hamsterRouters.get('/cutest', async (req, res) => {
	let array = await getCutest()
	console.log(array)

	if (array) {
		res.status(200).send(array)
	} else {
		res.sendStatus(404)
	}
})

// get random
hamsterRouters.get('/random', async (req, res) => {
	let array = await getAll()
	let randomHamster = array[Math.floor(Math.random() * array.length)]
	console.log(randomHamster);
	res.send(randomHamster)
})

//get hamster by id
hamsterRouters.get('/:id', async (req, res) => {
	let id = await getOne(req.params.id)

	if (id) {
		res.status(200).send(id)
	} else {
		res.sendStatus(404)
	}
})

// om det inte är rätt 
hamsterRouters.post('/', async (req, res) => {
	let body = await req.body
	if (!isHamsterObject(body)) {
		res.sendStatus(400)
		return
	}
	let newId = await postHamster(body)
	res.status(200).send({ id: newId })
})

// put or changes object of specific humster

hamsterRouters.put('/:id', async (req, res) => {

	let body = req.body

	if (!isUpdatedHamster(body)) {
        res.status(400).send('must send an object.')
        return
    }
	const newHamsterInfo = await humsterUpdate(req.params.id, body);
	if (!newHamsterInfo) {
		res.send(404);
		return;
	} else {
		res.sendStatus(200)
	}
})

// delete 

hamsterRouters.delete('/:id', async (req, res) => {
	let id = await deleteOneHamster(req.params.id)
	console.log('params: ', req.params.id, id);

	if (id) {
		res.sendStatus(200)
	} else {

		res.sendStatus(404)
	}
})

// handling PUT object to see if correct

function isUpdatedHamster(body) {
	if (typeof body !== "object") {
		console.log(typeof body);
		return false
	}

	const keys = Object.keys(body);
    const value = Object.values(body);

	if (!keys.includes('wins') && !keys.includes('games') && !keys.includes('defeats')) {
        return false;
    }

    const filter = value.filter(x => (typeof x === 'number'));
    return filter.length === 2 || 3 ;
}

// uppdate to the new info

async function humsterUpdate(id, body) {
	const docRef = await db.collection(hamsters).doc(id);
	const docSnapshot = await docRef.get();

	if (docSnapshot.exists) {
		const settings = { merge: true };
		const data = await db.collection(hamsters).doc(id).set(body, settings);
		return data;
	}
	return false
}

async function postHamster(object) {
	const docRef = await db.collection(hamsters).add(object)
	return (docRef.id)

}

// se if we get an array that matches our criteria

function isHamsterObject(body) {

	if (typeof body !== "object") {
		console.log(typeof body)
		return false;
	}
	let keys = Object.keys(body);

	if (!keys.includes("name")
		|| !keys.includes("age")
		|| !keys.includes("loves")
		|| !keys.includes("defeats")
		|| !keys.includes("wins")
		|| !keys.includes("imgName")
		|| !keys.includes("favFood")
		|| !keys.includes("games")
	) {
		return false
	}
	return true
}

async function getAll() {							// get us all 
	const hamstersRef = db.collection(hamsters)
	const hamstersSnapshot = await hamstersRef.get()

	if (hamstersSnapshot.empty) {
		return []
	}
	const array = []
	await hamstersSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})
	return array
}

async function getOne(id) {							// to get a specific id
	const docRef = db.collection(hamsters).doc(id)
	const docSnapshot = await docRef.get()
	if (docSnapshot.exists) {
		return docSnapshot.data()
	} else {
		return null
	}
}
// remove hamster by id
async function deleteOneHamster(id) {
	console.log('Deleting a document...');
	const docRef = db.collection(hamsters).doc(id)
	const docSnapshot = await docRef.get()
	console.log('Document exists? ', docSnapshot.exists);
	if (docSnapshot.exists) {
		await docRef.delete()
		return true
	} else
		return false
}

// who is the winner
async function getCutest() {
	const hamstersRef = db.collection(hamsters)
	const hamstersSnapshot = await hamstersRef.get()
	if (hamstersSnapshot.empty) {
		return false
	}
	const array = []
	hamstersSnapshot.forEach(async docRef => {
		const data = docRef.data()
		data.id = docRef.id
		array.push(data)
	})

	array.sort((a, b) => {

		let aDeff = a.wins - a.defeats;
		let bDeff = b.wins - b.defeats;
		return bDeff - aDeff
	})

	let maxScore = array[0].wins - array[0].defeats;
	let allWinners = array.filter(x => x.wins - x.defeats === maxScore)

	return allWinners
}


module.exports = hamsterRouters
