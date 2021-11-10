export default class CategoryController {

    static async getCategory(req, res) {
        let category = await global.db.collection('categories').find()
        if (category) {
            return res.render('category')
        } else {
            throw new Error('404')
        }
    }

    static async getDetailCategory(req, res) {
        let category = await global.db.collection('categories').findOne({key: req.params.key})
        if (category) {
            let products = await global.db.collection('products').find({category_id: category._id}).toArray()
            products.forEach(function (product) {
                product.url = req._parsedOriginalUrl.path + '/' + product.key
            })
            res.render('category/_key', {title: category.title, products: products})
        } else {
            throw new Error('404')
        }
    }

    static async getCategoryProduct(req, res) {
        let category = await global.db.collection('categories').findOne({key: req.params.key})
        if (category) {
            let product = await global.db.collection('products').findOne({
                category_id: category._id,
                key: req.params.key_product
            })
            if (product) {
                res.render('category/_key_product', {title: category.title, product: product})
            } else {
                throw new Error('404')
            }
        } else {
            throw new Error('404')
        }
    }
}


