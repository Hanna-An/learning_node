import express from 'express'
let router = express.Router()

router.route('/cars')

    .get(async (req, res) => {
        let arr = await db.collection('cars').find().toArray()
        console.log(arr)
        res.status(200).type('application/json')
        res.send(arr)
    })

    .post(async (req, res) => {let data = req.body
        let b = await db.collection('cars').insertOne(data)
        res.status(201).type('application/json')
        res.send({id: b.insertedId})
    })

    .put(async (req, res) => {
            const titleCars = req.params.title
            console.log(titleCars)
            let data = req.body
            let b = await db.collection('cars').update({"title": titleCars}, {$set: data})
            res.status(201).type('application/json')
            res.send({status: 'success'})
    })
    .delete(async (req, res) => {
            const titleCars = req.params.title
            console.log(titleCars)
            let b = await db.collection('cars').deleteMany({"title": titleCars})
            res.status(200).type('application/json')
            res.send({status: 'success'})
    })

export default router
