const userHandle = (req, res) => {
    const method = req.method;

    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: '这个是用户登录接口'
        }
    }
}

module.exports = userHandle;