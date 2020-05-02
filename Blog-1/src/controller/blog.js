const {exec} = require('../db/mysql.js');

const getList = (author, keyword) => {
    let sql = `select * from blog where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = id => {
    const sql = `select * from blog where id='${id}'`;
    return exec(sql).then(rows => {
        return rows[0];
    })
}

const newBlog = (blogData = {}) => {
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now();

    const sql = `
        insert into blog (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}')
    `

    return exec(sql).then(insertData => {
        console.log(insertData);
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const {title, content} = blogData;

    const sql = `
        update blog set title='${title}', content='${content}' where id=${id}
    `

    return exec(sql).then(updateData => {
        console.log(updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false;
    })

}

const deleteBlog = (id, author) => {
    const sql = `delete from blog where id='${id}' and author='${author}'`

    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }

        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}