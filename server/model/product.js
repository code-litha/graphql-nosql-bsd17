const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnect");

function getProductCollection() {
  const db = getDatabase();
  const productCollection = db.collection("products");

  return productCollection;
}

async function getAllProducts() {
  const collection = getProductCollection();
  return await collection.find().toArray();
}

async function getProductById(id = "") {
  const collection = getProductCollection();
  return await collection.findOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAllProducts,
  getProductById,
};
