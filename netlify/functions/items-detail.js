import { db } from './firebase-init.js'

export const handler = async (event) => {
  const { httpMethod, path, body } = event
  const itemId = path.split('/').pop()

  try {
    if (httpMethod === 'GET') {
      // Get single item
      const doc = await db.collection('items').doc(itemId).get()
      if (!doc.exists) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Item not found' }) }
      }
      return {
        statusCode: 200,
        body: JSON.stringify({ id: doc.id, ...doc.data() })
      }
    }

    if (httpMethod === 'PUT') {
      // Update item
      const updates = JSON.parse(body)
      await db.collection('items').doc(itemId).update(updates)
      return {
        statusCode: 200,
        body: JSON.stringify({ id: itemId, ...updates })
      }
    }

    if (httpMethod === 'DELETE') {
      // Delete item
      await db.collection('items').doc(itemId).delete()
      return {
        statusCode: 204,
        body: ''
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
