import { MongoClient } from 'mongodb'

let client: MongoClient;

/**
 * @description Creates a MongoClient if `client` is undefined, otherwise returns already created client
 * 
 */
export async function createConnection() {
      if (client) return client

      const url = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net'
      client = await MongoClient.connect(url)

      return client
}