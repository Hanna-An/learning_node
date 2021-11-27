import { ObjectId } from "mongodb"

export default class ProductsController {
    static async getProducts(req, res) {
        let limitProducts = 6
        let popularProducts = await global.db.collection('products').find().limit(limitProducts).toArray()
        res.send({data: popularProducts})
    }

    static async getDetailProducts(req, res) {
        let product = await global.db.collection('products').findOne({_id: new ObjectId(req.params.id)})
        if (product) {
            res.send({data: product})
        } else {
            res.send({error: 'product not exist'})
        }
    }
}


