const { GraphQLError } = require("graphql");
const { verifyToken } = require("./jwt");
const { findUserById } = require("../models/user");

const authentication = async (req) => {
  // console.log("context auth dipanggil");
  const authorization = req.headers.authorization || "";

  // console.log(token, "<<< token");
  if (!authorization) {
    throw new GraphQLError("Invalid token", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
      },
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new GraphQLError("Invalid token", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
      },
    });
  }

  const decodedToken = verifyToken(token);

  // console.log(decodedToken, "<<< decodedToken");

  const user = await findUserById(decodedToken.id);

  if (!user) {
    throw new GraphQLError("Invalid token", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
      },
    });
  }

  return {
    userId: user._id,
    username: user.username,
  };
};

module.exports = authentication;
