// 第三层，user 路由的业务逻辑

const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const userHandle = (req, res) => {
    const method = req.method;

    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const result = loginCheck(username, password);
        if (result) {
            return new SuccessModel();
        }
        return new ErrorModel('登录失败!');
    }
}

module.exports = userHandle;