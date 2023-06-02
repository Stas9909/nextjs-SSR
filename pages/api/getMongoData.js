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



// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const client = new MongoClient('mongodb+srv://stasprykhodko1:Hwsvg4KhDuJKOoKC@cluster0.rmymtql.mongodb.net/?retryWrites=true&w=majority');
//     const dbName = process.env.DB_NAME || 'burgers-data';
//     const db = client.db(dbName);

//     try {
//       await client.connect();
//     } catch (err) {
//       res.status(500).json({ message: 'Could not connect to db' })
//       return;
//     }

//     try {
//       const burgersCollection = await db.collection('keyItems')
//         .find()
//         .sort({ id: 1 })
//         .toArray();
//       res.status(200).json(burgersCollection);
//     } catch (err) {
//       res.status(500).json({ message: 'Could not get data from db' })
//       return;
//     } finally {
//       client.close();
//     }
//   }
// }