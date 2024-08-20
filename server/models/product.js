const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnect");
const { GraphQLError } = require("graphql");

function getProductCollection() {
  const db = getDatabase();
  const productCollection = db.collection("products");

  return productCollection;
}

async function getAllProducts() {
  const collection = getProductCollection();
  const agg = [
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ];
  const products = await collection.aggregate(agg).toArray();

  console.log(products, "<<< products");
  return products;
  // return await collection.find().toArray();
}

async function getProductById(id = "") {
  const collection = getProductCollection();
  const agg = [
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ];

  const product = await collection.aggregate(agg).toArray();

  // console.log(product, "<<< productById");
  return product[0];
  // return await collection.findOne({ _id: new ObjectId(id) });
}

async function createProduct(name = "", price = 0, quantity = 0) {
  const collection = getProductCollection();

  const newProduct = await collection.insertOne({
    name,
    price,
    quantity,
    createdAt: new Date(),
    comments: [],
    likes: [],
  });

  const product = await collection.findOne({ _id: newProduct.insertedId });

  return product;
}

async function deleteProduct(id = "") {
  const collection = getProductCollection();

  return await collection.deleteOne({ _id: new ObjectId(id) });
}

async function addImagesToProduct(url = "", productId = "") {
  console.log({ url, productId });
  const collection = getProductCollection();

  const product = await collection.findOne({ _id: new ObjectId(productId) });

  if (!product) {
    throw new GraphQLError("Product Not Found", {
      extensions: {
        code: "NOT_FOUND",
        http: { status: 404 },
      },
    });
  }

  await collection.updateOne(
    { _id: product._id },
    {
      // $set: {
      //   // ini ngereplace
      //   images: [
      //     {
      //       url,
      //       createdAt: new Date(),
      //     },
      //   ],
      // },
      $push: {
        images: {
          url,
          createdAt: new Date(),
        },
      },
    }
  );

  return await getProductById(productId);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  addImagesToProduct,
};
