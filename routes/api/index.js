import express from 'express'
import bcrypt from 'bcrypt'
import {ObjectID} from "mongodb"

let apiRoutes = express.Router()

/**
 * @openapi
 * /signup:
 *  post:
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *
 */

apiRoutes.post('/signup', async (req, res) => {
    const body = req.body
    let errors = []
    const salt = await bcrypt.genSalt(10)
    let emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    let emailValue = body.email
    if (body.name === undefined || body.name.length < 3) {
        errors.push('Имя не должно быть короче 3 символов')
    }
    if (body.email === undefined) {
        errors.push('Введите email')
    }
    if (!emailRe.test(emailValue)) {
        errors.push('Введите корректный email')
    }
    if (body.password === undefined || body.password.length < 3) {
        errors.push('Пароль должен содержать не менее 3 символов')
    }
    if (errors.length > 0) {
        res.send({errors: errors})
        return
    }
    console.log(req.body)
    await global.db.collection('users').insert({
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, salt)
    })
    res.send({success: true})
})

/**
 * @openapi
 * /login:
 *  post:
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *
 */

apiRoutes.post('/login', async (req, res) => {
    const body = req.body;
    const user = await global.db.collection('users').findOne({email: body.email})
    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password)
        if (validPassword) {
            res.status(200).json({message: "Valid password"})
        } else {
            res.status(400).json({error: "Invalid Password"})
        }
    } else {
        res.status(401).json({error: "User does not exist"})
    }
})

/**
 * @openapi
 * /contacts:
 *  post:
 *      requestBody:
 *          content:
 *               'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          message:
 *                              type: string
 *
 */

apiRoutes.post('/contacts', async (req, res) => {
    const body = req.body
    let errors = []
    let emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    let emailValue = body.email
    if (body.name === undefined || body.name.length < 3) {
        errors.push('Имя не должно быть короче 3 символов')
    }
    if (!emailRe.test(emailValue)) {
        errors.push('Введите корректный email')
    }
    if (body.email === undefined) {
        errors.push('Введите email')
    }
    if (body.message === undefined || body.message.length === 0) {
        errors.push('Введите сообщение')
    }
    if (errors.length > 0) {
        res.send({errors: errors})
        return
    }
    await global.db.collection('contacts').insert(
        {
            name: body.name,
            email: body.email,
            message: body.message
        }
    )
    res.send({success: true})

})

apiRoutes.get('/search', async (req, res) => {
    res.send({data: []})
})

/**
 * @openapi
 * /news:
 *  get:
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

apiRoutes.get('/news', async (req, res) => {
    let arr = await global.db.collection('news').find().toArray()
    res.send({data: arr})
})

/**
 * @openapi
 * /articles:
 *  get:
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

apiRoutes.get('/articles', async (req, res) => {
    let arr = await global.db.collection('articles').find().toArray()
    res.send({data: arr})
})

/**
 * @openapi
 * /articles/{:articlesKey}:
 *  get:
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

apiRoutes.get('/articles/:key', async (req, res) => {
    let article = await global.db.collection('articles').findOne({key: req.params.key})
    if (article) {
        res.send({data: article})
    } else {
        res.send({error: 'article not exist'})
    }
})

/**
 * @openapi
 * /categories:
 *  get:
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

apiRoutes.get('/categories', async (req, res) => {
    let arr = await global.db.collection('categories').find().toArray()
    res.send({data: arr})
})

/**
 * @openapi
 * /categories/{:categoryKey}:
 *  get:
 *      responses:
 *          "200":
 *              description: "successful operation"
 *
 */

apiRoutes.get('/categories/:key', async (req, res) => {
    let category = await global.db.collection('categories').findOne({key: req.params.key})
    if (category) {
        res.json({data: category})
    } else {
        res.json({error: 'category not exist'})
    }
})


export default apiRoutes

