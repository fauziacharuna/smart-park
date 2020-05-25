const express = require('express')
const dotenv = require('dotenv')
const logger = require('./api/middleware/logger')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const BodyParser = require('body-parser')
const connectDB = require('./config/db')
const router = require('./api/router/ParkRouter')

dotenv.config({path: './config/config.env'})
connectDB()

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


app.use(BodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/api/v1/smartpark',router)
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, 
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message} `.red)
    server.close(()=> process.exit(1))
})