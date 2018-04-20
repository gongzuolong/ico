const mysql = require('mysql2/promise')

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ibook"
  })

  var sql = `create table books(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(255) NOT null,
   py_title VARCHAR(255) NOT null default '',
   author varchar(255) not null,
   img varchar(255) not null default '',
   intro text,
   status tinyint not null default 0,
   finish tinyint not null default 0,
   link varchar(255) not null default '',
   created_at date,
   updated_at date,
   PRIMARY KEY ( id )
  );`
  await connection.execute(sql)
  console.log('created table books')
}

main()

