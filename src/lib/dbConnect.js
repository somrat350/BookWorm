const { MongoClient, ServerApiVersion } = require("mongodb");

// create client
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectCollection = async (collection) => {
  const db = process.env.DB_NAME;
  return await client.db(db).collection(collection);
};
export const booksCollection = await connectCollection("books");
export const usersCollection = await connectCollection("users");
