const mongodb = require("mongodb");
const { getDb } = require("../util/database");

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, password, name, wallet, accessKey, createdAt) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.wallet = wallet;
    this.accessKey = accessKey;
    this.createdAt = createdAt;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static updateUser(userId, name) {
    const db = getDb();
    return db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: { name },
        $currentDate: { lastModified: true },
      }
    );
  }

  static updateUserApikeyTracker(accessKey, apiTracker) {
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ accessKey }, { $push: { apiTracker } });
  }

  static findUserByAccessKey(accessKey) {
    const db = getDb();
    return db.collection("users").findOne({ accessKey });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .next(); // or we could use findOne, then 'next' wouldnt need
  }

  static findByWallet(walletAddress) {
    const db = getDb();
    return db.collection("users").find({ wallet: walletAddress }).next();
  }

  static findByUsername(username) {
    const db = getDb();
    return db.collection("users").find({ username: username }).next();
  }

  static findByEmailUsernameWallet(email, username, wallet) {
    const db = getDb();
    return db
      .collection("users")
      .find({ $or: [{ email }, { username }, { wallet }] })
      .next();
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("users")
      .find()
      .toArray()
      .then((users) => {
        return users;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findOneUserByEmail(email) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ email })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
