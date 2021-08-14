const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')

const { auth, requiresAuth } = require('express-openid-connect');

//app.use(staticPath);
app.use(express.static('public'))



//auth config
app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        //idpLogout: true,

    })
);

//for http://localhost:3000/login page as home page to http://localhost:3000
app.get('/', (req, res) => {
    res.sendFile(req.oidc.isAuthenticated() ? __dirname + '/views/app.html' : __dirname + '/views/logout.html')
})

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})


// server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listning on port ${port}`)
})