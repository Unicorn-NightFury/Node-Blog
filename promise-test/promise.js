const fs = require('fs');
const path = require('path');


function getFile(filename) {
    const promise = new Promise((resolve, reject) => {
        const filepath = path.resolve(__dirname, filename);
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })

    return promise
}

getFile("a.json").then(data => {
    console.log(data);
    return getFile(data.next)
})
.then(data => {
    console.log(data);
    return getFile(data.next)
})
.then(data => {
    console.log(data);
})