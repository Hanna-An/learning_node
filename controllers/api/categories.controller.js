
/**
 * @openapi
 * /categories:
 *  get:
 *      tags:
 *      - name: "categories"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

export default class CategoriesController {

    static async getCategories(req, res) {
        let arr = await global.db.collection('categories').find().toArray()
        res.send({data: arr})
    }

/**
 * @openapi
 * /categories/{:categoryKey}:
 *  get:
 *      tags:
 *      - name: "categories/{:categoryKey}"
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

    static async getDetailCategories(req, res) {
        let category = await global.db.collection('categories').findOne({key: req.params.key})
        if (category) {
            let products = await global.db.collection('products').find({category_id: category._id}).toArray()
            res.json({data: products})
        } else {
            res.json({error: 'products not exist'})
        }
    }
}


