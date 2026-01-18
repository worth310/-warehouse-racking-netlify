import { db } from './firebase-init.js'

export const handler = async (event) => {
  const { queryStringParameters } = event

  try {
    const query = queryStringParameters?.q?.toLowerCase() || ''
    
    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Query parameter required' })
      }
    }

    // Search across SKU, name, and location
    const snapshot = await db.collection('items').get()
    const results = []

    snapshot.forEach(doc => {
      const data = doc.data()
      if (
        data.sku?.toLowerCase().includes(query) ||
        data.name?.toLowerCase().includes(query) ||
        data.location?.toLowerCase().includes(query)
      ) {
        results.push({ id: doc.id, ...data })
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
