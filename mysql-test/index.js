const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'leo0824lch',
    port: 3306,
    database: 'myblog'
})

con.connect();

const sql = `insert into blog (title, content, createtime, author) values ("A", "123", 1588251662704, "Uni")`;

con.query(sql, (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
})

con.end();