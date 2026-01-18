import { db } from './firebase-init.js'

export const handler = async (event) => {
  const { httpMethod, body } = event

  try {
    if (httpMethod === 'GET') {
      // Get all items
      const snapshot = await db.collection('items').get()
      const items = []
      snapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() })
      })
      return {
        statusCode: 200,
        body: JSON.stringify(items)
      }
    }

    if (httpMethod === 'POST') {
      // Add new item
      const item = JSON.parse(body)
      const docRef = await db.collection('items').add({
        ...item,
        createdAt: new Date().toISOString()
      })
      return {
        statusCode: 201,
        body: JSON.stringify({ id: docRef.id, ...item })
      }
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
