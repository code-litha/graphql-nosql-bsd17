const { MongoClient } = require("mongodb");
// Connection URL
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

const dbName = "db_bsd_17"; // Database Name

async function mongoConnect() {
  await client.connect();
  console.log("Connected MongoDB successfully");

  return "done.";
}

function getDatabase() {
  const db = client.db(dbName);
  return db;
}

module.exports = {
  mongoConnect,
  getDatabase,
  client,
};
