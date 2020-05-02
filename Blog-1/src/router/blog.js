// 第三层，blog 路由的业务逻辑

const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
       const result = getDetail(id);
       return result.then(data => {
           return new SuccessModel(data); 
       })
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = "Uni";    // 假数据
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })   
    }

    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    if(method === 'POST' && req.path === '/api/blog/delete') {
        const author = "Uni"   // 假数据
        const result = deleteBlog(id, author);

        return result.then(delVal => {
            if (delVal) {
                return new SuccessModel();
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }

}

module.exports =  handleBlogRouter;