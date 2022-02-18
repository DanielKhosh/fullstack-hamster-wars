const { connect } = require('../database.js');
const db = connect();

const data = require('../data.json'); 

const hamsters = 'hamsters' 

addAll();

async function addAll() {
    data.forEach(object => {
        console.log('Uploading database plz wait');
        db.collection(hamsters).add(object);
    })
    console.log('Documents added to database');
}

