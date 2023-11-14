const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Gabriel:";


var _db;

module.exports = {
    connect: (callback) => {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            _db = client.db('drinksdb')
            // client.db().collection(``)
            return callback(err)
        });
    },

    getDb: () => {
        return _db;
    }
}
