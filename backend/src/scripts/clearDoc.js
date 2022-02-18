const { connect } = require('../database.js'); 
const db = connect()

const hamsters = 'hamsters'

clear(hamsters);

async function clear(hamsters) {
    const hamstersRef = db.collection(hamsters)
    const hamstersSnapshot = await hamstersRef.get() // cekamo da dobijemo snapshot

    if( hamstersSnapshot.empty ) {
        return
    }
    hamstersSnapshot.forEach(docRef => {
       hamstersRef.doc(docRef.id).delete()
    })
}

