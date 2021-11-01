import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import handlebars from 'express-handlebars'
import apiRoutes from './routes/api/index.js'
import webRoutes from './routes/web/index.js'
import {MongoClient} from 'mongodb'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'

import {Strategy} from 'passport-local'



const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

let db = null

app.use(
    session({
        secret: '123',
        saveUninitialized: true,
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new Strategy((user, password, done) => {
        if (user !== 'test_user')
            return done(null, false, {
                message: 'User not found',
            })
        else if (password !== 'test_password')
            return done(null, false, {
                message: 'Wrong password',
            })

        return done(null, { id: 1, name: 'Test', age: 21 })
    })
)


app.use(express.static('public'))

app.use((req, res, next) => {
    console.log(req._parsedUrl.path)
    if (req.user) {
        next()
    } else {
        if (req._parsedUrl.path === '/login') {
            next()
        } else {
            next()
            // res.redirect('/login')
        }
    }
})

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

MongoClient.connect(
    'mongodb://localhost:27018',
    async (err, client) => {
        if (err) {
            console.log('Connection error: ', err)
            throw err
        }
        console.log('Connected')
        db = client.db('test')
        global.db = db
    })

app.set('host', host)
app.set('port', port)

app.use('/api', apiRoutes)
app.use('/', webRoutes)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.use(express.static(path.join(__dirname, 'public')))
app.engine(
    'handlebars',
    handlebars({defaultLayout: 'main'})
)
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
    res.status(404).type('application/json')
    res.send('Not found')
})

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})
