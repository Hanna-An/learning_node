import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
// import handlebars from 'express-handlebars'



const app = express()
const host = '127.0.0.1'
const port = 3000
app.set('host', host)
app.set('port', port)

import router from './routes/index.js'
app.use('/api', router)

import {MongoClient} from 'mongodb'
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
        let a = await db.collection('cars').findOne({})
        console.log(a)

        app.use(express.json())

        // app.post('/api/news', async (req, res) => {
        //     let data = req.body
        //     let b = await db.collection('news').insertOne(data)
        //     res.status(201).type('application/json')
        //     res.send({id: b.insertedId})
        // })
        //
        // app.get('/api/news', async (req, res) => {
        //     let arr = await db.collection('news').find().toArray()
        //     console.log(arr)
        //     res.status(200).type('application/json')
        //     res.send(arr)
        // })
        //
        // app.get('/api/news/:title', async (req, res) => {
        //     const titleNews = req.params.title
        //     console.log(titleNews)
        //     let b = await db.collection('news').find({"title": titleNews}).toArray()
        //     console.log(b)
        //     res.status(200).type('application/json')
        //     res.send(b)
        // })
        //
        // app.put('/api/ews/:title', async (req, res) => {
        //     const titleNews = req.params.title
        //     console.log(titleNews)
        //     let data = req.body
        //     let b = await db.collection('news').update({"title": titleNews}, {$set: data})
        //     res.status(201).type('application/json')
        //     res.send({status: 'success'})
        // })
        //
        // app.delete('/api/news/:title', async (req, res) => {
        //     const titleNews = req.params.title
        //     console.log(titleNews)
        //     let b = await db.collection('news').deleteMany({"title": titleNews})
        //     res.status(200).type('application/json')
        //     res.send({status: 'success'})
        // })


        // app.post('/api/cars', async (req, res) => {
        //     let data = req.body
        //     let b = await db.collection('cars').insertOne(data)
        //     res.status(201).type('application/json')
        //     res.send({id: b.insertedId})
        // })
        //
        // app.get('/api/cars', async (req, res) => {
        //     let arr = await db.collection('cars').find().toArray()
        //     console.log(arr)
        //     res.status(200).type('application/json')
        //     res.send(arr)
        // })
        //
        // app.get('/api/cars/:title', async (req, res) => {
        //     const titleCars = req.params.title
        //     console.log(titleCars)
        //     let b = await db.collection('cars').find({"title": titleCars}).toArray()
        //     console.log(b)
        //     res.status(200).type('application/json')
        //     res.send(b)
        // })
        //
        // app.put('/api/cars/:title', async (req, res) => {
        //     const titleCars = req.params.title
        //     console.log(titleCars)
        //     let data = req.body
        //     let b = await db.collection('cars').update({"title": titleCars}, {$set: data})
        //     res.status(201).type('application/json')
        //     res.send({status: 'success'})
        // })
        //
        // app.delete('/api/cars/:title', async (req, res) => {
        //     const titleCars = req.params.title
        //     console.log(titleCars)
        //     let b = await db.collection('cars').deleteMany({"title": titleCars})
        //     res.status(200).type('application/json')
        //     res.send({status: 'success'})
        // })

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        app.use(express.static(path.join(__dirname, 'views')))


        // app.engine(
        //     'handlebars',
        //     handlebars({defaultLayout: 'main'})
        // )
        // app.set('views', './views')
        // app.set('view engine', 'handlebars')
        //
        // app.get('/cars', async (req, res) => {
        //     let arr = await db.collection('cars').find().toArray()
        //     res.render('cars', {title: 'cars', cars: arr})
        // })
        //
        // app.get('/cars', async (req, res) => {
        //     let arr = await db.collection('cars').find().toArray()
        //     res.render('cars', {title: 'cars', cars: arr})
        // })
        //
        // app.get('/', (req, res) => {
        //     res.render('home', {
        //         title: 'Greetings form Handlebars',
        //         content: 'Description how to use it handlebars',
        //     })
        // })


        app.use((req, res, next) => {
            res.status(404).type('application/json')
            res.send('Not found')
        })

        app.listen(port, host, function () {
            console.log(`Server listens http://${host}:${port}`)
        })
    })
