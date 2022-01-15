const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const {API_PORT} = process.env

const port = API_PORT || process.env.PORT
server.listen(port, () => {
    console.log(`Server runing on Port ${port}`);
})