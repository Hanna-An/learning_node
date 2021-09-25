import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const host = '127.0.0.1'
const port = 3000
app.set('host', host)
app.set('port', port)

import {MongoClient} from 'mongodb'
 // mongo = require('mongodb').MongoClient
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
        // console.
        let a = await db.collection('artists').findOne({})
        console.log(a)
        // client.close()

        // db.collection('artists').findOne(), (err, result) => {
        //     if (err) {
        //         console.log('Unable delete user: ', err)
        //         throw err
        //     }
        // }

        // db.collection('artists').find().limit(5)

        // db.collection('artists').find().sort(1)  //?

        // db.collection('artists').deleteOne({ id: 3 }, (err, result) => {
        //     if (err) {
        //         console.log('Unable delete user: ', err)
        //         throw err
        //     }
        // })

        // db.collection('artists').deleteMany({ id: 3, id: 4 }, (err, result) => {
        //     if (err) {
        //         console.log('Unable delete user: ', err)
        //         throw err
        //     }
        // })

        // db.collection('artists').find({"day": 1}).count();


    }
)



// app.get('/', (req, res) => {
//    request(
//         'http://example.com/api',
//         (err, response, body) => {
//             if (err) return res.status(500).send({ message: err })
//
//             return res.send(body)
//         }
//     )
// })

app.post('/api/news', async (req, res) => {
    let data = req.body
    let b = await db.collection('news').insertOne(data)
    res.status(201).type('application/json')
    res.send({id: b.insertedId})
})

app.get('/api/news', async (req, res) => {
    let arr = await db.collection('news').find().toArray()
    console.log(arr)
    res.status(200).type('application/json')
    res.send(arr)
})

app.get('/api/news/:title', async (req, res) => {
    const titleNews = req.params.title
    console.log(titleNews)
    let b = await db.collection('news').find({"title": titleNews}).toArray()
    console.log(b)
    res.status(200).type('application/json')
    res.send(b)
})

app.put('/api/news/:title', async (req, res) => {
    const titleNews = req.params.title
    console.log(titleNews)
    let data = req.body
    let b = await db.collection('news').update({"title": titleNews}, { $set: data })
    res.status(201).type('application/json')
    res.send({status:'success'})
})

app.delete('/api/news/:title', async (req, res) => {
    const titleNews = req.params.title
    console.log(titleNews)
    let b = await db.collection('news').deleteMany({"title": titleNews})
        res.status(200).type('application/json')
        res.send({status:'success'})
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname ,'assets')))

app.use(express.json())

app.use((req, res, next) => {
    res.status(404).type('application/json')
    res.send('Not found')
})

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})
