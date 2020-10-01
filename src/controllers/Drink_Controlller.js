const mysql = require('../mysql');
const connectionPool = require('../mysql')
var formidable = require('formidable');
const yaml = require('js-yaml')
const fsextra = require('fs-extra');
const { restart } = require('nodemon');
const { ReadStream } = require('fs-extra');

module.exports = () => {

    const controller = {}

    const drinksData = require('../data/drinks.json')
    const drinks = drinksData;

    controller.listarDrinks = async (req, res) => {
        try{
            const query = 'SELECT * FROM drinks';
            const result = await mysql.execute(query, [])
            const response = {
                message: 'Lista dos Drinks: '
            }
            if(result == undefined){
                const er = new Error();
                er.message = "Não existe valores"
                er.code = "ERR001"
                return res.status(500).send({response: er})
            }
            return res.status(200).send({ response: response, result: result });
        }
        catch (error){
            console.log(error)
            return{error: error}
        }
    }


    controller.add = async (req, res, next) => {
        try{
            const query = 'INSERT INTO drinks (nome,tipo,ingrediente,valor,quantidade,drink_imagem) VALUES (?,?,?,?,?,?)';
            const result = await mysql.execute(query, [req.body.nome, req.body.tipo, req.body.ingrediente, req.body.valor, req.body.quantidade, req.file.path])
            if(result.length == 0){
                return res.status(404).send({message : ' Não encontrado ', code : 'ERR002'})
            }
            const response = {
                message: 'Drink inserido com sucesso!',                    
                createdDrink: {
                    nome: req.body.nome,
                    tipo: req.body.tipo,
                    ingrediente: req.body.ingrediente,
                    valor: req.body.valor,
                    quantidade: req.body.quantidade,
                    Imagem: req.file.path,
                    request: {
                        type: 'POST',
                        description: 'Retorna os Drinks',
                    }
                }
            }
            return res.status(201).send(response);
        }
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    }

    controller.searchbyId = async (req, res, next) => {
        try{
            const query = 'SELECT * FROM drinks WHERE drinkID = ?;'
            const result = await mysql.execute(query, [req.params.id])
            if(result.length == 0){
                return res.status(404).send({message : ' Não encontrado ', code : 'ERR002'})
            }
            const response = {
                message: 'Drink com este ID: '
            }
            return res.status(201).send({message: response, result: result});
        }
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    };


    controller.update = async (req, res, next) => {
        try {
            const query = ` UPDATE drinks SET nome = ?, tipo = ?, ingrediente = ?, valor = ? , quantidade = ? WHERE drinkID = ?`
            const result = await mysql.execute(query, [req.body.nome, req.body.tipo, req.body.ingrediente, req.body.valor, req.body.quantidade, req.params.id])
            if(result.length == 0){
                return res.status(404).send({message : ' Não encontrado ', code : 'ERR002'})
            }
            const response = {
                message: 'Atualizado com sucesso!',                    
                createdDrink: {
                    nome: req.body.nome,
                    tipo: req.body.tipo,
                    ingrediente: req.body.ingrediente,
                    valor: req.body.valor,
                    quantidade: req.body.quantidade,
                    request: {
                        type: 'UPDATE',
                        description: 'Drink',
                    }
                }
            }
            return res.status(201).send({message: response});
        }
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    };

    controller.delete = async (req, res, next) => {
        try{
            var query2 = `SELECT * FROM drinks WHERE drinkID = ?`;
            var result2 = await mysql.execute(query2, [req.params.id])
            if (result2.length != 0) {
                const query = ` DELETE FROM drinks WHERE drinkID = ?`
                const result = await mysql.execute(query, [req.params.id])
                if(result.length == 0){
                    return res.status(404).send({message : ' Não encontrado ', code : 'ERR002'})
                }
                const response = {
                    message: 'Drink removido com sucesso',
                    request: {
                        nome: req.body.nome,
                        tipo: req.body.tipo,
                        type: 'DELETE',
                        description: 'Deleta um Drink',
                    }
                }
                return res.status(202).send(response); 
            }
            else{
                return res.status(404).send({ message: 'Esse drink nao existe', code: 'ERR009' })
            }

        }
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    };

    controller.calculoSoma = async (req, res, next) => {
        try{
            const query =  ` SELECT SUM(valor) AS total FROM drinks`
            const result = await mysql.execute(query, [] )
            const response = {
                message: 'Somado com sucesso',
            }
            return res.status(202).send({ resp: response, res: result});
        }
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    };

    controller.calculoMap = async (req, res, next) => {
        try{
            const query =  `SELECT valor, quantidade FROM drinks;`
            const result = await mysql.execute(query, [] )
            const promise = result.map((task) => task.valor*task.quantidade);
            const results = await Promise.all(promise)
            return res.status(202).send({ message: 'Maping', result: results});
        } 
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    };

    controller.calculoFilter = async(req, res, next) => {
        try{
            const query =  `SELECT nome, quantidade FROM drinks;`
            const result = await mysql.execute(query, [] )
            const promise = result.filter((task) => task.quantidade>100);
            const results = await Promise.all(promise)
            return res.status(202).send({ message: 'Filter', result: results});
        }
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    };

    controller.calculoReduce = async(req, res, next) => {
        try{
            const query =  `SELECT nome FROM drinks;`
            const result = await mysql.execute(query, [] )
            const promise = result.reduce((prev, curr) => (prev.name ? prev.name : prev) + ', ' + curr.name);
            const results = await Promise.all(promise)
            return res.status(202).send({ message: 'Reduce', result: result});
        }
        catch (error){
            console.log(error)
            return res.status(500).send({error: error})
        }
    };

    controller.readyaml = (req, res, next) => {
        try {
            let fileContents = fsextra.readFileSync('./rec/gg.yaml', 'utf8');
            let data = yaml.safeLoad(fileContents);
            console.log(data)
            if(data == null){
                const error = new Error("nada nessa vida acontece por acaso")
                const message = "checklogs"
                return res.status(400).send({ res: message});
            }
        } catch (e) {
            console.log(e);
        }
    };

    controller.download = (req, res, next) => {
        const {nomeArc} = req.params

        try {
            let r = fsextra.createReadStream('./storage/' + nomeArc)
            r.on('open',function(){
                r.pipe(res)
            })

        }catch (e){
            console.log(e)
        }
       console.log(nomeArc)


    //    var download = function(url, dest, cb) {
    //     var file = fs.createWriteStream(dest);
    //     var request = http.get(url, function(response) {
    //       response.pipe(file);
    //       file.on('finish', function() {
    //         file.close(cb);  // close() is async, call cb after close completes.
    //       });
    //     }).on('error', function(err) { // Handle errors
    //       fs.unlink(dest); // Delete the file async. (But we don't check the result)
    //       if (cb) cb(err.message);
    //     });
    //   };
    };


    
    return controller;
}