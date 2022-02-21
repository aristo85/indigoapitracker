exports.clearOldAPITrackers = async (db) => {
  const fromLastMonth = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
  console.log("clear last months data ", fromLastMonth);
  db.collection("users").updateMany(
    {},
    {
      $pull: { apiTracker: { createdAt: { $lte: fromLastMonth } } },
    }
  );
};
