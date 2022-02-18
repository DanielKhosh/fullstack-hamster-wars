const secrets = require('./secrets/secret.json')

if( secrets){
    console.log(`we got secrets`)
} else {
    console.log(`no secrets`)
}