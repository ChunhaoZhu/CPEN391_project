const {MongoClient, GridFSBucket} = require('mongodb');	// require the mongodb driver
const Grid = require('gridfs-stream');
const MongoGridFS = require('mongo-gridfs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
var CONFIG = require('./config.json');

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
        err => ({ error: err }),
    );
}

Database.prototype.get = function(collection){
    return this.connected.then(db =>
        new Promise((resolve, reject) => {
            db.collection(collection).find().toArray((err, data) => {
                if (err){
                    reject(err);
                }
                resolve(data);
            })
        })
    )
}

Database.prototype.add = function(collection, data){
    return this.connected.then(db =>
        new Promise((resolve, reject) => {
            db.collection(collection).insertOne(data).then(result => {
                resolve(data);
            }, err => {
                reject(err);
            });
        })
    )
}

Database.prototype.delete = function(collection, firstname, lastname){
    return this.connected.then(db =>
        new Promise((resolve, reject) => {
            db.collection(collection).findOne({first_name: firstname, last_name: lastname}).then(result => {
                db.collection(collection).deleteOne(result);
                resolve("delete successful");
            }, err => {
                reject(err);
            })
        })
    ) 
}


const password = process.env.DBpassword || CONFIG.mysql.passwd.toString();
const DBurl = 'mongodb+srv://391:' + password + '@cluster0.qh5yv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const db = new Database(DBurl, 'cpen391');

let gfs, gfsBucket;

Database.prototype.initgfs = function(){
    return this.connected.then(db =>
        new Promise((resolve, reject) => {
            gfs = Grid(db, MongoClient);
            gfs.collection('fs');
            resolve(gfs);
        })
    )
}

Database.prototype.initgfsbucket = function(){
    return this.connected.then(db =>
        new Promise((resolve, reject) => {
            gfsBucket = new GridFSBucket(db);
            resolve(gfsBucket);
        })
    )
}

module.exports = db;