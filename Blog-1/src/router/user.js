const userHandle = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split("?")[0];

    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: '这个是用户登录接口'
        }
    }
}

module.exports = userHandle;