import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  doc, 
  query,
  where,
  onSnapshot 
} from 'firebase/firestore'
import { db, isFirebaseEnabled } from './firebaseConfig'

// Cloud sync service - syncs data between devices via Firebase
export const dataService = {
  // Load all items from cloud
  loadItems: async (userId) => {
    if (!isFirebaseEnabled) {
      console.log("Firebase not enabled, using localStorage")
      return JSON.parse(localStorage.getItem('warehouseItems') || '[]')
    }

    try {
      const itemsRef = collection(db, 'users', userId, 'items')
      const snapshot = await getDocs(itemsRef)
      const items = []
      snapshot.forEach(doc => {
        items.push({ ...doc.data(), id: doc.id })
      })
      return items
    } catch (error) {
      console.error("Error loading items from cloud:", error)
      // Fallback to localStorage
      return JSON.parse(localStorage.getItem('warehouseItems') || '[]')
    }
  },

  // Listen for real-time updates from cloud
  subscribeToItems: (userId, onUpdate) => {
    if (!isFirebaseEnabled) {
      return () => {} // No-op
    }

    try {
      const itemsRef = collection(db, 'users', userId, 'items')
      const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
        const items = []
        snapshot.forEach(doc => {
          items.push({ ...doc.data(), id: doc.id })
        })
        onUpdate(items)
      })
      return unsubscribe
    } catch (error) {
      console.error("Error subscribing to items:", error)
      return () => {}
    }
  },

  // Add new item to cloud
  addItem: async (userId, itemData) => {
    if (!isFirebaseEnabled) {
      console.log("Firebase not enabled, saving to localStorage only")
      return { id: Date.now(), ...itemData }
    }

    try {
      const itemsRef = collection(db, 'users', userId, 'items')
      const docRef = await addDoc(itemsRef, {
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      return { id: docRef.id, ...itemData }
    } catch (error) {
      console.error("Error adding item:", error)
      return { id: Date.now(), ...itemData }
    }
  },

  // Update item in cloud
  updateItem: async (userId, itemId, itemData) => {
    if (!isFirebaseEnabled) {
      return { id: itemId, ...itemData }
    }

    try {
      const itemRef = doc(db, 'users', userId, 'items', itemId)
      await updateDoc(itemRef, {
        ...itemData,
        updatedAt: new Date().toISOString()
      })
      return { id: itemId, ...itemData }
    } catch (error) {
      console.error("Error updating item:", error)
      return { id: itemId, ...itemData }
    }
  },

  // Delete item from cloud
  deleteItem: async (userId, itemId) => {
    if (!isFirebaseEnabled) {
      return true
    }

    try {
      const itemRef = doc(db, 'users', userId, 'items', itemId)
      await deleteDoc(itemRef)
      return true
    } catch (error) {
      console.error("Error deleting item:", error)
      return true
    }
  },

  // Save activity log to cloud
  saveActivityLog: async (userId, logData) => {
    if (!isFirebaseEnabled) {
      localStorage.setItem('activityLog', JSON.stringify(logData))
      return
    }

    try {
      const logsRef = doc(db, 'users', userId, 'activityLog', 'log')
      await updateDoc(logsRef, {
        entries: logData,
        updatedAt: new Date().toISOString()
      }).catch(async () => {
        // Create if doesn't exist
        const logsRef = collection(db, 'users', userId)
        await addDoc(logsRef, {
          type: 'activityLog',
          entries: logData,
          createdAt: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error("Error saving activity log:", error)
    }
  },

  // Load activity log from cloud
  loadActivityLog: async (userId) => {
    if (!isFirebaseEnabled) {
      return JSON.parse(localStorage.getItem('activityLog') || '[]')
    }

    try {
      const logsRef = doc(db, 'users', userId, 'activityLog', 'log')
      const snapshot = await getDocs(query(collection(db, 'users', userId)))
      let logData = []
      snapshot.forEach(doc => {
        if (doc.data().type === 'activityLog') {
          logData = doc.data().entries || []
        }
      })
      return logData
    } catch (error) {
      console.error("Error loading activity log:", error)
      return JSON.parse(localStorage.getItem('activityLog') || '[]')
    }
  }
}

export default dataService
