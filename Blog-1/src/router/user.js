// 第三层，user 路由的业务逻辑

const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log(d.toGMTString())
    return d.toUTCString()
}

const handleUserRouter = (req, res) => {
    const method = req.method;

    if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body;

        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if(data.username) {
                res.setHeader('set-cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel(
                {
                    username: req.cookie.username
                }
            ))
        }
        return Promise.resolve(new ErrorModel('尚未登录')) 
    }
}

module.exports = handleUserRouter;