const mysql = require('../mysql').pool;

module.exports = () => {

    const controller = {}

    const drinksData = require('../data/drinks.json')
    const drinks = drinksData;

    controller.listarDrinks = (req, res) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query('SELECT * FROM drinks',
                (error, result, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    return res.status(200).send({ response: result });
                }
            )
        });
    }

    controller.add = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            conn.query(
                'INSERT INTO drinks (nome,tipo,ingrediente) VALUES (?,?,?)',
                [req.body.nome, req.body.tipo, req.body.ingrediente],
                (error, result, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        message: 'Pedido inserido com sucesso',
                    }
                    return res.status(201).send(response);
                }
            )
        })
    }

    controller.searchbyId = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(
                'SELECT * FROM drinks WHERE drinkID = ?;',
                [req.params.id],
                (error, result, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    return res.status(200).send({ response: result });
                }
            )
        });
    };


    controller.update = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            conn.query(
                ` UPDATE drinks
                    SET nome = ?,
                        tipo = ?,
                        ingrediente = ?
                    WHERE drinkID = ?`,
                [req.body.nome, req.body.tipo, req.body.ingrediente, req.params.id],
                (error, result, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        message: 'Atualizado com sucesso',
                    }
                    return res.status(202).send(response);
                }
            )
        })
    };

    controller.delete = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            conn.query(
                ` DELETE FROM drinks WHERE drinkID = ?`,
                [req.params.id],
                (error, result, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        message: 'Removido com sucesso',
                    }
                    return res.status(202).send(response);
                }
            )
        })
    };

    return controller;
}