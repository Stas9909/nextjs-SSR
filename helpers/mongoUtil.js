import { MongoClient } from 'mongodb';

export const connectToMongo = async () => {
  const client = new MongoClient('mongodb+srv://stasprykhodko1:Hwsvg4KhDuJKOoKC@cluster0.rmymtql.mongodb.net/?retryWrites=true&w=majority');
  const dbName = process.env.DB_NAME || 'burgers-data';
  const db = client.db(dbName);

  try {
    await client.connect();
  } catch (err) {
    throw new Error('Could not connect to db');
  }

  return { client, db };
};

export const getBurgersCollection = async () => {
  const { db } = await connectToMongo();
  const burgersCollection = await db.collection('keyItems')
    .find()
    .sort({ id: 1 })
    .toArray();
  return burgersCollection;
};

export const getBurgerById = async (burgerId) => {
  const { db } = await connectToMongo();
  const burger = await db.collection('keyItems').findOne({ id: burgerId });  
  return burger;
};