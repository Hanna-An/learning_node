import { ObjectId } from "mongodb"

export default class ArticlesController {
    static async getArticles(req, res) {
        let arr = await global.db.collection('articles').find().toArray()
        res.send({data: arr})
    }

    static async getDetailArticles(req, res) {
        let article = await global.db.collection('articles').findOne({_id: new ObjectId(req.params.id)})
        if (article) {
            res.send({data: article})
        } else {
            res.send({error: 'article not exist'})
        }
    }
}


