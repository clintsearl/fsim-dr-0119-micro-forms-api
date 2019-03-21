const { send, json } = require('micro')
const { router, get, post } = require('microrouter')
const cors = require('micro-cors')()

// In memory "Database"
let users = []

// Route Handlers
const notfound = (req, res) => send(res, 404, 'Not found route')
const createUser = async (req, res) => {
    // Create a User
    const body = await json(req)
    console.log(body)
    users.push(body)
    console.log(users)
    // Database stuff goes here

    return send(res, 200, body)
}
const getUsers = (req, res) => {
    // Read all Users
    return send(res, 200, users)
    // Database stuff goes here
}
const getUser = (req, res) => {
    // Read a Single User
    return send(res, 200, users[req.params.id])
    // Database stuff goes here
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