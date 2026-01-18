import React from 'react'
import { Edit2, Trash2, MapPin, Tag } from 'lucide-react'

export default function InventoryList({ items, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="loading">Loading inventory...</div>
  }

  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <p>No items found. Add your first item to get started.</p>
      </div>
    )
  }

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'Uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {})

  return (
    <div className="inventory-container">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="category-section">
          <div className="category-header">
            <h3>{category}</h3>
            <span className="item-count">{categoryItems.length} items</span>
          </div>

          <div className="inventory-grid">
            {categoryItems.map((item) => (
              <div key={item.id} className="inventory-card">
                <div className="card-header">
                  <div>
                    <h3>{item.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                      {item.subcategory}
                    </p>
                  </div>
                  <span className="sku-badge">{item.sku}</span>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <span className="label">Quantity:</span>
                    <span className="value qty-badge">{item.quantity}</span>
                  </div>

                  <div className="info-row">
                    <MapPin size={16} />
                    <span className="value">{item.location || 'No location'}</span>
                  </div>

                  {item.description && (
                    <div className="info-row">
                      <span className="label">Notes:</span>
                      <span className="value" style={{ fontSize: '0.9rem' }}>{item.description}</span>
                    </div>
                  )}

                  <div className="info-row">
                    <span className="label">Added:</span>
                    <span className="value">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="btn btn-small btn-secondary"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)} 
                    className="btn btn-small btn-danger"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
