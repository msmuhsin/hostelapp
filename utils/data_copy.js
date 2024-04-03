const { MongoClient } = require('mongodb')

export default  async function copyData() {
  const uri =
    'mongodb+srv://comcoder314:xDenHAgjlOdpDZwH@cluster0.jys9cxw.mongodb.net/hostelapp?retryWrites=true&w=majority&appName=Cluster0' // Connection URI
  const client = new MongoClient(uri)

  try {
    await client.connect() // Connect to MongoDB

    const sourceCollection = client.db('hostelapp').collection('students')
    const targetCollection = client
      .db('hostelapp')
      .collection('Student_details')

    // Fetch data up to index 50 from the source collection
    const documents = await sourceCollection.find({}).limit(50).toArray()

    // Insert fetched data into the target collection
    await targetCollection.insertMany(documents)

    console.log('Data copied successfully')
  } catch (error) {
    console.error('Error copying data:', error)
  } finally {
    await client.close() // Close the connection
  }
}

copyData()