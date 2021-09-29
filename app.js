import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import handlebars from 'express-handlebars'
import cars from './routes/cars.js'
import profile from './routes/profile.js'
import {MongoClient} from 'mongodb'

const app = express()
const host = '127.0.0.1'
const port = 3000

let db = null

MongoClient.connect(
    'mongodb://localhost:27017',
    async (err, client) => {
        if (err) {
            console.log('Connection error: ', err)
            throw err
        }
        console.log('Connected')
        db = client.db('test')
        app.db = db
        let a = await db.collection('cars').findOne({})
        console.log(a)
    })

app.set('host', host)
app.set('port', port)

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

app.use('/api', cars)
app.use('/', profile)

app.get('/cars', async (req, res) => {
    let arr = await db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

app.get('/cars', async (req, res) => {
    let arr = await db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Greetings form Handlebars',
        content: 'Description how to use it handlebars',
    })
})

app.use((req, res, next) => {
    res.status(404).type('application/json')
    res.send('Not found')
})

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})
