import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const CATEGORIES = {
  'Electronics': ['Computers', 'Servers', 'Networking', 'Accessories'],
  'Mechanical': ['Motors', 'Bearings', 'Belts', 'Fasteners'],
  'Hydraulics': ['Pumps', 'Cylinders', 'Valves', 'Seals'],
  'Pneumatics': ['Compressors', 'Actuators', 'Regulators', 'Tubing'],
  'Raw Materials': ['Metals', 'Plastics', 'Rubber', 'Other'],
  'Tools': ['Hand Tools', 'Power Tools', 'Measurement', 'Safety'],
  'Other': ['Miscellaneous']
}

export default function ItemForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: 0,
    location: '',
    description: '',
    category: '',
    subcategory: '',
    ...item
  })

  const [errors, setErrors] = useState({})
  const [selectedCategory, setSelectedCategory] = useState(item?.category || '')

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Item name is required'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
    if (formData.quantity < 0) newErrors.quantity = 'Quantity cannot be negative'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.subcategory) newErrors.subcategory = 'Subcategory is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }))
  }

  const handleCategoryChange = (e) => {
    const category = e.target.value
    setSelectedCategory(category)
    setFormData(prev => ({
      ...prev,
      category,
      subcategory: '' // Reset subcategory when category changes
    }))
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{item?.id ? 'Edit Item' : 'Add New Item'}</h2>
          <button onClick={onCancel} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Item Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Conveyor Belt"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU *</label>
            <input
              id="sku"
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g., CBL-001"
            />
            {errors.sku && <span className="error">{errors.sku}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {Object.keys(CATEGORIES).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="error">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subcategory">Subcategory *</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                disabled={!selectedCategory}
              >
                <option value="">Select Subcategory</option>
                {selectedCategory && CATEGORIES[selectedCategory]?.map(subcat => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
              {errors.subcategory && <span className="error">{errors.subcategory}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
              />
              {errors.quantity && <span className="error">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Rack A-12"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional notes..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {item?.id ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
