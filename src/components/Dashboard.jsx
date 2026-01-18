import React, { useState, useMemo } from 'react'
import { AlertCircle, TrendingUp, Package, AlertTriangle } from 'lucide-react'

export default function Dashboard({ items }) {
  // Calculate statistics
  const stats = useMemo(() => {
    const totalItems = items.length
    const totalQuantity = items.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0)
    const lowStockItems = items.filter(item => parseInt(item.quantity || 0) < 5)
    const categories = {}
    
    items.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1
    })

    const recentItems = items.slice(-5).reverse()

    return {
      totalItems,
      totalQuantity,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      categories,
      recentItems
    }
  }, [items])

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">📊 Dashboard & Analytics</h2>
      
      <div className="stats-grid">
        {/* Total Items Card */}
        <div className="stat-card">
          <div className="stat-icon">
            <Package size={28} color="#0052cc" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Items</div>
            <div className="stat-value">{stats.totalItems}</div>
            <div className="stat-subtext">In inventory</div>
          </div>
        </div>

        {/* Total Quantity Card */}
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={28} color="#2e7d32" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Quantity</div>
            <div className="stat-value">{stats.totalQuantity}</div>
            <div className="stat-subtext">Units in stock</div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="stat-card warning">
          <div className="stat-icon">
            <AlertTriangle size={28} color="#f57c00" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Low Stock</div>
            <div className="stat-value">{stats.lowStockCount}</div>
            <div className="stat-subtext">Items < 5 units</div>
          </div>
        </div>

        {/* Categories Count */}
        <div className="stat-card">
          <div className="stat-icon">
            <AlertCircle size={28} color="#5a6c7d" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Categories</div>
            <div className="stat-value">{Object.keys(stats.categories).length}</div>
            <div className="stat-subtext">Active categories</div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="dashboard-section">
        <h3 className="section-title">Items by Category</h3>
        <div className="category-breakdown">
          {Object.entries(stats.categories).length > 0 ? (
            Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="category-bar">
                <div className="category-name">{category}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{
                      width: `${(count / stats.totalItems) * 100}%`
                    }}
                  />
                </div>
                <div className="category-count">{count}</div>
              </div>
            ))
          ) : (
            <p className="empty-state">No items yet. Start adding items to see breakdown.</p>
          )}
        </div>
      </div>

      {/* Low Stock Warning Section */}
      {stats.lowStockItems.length > 0 && (
        <div className="dashboard-section warning-section">
          <h3 className="section-title" style={{color: '#d32f2f'}}>⚠️ Low Stock Alerts</h3>
          <div className="low-stock-list">
            {stats.lowStockItems.map(item => (
              <div key={item.id} className="low-stock-item">
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-sku">SKU: {item.sku}</div>
                </div>
                <div className="item-qty-warning">
                  <span className="qty-badge danger">{item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Additions */}
      {stats.recentItems.length > 0 && (
        <div className="dashboard-section">
          <h3 className="section-title">Recently Added Items</h3>
          <div className="recent-items">
            {stats.recentItems.map(item => (
              <div key={item.id} className="recent-item">
                <div className="recent-item-info">
                  <div className="recent-item-name">{item.name}</div>
                  <div className="recent-item-meta">
                    <span className="badge">{item.category}</span>
                    <span className="badge">{item.sku}</span>
                  </div>
                </div>
                <div className="recent-item-qty">{item.quantity} units</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
