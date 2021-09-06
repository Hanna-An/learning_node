import http from 'http'
import Users from "./controllers/Users.js"

const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
    console.log(req.method)
    console.log(req.url)
    switch (req.method) {
        case 'POST':

            switch (req.url) {
                case '/users':
                    try {
                        Users.saveUser(req, res)
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({success: true}))
                    } catch (e) {
                        res.end({error: 'слишком юн'})
                    }
                    break
            }
            break
        case 'GET':
            if (req.url === '/') {
                res.end(`<h1>Hello World</h1>`)
            }
            if (req.url === '/hello') {
                res.end(`<h1>Hello</h1>`)
            }
            break
        default:
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
            break
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


// 6. создать апи POST /users
// body:
// name: string
// birth_date: date

// Поставить валидации:
// 1. name не доджен быть пустым
// 2. на младше 13 лет выдавать ошибку
