import React, { useState, useMemo } from 'react'
import { Trash2, Filter } from 'lucide-react'

export default function ActivityLog({ activityLog, onClearLog }) {
  const [filterType, setFilterType] = useState('all')

  const filteredLog = useMemo(() => {
    if (filterType === 'all') return activityLog
    return activityLog.filter(entry => entry.type === filterType)
  }, [activityLog, filterType])

  const getActionColor = (type) => {
    switch(type) {
      case 'add': return '#2e7d32'
      case 'edit': return '#0052cc'
      case 'delete': return '#d32f2f'
      default: return '#5a6c7d'
    }
  }

  const getActionIcon = (type) => {
    switch(type) {
      case 'add': return '➕'
      case 'edit': return '✏️'
      case 'delete': return '🗑️'
      default: return '📝'
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <div className="activity-log">
      <div className="activity-header">
        <h2 className="activity-title">📋 Activity Log</h2>
        {activityLog.length > 0 && (
          <button 
            className="btn-secondary" 
            onClick={onClearLog}
            title="Clear entire activity log"
          >
            <Trash2 size={16} />
            Clear Log
          </button>
        )}
      </div>

      {activityLog.length === 0 ? (
        <div className="empty-state">
          <p>No activity recorded yet. Item changes will appear here.</p>
        </div>
      ) : (
        <>
          <div className="filter-section">
            <Filter size={18} />
            <select 
              className="filter-select"
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Activities ({activityLog.length})</option>
              <option value="add">Added ({activityLog.filter(a => a.type === 'add').length})</option>
              <option value="edit">Edited ({activityLog.filter(a => a.type === 'edit').length})</option>
              <option value="delete">Deleted ({activityLog.filter(a => a.type === 'delete').length})</option>
            </select>
          </div>

          <div className="log-entries">
            {filteredLog.length === 0 ? (
              <p className="empty-state">No activities of this type.</p>
            ) : (
              filteredLog.map((entry, index) => (
                <div key={index} className="log-entry">
                  <div className="entry-icon" style={{color: getActionColor(entry.type)}}>
                    {getActionIcon(entry.type)}
                  </div>
                  <div className="entry-details">
                    <div className="entry-action">
                      <span className="action-type" style={{color: getActionColor(entry.type)}}>
                        {entry.type.toUpperCase()}
                      </span>
                      <span className="action-name">{entry.itemName || entry.description}</span>
                    </div>
                    <div className="entry-meta">
                      {entry.sku && <span className="meta-item">SKU: {entry.sku}</span>}
                      {entry.quantity && <span className="meta-item">Qty: {entry.quantity}</span>}
                      {entry.category && <span className="meta-item">{entry.category}</span>}
                    </div>
                    {entry.details && (
                      <div className="entry-details-text">{entry.details}</div>
                    )}
                    <div className="entry-timestamp">
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
