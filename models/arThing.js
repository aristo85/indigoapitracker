const { getDb } = require("../util/database");

class ARThing {
  constructor(name, createdAt, userId) {
    this.name = name;
    this.createdAt = createdAt;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db
      .collection("arthings")
      .insertOne(this)
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static findByName(arName) {
    const db = getDb();
    return db.collection("arthings").findOne({ name: arName });
  }

  static findARThingByUserId(userId) {
    const db = getDb();
    return db.collection("arthings").findOne({ userId });
  }
}

module.exports = ARThing;
