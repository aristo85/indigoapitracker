const dotenv = require("dotenv");
const mongodb = require("mongodb");
const Agenda = require("agenda");
dotenv.config({ path: "./.env" });
const { config } = require("../config");
const { clearOldAPITrackers } = require("./jobs");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(config.mongoUrl)
    .then((result) => {
      _db = result.db();
      const agenda = new Agenda().mongo(_db, "jobs");
      agenda.define("clear apiTrackers > month", async (job) => {
        // const { name } = job.attrs;
        clearOldAPITrackers(_db);
      });
      (async function () {
        await agenda.start(); // Start Agenda instance

        await agenda.every("2 hours", "clear apiTrackers > month");
      })();
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
