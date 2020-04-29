const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {

    const url = req.url;
    req.path = url.split("?")[0];

    req.query = querystring.parse(url.split("?")[1]);


    res.setHeader('content-type', "application/json");
    

    const blogData = handleBlogRouter(req, res);
    const userData = handleUserRouter(req, res);

    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        );
        return;
    }

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

}

module.exports = serverHandle;