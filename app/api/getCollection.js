export default async function getCollection(client) {
    const dbName = "xboard";
    const collectionName = "boards";

    const database = await client.db(dbName);
    const collection = await database.collection(collectionName);
    // console.log(`Collection succesfully gotten: -----> ${collectionName}`);

    return collection;
}
