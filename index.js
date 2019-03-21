const { send, json } = require('micro')
const { router, get, post } = require('microrouter')
const cors = require('micro-cors')()

// Failed attempt at MongoClient implementation
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://teacher:instructor1@helio-draper-uocvs.mongodb.net/rolodex?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// const dbName = "rolodex"
// const colName = "users"

const db = require('monk')('mongodb://teacher:instructor1@helio-draper-shard-00-00-uocvs.mongodb.net:27017,helio-draper-shard-00-01-uocvs.mongodb.net:27017,helio-draper-shard-00-02-uocvs.mongodb.net:27017/rolodex?ssl=true&replicaSet=helio-draper-shard-0&authSource=admin&retryWrites=true')
const users = db.get('users')

// In memory "Database"
// let users = []

// Route Handlers
const notfound = (req, res) => send(res, 404, 'Not found route')
const createUser = async (req, res) => {
    // Create a User
    // Database stuff goes here
    const body = await json(req)
    await users.insert(body)
    return send(res, 201, body)
}
const getUsers = async (req, res) => {
    // Read all Users
    // return send(res, 200, users)
    // Database stuff goes here
    const data = await users.find({})
    return send(res, 200, data)
}
// Failed attempt at MongoClient implementation
// const dbGetUsers = async () => {
//     let results;
//     await client.connect(async err => {
//         const collection = client.db(dbName).collection(colName);
//         results = await collection.find({})
//         console.log("DB Responded", results)
//         client.close();
//     });
//     return results
// }
const getUser = async (req, res) => {
    // Read a Single User
    const user = await users.find({_id: req.params.id})
    // Database stuff goes here
    return send(res, 200, user)
}

// Routes
module.exports = cors(
    router(
        get('/users', getUsers),
        get('/users/:id', getUser),
        post('/users', createUser),
        get('/*', notfound)
    )
)