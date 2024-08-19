// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql    #ini wajib tambahkan paling awal
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    author: String
    tags: [String]
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    books: [Book]
    getBooks: [Book]  # endpoint getBooks yang mereturn data dengan type array of Book 
    getBookById (bookId: ID!) : Book  # endpoint getBooksById yang meminta arguments bookId yang mereturn data dengan type Book 
  }

  input BookInput {
    title: String!
    author: String!
    tags: [String]
    imageUrl: String
  }

  type Mutation {
    # addBook (title: String!, author: String!, tags: [String], imageUrl: String) : Book
    addBook (input: BookInput): Book
  }
`;

const dataBook = [
  {
    id: 1,
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: 2,
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => {
      // disini nanti akan ngambil ke database
      return dataBook;
    },
    getBooks: () => dataBook,
    getBookById: (parent, args) => {
      // console.log(args, "<<< args");
      const { bookId } = args;

      const findBook = dataBook.find((el) => el.id == bookId);

      return findBook;
    },
  },
  Mutation: {
    addBook: (parent, args) => {
      // console.log(args, "<<< args");
      const { title, author, tags, imageUrl } = args.input;
      const lastBook = dataBook[dataBook.length - 1];
      const newBook = {
        id: lastBook.id + 1,
        title,
        author,
        tags,
        imageUrl,
      };

      dataBook.push(newBook);

      return newBook;
    },
  },
};

module.exports = {
  bookTypeDefs: typeDefs,
  bookResolvers: resolvers,
};
