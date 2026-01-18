import React, { useState, useEffect } from 'react'
import { Plus, Settings, Moon, Sun, BarChart3, Cloud, CloudOff } from 'lucide-react'
import Scanner from './components/Scanner'
import SearchItems from './components/SearchItems'
import InventoryList from './components/InventoryList'
import ItemForm from './components/ItemForm'
import BackOffice from './components/BackOffice'
import Dashboard from './components/Dashboard'
import ActivityLog from './components/ActivityLog'
import Login from './components/Login'
import { dataService } from './services/dataService'
import './App.css'

export default function App() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showBackOffice, setShowBackOffice] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showActivityLog, setShowActivityLog] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [activityLog, setActivityLog] = useState([])
  const [cloudConnected, setCloudConnected] = useState(false)
  const [unsubscribe, setUnsubscribe] = useState(null)

  // Load items from localStorage (demo mode)
  useEffect(() => {
    const saved = localStorage.getItem('warehouseItems')
    const savedLog = localStorage.getItem('activityLog')
    if (saved) {
      setItems(JSON.parse(saved))
      setFilteredItems(JSON.parse(saved))
    }
    if (savedLog) {
      setActivityLog(JSON.parse(savedLog))
    }
  }, [])

  // Load items from cloud when user logs in
  useEffect(() => {
    if (currentUser) {
      const loadCloudItems = async () => {
        try {
          const cloudItems = await dataService.loadItems(currentUser.id)
          if (cloudItems && cloudItems.length > 0) {
            setItems(cloudItems)
            setFilteredItems(cloudItems)
            setCloudConnected(true)
            
            // Subscribe to real-time updates
            const unsubFunc = dataService.subscribeToItems(currentUser.id, (updatedItems) => {
              setItems(updatedItems)
              setFilteredItems(updatedItems)
            })
            setUnsubscribe(() => unsubFunc)
          }
        } catch (error) {
          console.error("Failed to load cloud items:", error)
          setCloudConnected(false)
        }
      }
      loadCloudItems()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [currentUser])

  // Save items to localStorage
  useEffect(() => {
    localStorage.setItem('warehouseItems', JSON.stringify(items))
  }, [items])

  // Save activity log to localStorage
  useEffect(() => {
    localStorage.setItem('activityLog', JSON.stringify(activityLog))
  }, [activityLog])

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.body.classList.add('dark-mode')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)
    if (newDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  // Add activity log entry
  const logActivity = (type, itemName, itemData = {}) => {
    const entry = {
      type,
      itemName,
      sku: itemData.sku,
      quantity: itemData.quantity,
      category: itemData.category,
      description: itemData.description,
      timestamp: new Date().toISOString(),
      details: itemData.details,
      user: currentUser?.username || 'Unknown'
    }
    setActivityLog([entry, ...activityLog])
  }

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  // If not logged in, show login screen
  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  const handleScan = async (barcode) => {
    setLoading(true)
    try {
      // Try to find item by SKU
      const found = items.find(item => item.sku === barcode)
      if (found) {
        alert(`Found: ${found.name} - Qty: ${found.quantity} at ${found.location || 'No location'}`)
      } else {
        // Ask to add new item
        const name = prompt('Item not found. Enter item name:')
        if (name) {
          const newItem = {
            id: Date.now(),
            name,
            sku: barcode,
            quantity: 1,
            location: '',
            description: '',
            createdAt: new Date().toISOString()
          }
          setItems([...items, newItem])
          alert(`Item "${name}" added with SKU ${barcode}`)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    const results = items.filter(item =>
      item.sku.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.location?.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredItems(results)
  }

  const handleAddItem = async (formData) => {
    let updatedItems
    if (editingItem) {
      updatedItems = items.map(item => item.id === editingItem.id ? { ...formData, id: item.id, createdAt: item.createdAt } : item)
      logActivity('edit', formData.name, formData)
      // Update in cloud
      if (cloudConnected && currentUser) {
        await dataService.updateItem(currentUser.id, editingItem.id, formData)
      }
    } else {
      const newItem = { ...formData, id: Date.now(), createdAt: new Date().toISOString() }
      updatedItems = [...items, newItem]
      logActivity('add', formData.name, formData)
      // Save to cloud
      if (cloudConnected && currentUser) {
        await dataService.addItem(currentUser.id, newItem)
      }
    }
    setItems(updatedItems)
    setFilteredItems(updatedItems)
    setSearchQuery('')
    setShowForm(false)
    setEditingItem(null)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleDeleteItem = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const deletedItem = items.find(item => item.id === id)
      const updatedItems = items.filter(item => item.id !== id)
      setItems(updatedItems)
      setFilteredItems(updatedItems)
      if (deletedItem) {
        logActivity('delete', deletedItem.name, { sku: deletedItem.sku })
      }
      // Delete from cloud
      if (cloudConnected && currentUser) {
        await dataService.deleteItem(currentUser.id, id)
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h1>🏭 Oxford Warehouse Racking</h1>
              <p>Professional Inventory Management & Tracking System</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>👤 {currentUser.username}</span>
                {cloudConnected && (
                  <button 
                    className="btn btn-header"
                    title="Cloud sync active - data syncs across devices"
                    style={{ background: 'rgba(46, 125, 50, 0.3)' }}
                  >
                    <Cloud size={18} style={{ color: '#4caf50' }} />
                  </button>
                )}
              </div>
              <button 
                onClick={() => setShowDashboard(!showDashboard)}
                className="btn btn-header"
                title="View Dashboard"
                style={{ background: showDashboard ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)' }}
              >
                <BarChart3 size={20} />
              </button>
              <button 
                onClick={() => setShowActivityLog(!showActivityLog)}
                className="btn btn-header"
                title="View Activity Log"
                style={{ background: showActivityLog ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)' }}
              >
                📋
              </button>
              <button 
                onClick={toggleDarkMode}
                className="btn btn-header"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={handleLogout}
                className="btn btn-header"
                title="Logout"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {showDashboard ? (
            <div style={{ marginBottom: '2rem' }}>
              <button 
                onClick={() => setShowDashboard(false)}
                className="btn btn-secondary"
                style={{ marginBottom: '1.5rem' }}
              >
                ← Back to Inventory
              </button>
              <Dashboard items={items} />
            </div>
          ) : showActivityLog ? (
            <div style={{ marginBottom: '2rem' }}>
              <button 
                onClick={() => setShowActivityLog(false)}
                className="btn btn-secondary"
                style={{ marginBottom: '1.5rem' }}
              >
                ← Back to Inventory
              </button>
              <ActivityLog 
                activityLog={activityLog}
                onClearLog={() => {
                  if (confirm('Clear all activity history?')) {
                    setActivityLog([])
                  }
                }}
              />
            </div>
          ) : showBackOffice ? (
            <BackOffice 
              items={items}
              onEdit={(item) => {
                setEditingItem(item)
                setShowForm(true)
              }}
              onDelete={handleDeleteItem}
              onAddNew={() => {
                setEditingItem(null)
                setShowForm(true)
              }}
              onClose={() => setShowBackOffice(false)}
            />
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Left Panel - Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <Scanner onScan={handleScan} />
                  
                  <div className="actions" style={{ flexDirection: 'column', gap: '1rem' }}>
                    <button 
                      onClick={() => {
                        setEditingItem(null)
                        setShowForm(true)
                      }} 
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%' }}
                    >
                      <Plus size={20} /> Add New Item
                    </button>
                    <button 
                      onClick={() => setShowBackOffice(true)} 
                      className="btn btn-secondary btn-lg"
                      style={{ width: '100%' }}
                    >
                      <Settings size={20} /> Back Office
                    </button>
                  </div>

                  <SearchItems onSearch={handleSearch} loading={loading} />
                </div>

                {/* Right Panel - Inventory List */}
                <div>
                  {searchQuery && (
                    <div className="search-results-header">
                      <p>Search results for: <strong>{searchQuery}</strong></p>
                      <button 
                        onClick={() => {
                          setSearchQuery('')
                          setFilteredItems(items)
                        }}
                        className="btn btn-small"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  
                  {items.length === 0 ? (
                    <div className="empty-state">
                      <h3>No Items Yet</h3>
                      <p>Start by adding your first item to the warehouse</p>
                      <button 
                        onClick={() => setShowForm(true)} 
                        className="btn btn-primary"
                        style={{ marginTop: '1rem' }}
                      >
                        Add First Item
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        Inventory ({filteredItems && filteredItems.length > 0 ? filteredItems.length : items.length} of {items.length})
                      </h2>
                      <InventoryList 
                        items={filteredItems && filteredItems.length > 0 ? filteredItems : items} 
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        loading={loading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {showForm && (
        <ItemForm 
          item={editingItem} 
          onSubmit={handleAddItem}
          onCancel={() => {
            setShowForm(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}
