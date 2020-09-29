const drinskRouter = require('express').Router();
const controllerDrinks = require('../controllers/Drink_Controlller')()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


drinskRouter.get('/Listar', controllerDrinks.listarDrinks)

drinskRouter.post('/adicionar', 
//authToken.authenticateToken, 
upload.single('drink_imagem'),
controllerDrinks.add);

drinskRouter.get('/searchDrink/:id', controllerDrinks.searchbyId);

drinskRouter.put('/update/:id',  controllerDrinks.update);

drinskRouter.delete('/delete/:id', controllerDrinks.delete);

drinskRouter.get('/calculoSoma', controllerDrinks.calculoSoma);

drinskRouter.get('/calculoMap', controllerDrinks.calculoMap);

drinskRouter.get('/calculoFilter', controllerDrinks.calculoFilter);

drinskRouter.get('/calculoReduce', controllerDrinks.calculoReduce);

drinskRouter.get('/readyaml', controllerDrinks.readyaml);

drinskRouter.get('/download/:nomeArc', controllerDrinks.download);


module.exports = drinskRouter;
