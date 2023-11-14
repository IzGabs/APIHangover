const mongo = require('../../db/connection')
const ObjectID = require('mongodb').ObjectID;

module.exports = () => {
    const controller = {}


    controller.cadastrar = async(req, res, next) => {
        try {

            const database = mongo.getDb()
            const result = await database.collection('foods').insertOne(req.body)
            res.send(`Cadastrado com sucesso, ID: ${result.insertedId}`)
        } catch (error) {
            console.log(error)
            res.status(500).send(`Nao foi possivel realizar a sua solicitacao`)
        }

    }

    controller.listar = async(req, res, next) => {
        try {
            const database = mongo.getDb()
            const result = await database.collection('foods').find({})

            res.send(await result.toArray())
        } catch (error) {
            console.log(error);
            res.status(500).send(`Nao foi possivel realizar a sua solicitacao`)
        }
    }

    controller.update = async(req, res, next) => {
        if (req.params.id != undefined) {
            const database = mongo.getDb()
            const result = await database.collection('foods').updateOne({ "_id": ObjectID(req.params.id) }, { $set: { "valor": req.body.valor } })

            console.log(req.params.id)
            if (result.matchedCount == 0) {
                res.send('Nenhum arquivo alterado');
            } else {
                res.send('Valor alterado com sucesso');
            }
        } else { res.status(401).send(`Informe a ID a ser alterada`) }

    }

    controller.delete = async(req, res, next) => {

        if (req.params.id != undefined) {
            const database = mongo.getDb()
            const result = await database.collection('foods').deleteOne({ "_id": ObjectID(req.params.id) })

            console.log(req.params.id)
            if (result.matchedCount == 0) {
                res.send('Nenhum documento deletado');
            } else {
                res.send('Deletado com sucesso');
            }
        } else { res.status(401).send(`Informe a ID a ser deletado`) }
    }


    return controller;
}