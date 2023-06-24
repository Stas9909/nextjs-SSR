import { connectToMongo, getBurgersCollection } from '@/helpers/mongoUtil';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  let client;

  if (req.method === 'GET') {
    try {
      ({ client } = await connectToMongo());
      const burgersCollection = await getBurgersCollection()
      res.status(200).json(burgersCollection);
    } catch (err) {
      res.status(500).json({ message: 'Could not get data from db' })
      return;
    }
    finally {
      if (client) {
        client.close();
      }
    }
  }
}


