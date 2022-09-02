# REST API with MySQL

## Description

This is actually my first REST API using MySQL database. Here is a simple API that lets users perform simple CRUD operation (create account, find account, update and delete)

## Challenges

While I took time to learn the syntax of using SQL statements to interact with MySQL database, I faced a challenge while building the API.

I was finding it difficult to implement the UPDATE operation where a user can edit a specific data.

I solved this challenge using:

```javascript
const sql = `UPDATE IGNORE users SET fullname=?, age=?, email=? WHERE id=? `;
mysqlConnection.query(sql, [fullname, age, email, id], (err, result) => {
  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  } else {
    if (result.affectedRows == 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      data: result,
    });
  }
});
```

## Helpful Links

[Build a REST API with Node JS Express + MySQL CRUD - Create, Read, Update and Delete](https://youtu.be/tMZ2UEQxidM)
