const express = require('express');
const routes = express.Router();

// routes ------------------------

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('select * from books', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body)
        conn.query('insert into books set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send("libro añadido")
        })
    })
})

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body)
        conn.query('delete from books where id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send("libro eliminado")
        })
    })
})

routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        // console.log(req.body)
        conn.query('update bookS set ? where id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send("libro modificado")
        })
    })
})

module.exports = routes