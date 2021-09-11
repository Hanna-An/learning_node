import http from 'http'
import fs from 'fs'

const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
    console.log(req.method)
    console.log(req.url)
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/users':
                    try {
                        req.on('data', chunk => {
                            let data = JSON.parse(chunk)
                            if (data.name === '') {
                                console.error('поле не должно быть пустым')
                            }
                            if (data.category === '') {
                                console.error('поле не должно быть пустым')
                            }
                            let dir = './temp'
                            console.log(data)
                            if (!fs.existsSync(dir)) {
                                fs.mkdirSync(dir)
                            }
                            fs.appendFileSync(`./temp/${data.category}.txt`, data.name + '\n')
                        })
                        req.on('end', () => {
                            }
                        )
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({success: true}))
                    } catch (e) {
                        res.end({error: 'введите имя'})
                    }
                    break
            }
            break
    }
})
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

