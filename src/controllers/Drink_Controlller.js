const mysql = require('../mysql');
const connectionPool = require('../mysql')
var formidable = require('formidable');
const yaml = require('js-yaml')
const fsextra = require('fs-extra');
const { restart } = require('nodemon');
const { ReadStream } = require('fs-extra');
const mongo = require('../../db/connection')
const ObjectID = require('mongodb').ObjectID;


module.exports = () => {

    const controller = {}

    controller.listarDrinks = async(req, res) => {
        try {
            const database = mongo.getDb()
            const result = await database.collection('drinks').find({})

            res.send(await result.toArray())

        } catch (error) {
            console.log(error);
            res.status(500).send(`Nao foi possivel realizar a sua solicitacao`)
        }
    }


    controller.add = async(req, res, next) => {

        try {

            const database = mongo.getDb()
            const result = await database.collection('drinks').insertOne(req.body)

            res.send(`Cadastrado com sucesso`)
        } catch (error) {
            res.status(500).send(`Nao foi possivel realizar a sua solicitacao`)
        }
    }

    controller.searchbyName = async(req, res, next) => {
        if (req.params.name != undefined) {
            try {

                const database = mongo.getDb()
                const result = await database.collection('drinks').find({ 'nome_drink': req.params.name })
                res.send(await result.toArray())
            } catch (error) {
                res.status(500).send(`Nao foi possivel realizar a sua solicitacao`)
            }
        } else {
            res.status(404).send("Deu ruim")
        }
    };

    controller.searchbyType = async(req, res, next) => {
        if (req.params.type != undefined) {
            try {

                const database = mongo.getDb()
                const result = await database.collection('drinks').find({ 'tipo': req.params.type })
                res.send(await result.toArray())

            } catch (error) {
                console.log(error)
                res.status(500).send(`Nao foi possivel realizar a sua solicitacao`)
            }
        } else {
            res.status(404).send("Deu ruim")
        }
    };

    controller.searchbyValue = async(req, res, next) => {
        if (req.params.value != undefined) {
            try {
                const database = mongo.getDb()
                const result = await database.collection('drinks').find({ 'valor': req.params.value })
                res.send(await result.toArray())
            } catch (error) {
                res.status(500).send(`Nao foi possivel realizar a sua solicitacao`)
            }
        } else {
            res.status(404).send("Deu ruim")
        }
    };


    controller.delete = async(req, res, next) => {
        if (req.params.id != undefined) {
            const database = mongo.getDb()
            const result = await database.collection('drinks').deleteOne({ "_id": ObjectID(req.params.id) })
            if (result.matchedCount == 0) {
                res.send('Nenhum documento deletado');
            } else {
                res.send('Deletado com sucesso');
            }
        } else { res.status(401).send(`Informe a ID a ser deletado`) }
    };



    controller.update = async(req, res, next) => {
        if (req.params.id != undefined) {
            const database = mongo.getDb()
            const result = await database.collection('drinks').updateOne({ "_id": ObjectID(req.params.id) }, { $set: { "ingredientes": req.body.ingredientes } })

            console.log(req.params.id)
            if (result.matchedCount == 0) {
                res.send('Nenhum arquivo alterado');
            } else {
                res.send('Valor alterado com sucesso');
            }
        } else { res.status(401).send(`Informe a ID a ser alterada`) }
    };



    controller.calculoSoma = async(req, res, next) => {
        try {
            const query = ` SELECT SUM(valor) AS total FROM drinks`
            const result = await mysql.execute(query, [])
            const response = {
                message: 'Somado com sucesso',
            }
            return res.status(202).send({ resp: response, res: result });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: error })
        }
    };

    controller.calculoMap = async(req, res, next) => {
        try {
            const query = `SELECT valor, quantidade FROM drinks;`
            const result = await mysql.execute(query, [])
            const promise = result.map((task) => task.valor * task.quantidade);
            const results = await Promise.all(promise)
            return res.status(202).send({ message: 'Maping', result: results });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: error })
        }
    };

    controller.calculoFilter = async(req, res, next) => {
        try {
            const query = `SELECT nome, quantidade FROM drinks;`
            const result = await mysql.execute(query, [])
            const promise = result.filter((task) => task.quantidade > 100);
            const results = await Promise.all(promise)
            return res.status(202).send({ message: 'Filter', result: results });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: error })
        }
    };

    controller.calculoReduce = async(req, res, next) => {
        try {
            const query = `SELECT nome FROM drinks;`
            const result = await mysql.execute(query, [])
            const promise = result.reduce((prev, curr) => (prev.name ? prev.name : prev) + ', ' + curr.name);
            const results = await Promise.all(promise)
            return res.status(202).send({ message: 'Reduce', result: result });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: error })
        }
    };

    controller.readyaml = (req, res, next) => {
        try {
            let fileContents = fsextra.readFileSync('./rec/gg.yaml', 'utf8');
            let data = yaml.safeLoad(fileContents);
            console.log(data)
            if (data == null) {
                const error = new Error("nada nessa vida acontece por acaso")
                const message = "checklogs"
                return res.status(400).send({ res: message });
            }
        } catch (e) {
            console.log(e);
        }
    };

    controller.download = (req, res, next) => {
        const { nomeArc } = req.params

        try {
            let r = fsextra.createReadStream('./storage/' + nomeArc)
            r.on('open', function() {
                r.pipe(res)
            })

        } catch (e) {
            console.log(e)
        }
        console.log(nomeArc)
    };



    return controller;
}