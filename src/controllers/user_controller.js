const mysql = require('../mysql');
const jwt = require('jsonwebtoken');
const mongo = require('../../db/connection')


module.exports = () => {
    const controller = {}

    controller.listarUsuario = async (req, res) => {
        try {
            const query = 'SELECT * FROM usuarios';
            const result = await mysql.execute(query, [])
            const response = {
                message: 'Lista dos Usuarios: '
            }
            if (result == undefined) {
                const er = new Error();
                er.message = "Não existe valores"
                er.code = "ERR001"
                return res.status(500).send({ response: er })
            }
            return res.status(200).send({ response: response, result: result });
        }
        catch (error) {
            console.log(error)
            return { error: error }
        }
    }

    controller.createUser = async (req, res, next) => {

        try {
            var query = `SELECT * FROM usuarios WHERE email = ?`;
            var result = await mysql.execute(query, [req.body.email]);
            if (result.length > 0) {
                return res.status(409).send({ message: 'Usuário já cadastrado' })
            }

            query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)';
            const results = await mysql.execute(query, [req.body.nome, req.body.email, req.body.senha]);

            const response = {
                message: 'Usuário criado com sucesso',
                createdUser: {
                    userId: results.insertId,
                    nome: req.body.nome,
                    email: req.body.email
                }
            }
            return res.status(201).send(response);

        } catch (error) {
            return res.status(500).send({ error: error });
        }
    };

    controller.Login = async (req, res, next) => {
        try {
            const database = mongo.getDb()
            const result = await database.collection('users').findOne({ 'user': req.body.user })

            if (result != null) {
                if (result.password == req.body.password) {
                    const user = { name: req.body.user }
                    const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                    res.json({ accessToken: refreshToken })
                } else {
                    res.status(401).send(`Senha incorreta`)
                }

            } else { res.status(400).send(`Nao existe esse usuario`) }

        } catch (error) {
            res.status(500).send(`Erro ao fazer login`)
        }
    };

    return controller
}