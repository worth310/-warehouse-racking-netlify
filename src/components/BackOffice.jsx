import React, { useState } from 'react'
import { Edit2, Trash2, Plus, Search, Download } from 'lucide-react'

export default function BackOffice({ items, onEdit, onDelete, onAddNew, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterCategory, setFilterCategory] = useState('All')

  // Get unique categories
  const categories = ['All', ...new Set(items.map(item => item.category || 'Uncategorized'))]

  // Filter and sort items
  let filteredItems = items
  if (filterCategory !== 'All') {
    filteredItems = filteredItems.filter(item => item.category === filterCategory)
  }
  if (searchQuery) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'sku') return a.sku.localeCompare(b.sku)
    if (sortBy === 'qty') return b.quantity - a.quantity
    if (sortBy === 'category') return (a.category || '').localeCompare(b.category || '')
    return 0
  })

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Item Name', 'SKU', 'Quantity', 'Category', 'Subcategory', 'Location', 'Description', 'Date Added']
    const rows = sortedItems.map(item => [
      item.name,
      item.sku,
      item.quantity,
      item.category || '',
      item.subcategory || '',
      item.location || '',
      item.description || '',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''
    ])

    let csvContent = headers.join(',') + '\n'
    rows.forEach(row => {
      const escapedRow = row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`)
      csvContent += escapedRow.join(',') + '\n'
    })

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent))
    element.setAttribute('download', `oxford-warehouse-${new Date().toISOString().split('T')[0]}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="backoffice">
      <div className="backoffice-header">
        <div>
          <h2>Back Office - Inventory Management</h2>
          <p>{sortedItems.length} items</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={exportToCSV} className="btn btn-secondary" title="Export to CSV">
            <Download size={18} /> Export CSV
          </button>
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>

      <div className="backoffice-controls">
        <div className="search-group">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
          <option value="name">Sort by Name</option>
          <option value="sku">Sort by SKU</option>
          <option value="qty">Sort by Quantity</option>
          <option value="category">Sort by Category</option>
        </select>

        <button onClick={onAddNew} className="btn btn-primary">
          <Plus size={18} /> Add New Item
        </button>
      </div>

      <div className="backoffice-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No items found
                </td>
              </tr>
            ) : (
              sortedItems.map(item => (
                <tr key={item.id}>
                  <td className="item-name">{item.name}</td>
                  <td className="sku-cell">{item.sku}</td>
                  <td>{item.category || '-'}</td>
                  <td>{item.subcategory || '-'}</td>
                  <td className="qty-cell">
                    <span className={`qty-badge ${item.quantity < 5 ? 'low-stock' : ''}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td>{item.location || '-'}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => onEdit(item)} 
                      className="btn btn-small btn-secondary"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete ${item.name}?`)) {
                          onDelete(item.id)
                        }
                      }} 
                      className="btn btn-small btn-danger"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
