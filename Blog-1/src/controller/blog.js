const getList = (author, keyword) => {
    // 假数据测试
    return [
        {
            id: 1,
            title: "标题A",
            content: "内容A",
            createTime: 1588130689900,
            author: "Uni"
        },
        {
            id: 2,
            title: "标题B",
            content: "内容B",
            createTime: 1588130746184,
            author: "coco"
        }
    ]
}

const getDetail = id => {
    return  {
        id: 1,
        title: "标题A",
        content: "内容A",
        createTime: 1588130689900,
        author: "Uni"
    }
}


module.exports = {
    getList,
    getDetail
}