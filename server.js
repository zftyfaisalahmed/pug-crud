require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = Number(process.env.PORT)
const connectDB = require('./db/connectDb')


const app = express()

// view engine
app.set('view engine','pug')
app.set('views','./view')

// static declaration
app.use(express.static('./view'))
// body parser middleware
app.use(express.urlencoded({extended:true})) //query format of incoming data
app.use(express.json()) //recevie json format

// import route
app.use('/', require('./route/contact_view_route'))
app.use('/api/contact', require('./route/contact_route'))

// default route
app.all('*', (req, res) => {
    res.status(404).json({msg : 'Requested path not found, try /api/users'})
})

// server listen method
app.listen(PORT, () => {
    connectDB()
    console.log(`server is running at http://localhost:${PORT}`)
})