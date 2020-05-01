// 第二层，设置路由

const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPsotData = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }

            resolve(
                JSON.parse(postData)
            )
        })
    })

    return promise;
}

const serverHandle = (req, res) => {

    const url = req.url;
    req.path = url.split("?")[0];

    req.query = querystring.parse(url.split("?")[1]);

 
    res.setHeader('content-type', "application/json");
    
    getPsotData(req).then(postData => {
        req.body = postData;


        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)        
                )
            })
            return;
        }
        
    
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            );
            return;
        }
    
        // 未命中路由，则返回 404
        res.writeHead(404, {'content-type': 'text/plain'});
        res.write('404 not found\n');
        res.end();
    })


}

module.exports = serverHandle;