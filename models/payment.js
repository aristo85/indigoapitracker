const mongodb = require("mongodb");
const { getDb } = require("../util/database");

const ObjectId = mongodb.ObjectId;

class Payment {
  constructor(
    userId,
    sessionId,
    amount,
    currency,
    expiresAt,
    paymentMethod,
    paymentStatus,
    createdAt,
    statusId
  ) {
    this.userId = userId;
    this.sessionId = sessionId;
    this.amount = amount;
    this.currency = currency;
    this.expiresAt = expiresAt;
    this.paymentMethod = paymentMethod;
    this.paymentStatus = paymentStatus;
    this.createdAt = createdAt;
    this.statusId = statusId;
  }

  save() {
    const db = getDb();
    return db
      .collection("payments")
      .insertOne(this)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static updatePaymentStatusByStatusId(statusId, paymentStatus) {
    const db = getDb();
    return db.collection("payments").updateOne(
      { statusId },
      {
        $set: { paymentStatus },
        $currentDate: { lastModified: true },
      }
    );
  }

  static findPaymentByStatusId(statusId, userId) {
    const db = getDb();
    return db
      .collection("payments")
      .findOne({ statusId, userId });
  }

  static findById(paymentId) {
    const db = getDb();
    return db
      .collection("payments")
      .find({ _id: new ObjectId(paymentId) })
      .next(); // or we could use findOne, then 'next' wouldnt need
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("payments")
      .find()
      .toArray()
      .then((payments) => {
        return payments;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Payment;
