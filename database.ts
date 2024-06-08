const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://suprenoctome:epS1kMuwqJFm3tFV@deltahq.7esvtel.mongodb.net/?retryWrites=true&w=majority&appName=deltaHQ";
const databaseName = "shopping_list_app";
const collectionName = "shopping_list"


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function fetchShoppingList() {
    try {
        const collection = await client.db(databaseName).collection(collectionName);
        
        const query = { "name": { $ne: null } };
        const allDocuments = await collection.find(query).toArray();
        console.log(`All documents in the ${collectionName}:`, allDocuments);
    
    } catch (err) {
        console.error('Error fetching items:', err);
    }
}

async function addItem(itemName: string, itemCount: number) {
    try {
        const collection = await client.db(databaseName).collection(collectionName);
        
        const newItem = {
            name: itemName,
            count: itemCount
        };

        const insertResult = await collection.insertOne(newItem);
        console.log("Inserted item ID:", insertResult.insertedId);
  
    } catch (err) {
        console.error("Error inserting item:", err);
    }
}

async function removeItem(itemId: string) {
    try {
        const collection = await client.db(databaseName).collection(collectionName);

        const removeItem = { 
            _id: new ObjectId(itemId) 
        };

        const deleteResult = await collection.deleteOne(removeItem);
        if (deleteResult.deletedCount === 1) {
            console.log(`Successfully deleted ${deleteResult.deletedCount} item(s).`);
        } else {
            console.log(`No items matched itemID: ${itemId}. Deleted ${deleteResult.deletedCount} item(s).`);
        }
    } catch (err) {
        console.error(`Error removing item (itemID: ${itemId}):`, err);
    }
}

async function updateItem(itemId: string, updatedData: any) {
    try {
        const collection = await client.db(databaseName).collection(collectionName);
        
        const updateResult = await collection.updateOne(
            { _id: new ObjectId(itemId) },
            { $set: updatedData }
        );
  
        if (updateResult.modifiedCount === 1) {
            console.log(`Successfully updated ${updateResult.modifiedCount} item.`);
        } else {
            console.log(`No items matched the query. Updated ${updateResult.modifiedCount} item(s).`);
        }
    } catch (err) {
        console.error(`Error updating item (itemID: ${itemId}):`, err);
    }
}

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db(databaseName).command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        let itemName = "Bread";
        let itemCount = 69;
        //await addItem(itemName, itemCount).catch(console.dir);

        let itemId = "6664528a473b8e908df7588f";
        //await removeItem(itemId).catch(console.dir);

        itemId = "66646358d0c94871212728a6";
        const updatedData = {
            "name": "Cheese",
            "count": 2
        };
        //await updateItem(itemId, updatedData);

        await fetchShoppingList().catch(console.dir);

    } catch (err) {
        console.error(err);
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);