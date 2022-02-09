const dotenv = require("dotenv");
const mongodb = require("mongodb");
dotenv.config({ path: "./.env" });
const { config } = require("../config");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(config.mongoUrl)
    .then((result) => {
      _db = result.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) return _db;
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
