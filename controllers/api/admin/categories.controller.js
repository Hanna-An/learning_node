import crypto from "crypto";
import axios from "axios";
import {ObjectId, ObjectID} from "mongodb";

export default class AdminCategoryController {

    static async adminCategory(req, res) {
        let arr = await global.db.collection('categories').find().toArray()
        return res.send({data: arr})
    }

    static async getDetailCategory(req, res) {
        let category = await global.db.collection('categories').findOne({_id: new ObjectId(req.params.id)})
        if (category) {
            return res.send({data: category})
        } else {
            throw new Error('404')
        }
    }

    static async adminCategoryDelete(req, res) {
        await global.db.collection('categories').deleteOne({_id: new ObjectId(req.params.id)})
        return res.send({data: true})
    }
}



