const { MongoClient, ObjectID, ObjectId} = require('mongodb');	// require the mongodb driver

/**
 * Uses mongodb v3.6+ - [API Documentation](http://mongodb.github.io/node-mongodb-native/3.6/api/)
 * Database wraps a mongoDB connection to provide a higher-level abstraction layer
 * for manipulating the objects in our cpen322 app.
 */
function Database(mongoUrl, dbName){
    if (!(this instanceof Database)) return new Database(mongoUrl, dbName);
    this.connected = new Promise((resolve, reject) => {
        MongoClient.connect(
            mongoUrl,
            {
                useNewUrlParser: true
            },
            (err, client) => {
                if (err) reject(err);
                else {
                    console.log('[MongoClient] Connected to ' + mongoUrl + '/' + dbName);
                    resolve(client.db(dbName));
                }
            }
        )
    });
    this.status = () => this.connected.then(
        db => ({ error: null, url: mongoUrl, db: dbName }),
        err => ({ error: err })
    );
}

Database.prototype.getRooms = function(){
    return this.connected.then(db =>
        new Promise((resolve, reject) => {
            /* TODO: read the chatrooms from `db`
             * and resolve an array of chatrooms */
            db.collection('chatrooms').find().toArray((err, room) => {
                if (err){
                    reject(err);
                }
                resolve(room);
            })
        })
    )
}

Database.prototype.add = function(song){
    return this.connected.then(db =>
        new Promise((resolve, reject) => {
            resolve(song);
        })
    )
}


module.exports = Database;