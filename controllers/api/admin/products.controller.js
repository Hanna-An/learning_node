import crypto from "crypto";
import axios from "axios";
import {ObjectId, ObjectID} from "mongodb";

export default class AdminProductsController {

    static async adminProducts(req, res) {
        let arr = await global.db.collection('products').find().toArray()
        return res.send({data: arr})
    }

    static async getDetailProduct(req, res) {
        let product = await global.db.collection('products').findOne({_id: new ObjectId(req.params.id)})
        if (product) {
            return res.send({data: product})
        } else {
            throw new Error('404')
        }
    }

    static async adminProductDelete(req, res) {
        await global.db.collection('products').deleteOne({_id: new ObjectId(req.params.id)})
        return res.send({data: true})
    }
}



