import { ObjectId } from "mongodb"

export default class CategoriesController {

    static async getCategories(req, res) {
        let arr = await global.db.collection('categories').find().toArray()
        res.send({data: arr})
    }

    static async getDetailCategories(req, res) {
        let category = await global.db.collection('categories').findOne({_id: new ObjectId(req.params.id)})
        if (category) {
            let products = await global.db.collection('products').find({category_id: category._id}).toArray()
            res.json({data: products})
        } else {
            res.json({error: 'products not exist'})
        }
    }

    static async categoryDelete(req, res) {
        await global.db.collection('categories').deleteOne({_id: new ObjectId(req.params.id)})
        res.send({data: true})
    }
}


