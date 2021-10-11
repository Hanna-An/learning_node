import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import handlebars from 'express-handlebars'
import apiRoutes from './routes/api/index.js'
import webRoutes from './routes/web/index.js'
import {MongoClient} from 'mongodb'
import session from 'express-session'


const app = express()
const host = '127.0.0.1'
const port = 3000

let db = null

app.use(
    session({
        secret: '123',
        saveUninitialized: true,
    })
)


app.use(express.static('public'))

app.use((req, res, next) => {
    // console.log(__filename + req.originalUrl)
    // console.log(host + ':' + port + req.originalUrl)
    console.log('http://localhost:3000' + req.originalUrl)
    next()
})

MongoClient.connect(
    'mongodb://localhost:27017',
    async (err, client) => {
        if (err) {
            console.log('Connection error: ', err)
            throw err
        }
        console.log('Connected')
        db = client.db('test')
        global.db = db
    })

app.set('host', host)
app.set('port', port)

app.use('/api', apiRoutes)
app.use('/', webRoutes)

app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.use(express.static(path.join(__dirname, 'public')))
app.engine(
    'handlebars',
    handlebars({defaultLayout: 'main'})
)
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
    res.status(404).type('application/json')
    res.send('Not found')
})

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})
