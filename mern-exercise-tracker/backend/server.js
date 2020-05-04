const express  = require('express')
const cors = require('cors')
const  mongoose = require('mongoose')
const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', (err) => {
    if (!err) console.log('MongoDB Connection established successfully')
})

app.use('/exercises', exerciseRouter)
app.use('/users', userRouter)

app.listen(port, (err) => {
    if(!err) console.log(`started server on port ${port}`);
});