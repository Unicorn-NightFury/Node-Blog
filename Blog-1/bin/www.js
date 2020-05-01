// 第一层，架设服务

const http = require('http')

const PORT = 3000;
const serverHandle = require('../App')

const server = http.createServer(serverHandle)

server.listen(PORT, () => console.log('ok'))