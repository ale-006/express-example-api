/**
 * @author ale-006.github.io
 * INFINITYCODING.GQ
*/

const express = require("express")
const app = express()
const cors = require("cors")
let registeredUsers = [
    {id: 1, email: "user1@cool.com", password: "54321"},
    {id: 2, email: "user2@cool.com", password: "12345"},
    {id: 3, email: "user3@cool.com", password: "23154"}
]

app.listen(8080, () => console.log("API Ready!"))
app.use(cors())

app.get("/", (req, res) => {
    res.send("<center><h1>Example API</h1><p><b>Example use:</b> http://localhost:8080/user/&lt;userID\&gt;</p></center>")
})

//GET
app.get("/user/:id", (req, res) => {
    let userID = req.params.id
    for(let user of registeredUsers) {
        if(user.id == userID) {
            res.json(user)
            return;
        }
        else {
            let notFound = {error: "User Not Found", req_id: userID}
            res.json(notFound)
        }
    }
})

//DELETE
app.delete("/user/:id", (req, res) => {
    let userID = req.params.id

    registeredUsers = registeredUsers.filter(user => {
        if(user.id != userID) return true;
        else return false;
    })

    let success = {success: true, usersCount: registeredUsers.length}
    res.json(success)
})

//POST
app.post("/user/:email/:password", (req, res) => {
    let userEmail = req.params.email
    let userPassword = req.params.password

    registeredUsers.push({id: registeredUsers.length + 1, email: userEmail, password: userPassword})

    let success = {success: true, usersCount: registeredUsers.length}
    res.json(registeredUsers)
})

app.get("*", (req, res) => {
    res.status(404).send("404 - Not Found")
})