// import express from 'express'
// const app = express()
//
// const host = '127.0.0.1'
// const port = 3000
// app.set('host', host)
// app.set('port', port)
//
//
// app.get('/home', (req, res) => {
//     res.status(200).type('text/plain')
//     res.send('Home page')
// })
//
// app.get('/about', (req, res) => {
//     res.status(200).type('text/plain')
//     res.send('About page')
// })
//
// app.post('/api/admin', (req, res) => {
//     res.status(200).type('text/plain')
//     res.send('Create admin request')
// })
//
// app.post('/api/user', (req, res) => {
//     res.status(200).type('text/plain')
//     res.send('Create user request')
// })
//
// app.use((req, res, next) => {
//     res.status(404).type('text/plain')
//     res.send('Not found')
// })
//
// app.listen(port, host, function () {
//     console.log(`Server listens http://${host}:${port}`)
// })


// 1. app.js будет в корне проекта, туда закинуть пример, локально запустить и проверить. Поиграться
// 2. поиграться еще с bash командами: pwd, cd, ls, cat, ps, grep


import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const host = '127.0.0.1'
const port = 3000
app.set('host', host)
app.set('port', port)

app.get('/home', (req, res) => {
    res.status(200).type('text/plain')
    res.send('Home page')
})

app.get('/about', (req, res) => {
    res.status(200).type('text/plain')
    res.send('About page')
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname ,'assets')))

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})
// console.log(path.join(__dirname ,'assets'))


