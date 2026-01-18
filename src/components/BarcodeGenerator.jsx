import React, { useEffect, useRef } from 'react'
import { Download, X } from 'lucide-react'
import JsBarcode from 'jsbarcode'

export default function BarcodeGenerator({ item, onClose }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && item.sku) {
      try {
        JsBarcode(canvasRef.current, item.sku, {
          format: 'CODE128',
          width: 2,
          height: 100,
          displayValue: true,
          fontSize: 14
        })
      } catch (error) {
        console.error('Barcode generation error:', error)
      }
    }
  }, [item.sku])

  const downloadBarcode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.href = canvasRef.current.toDataURL('image/png')
      link.download = `barcode-${item.sku}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const printBarcode = () => {
    if (canvasRef.current) {
      const printWindow = window.open('', '', 'height=400,width=600')
      printWindow.document.write('<html><head><title>Print Barcode</title></head><body>')
      printWindow.document.write(`<h3>${item.name}</h3>`)
      printWindow.document.write(`<p>SKU: ${item.sku}</p>`)
      printWindow.document.write(`<p>Quantity: ${item.quantity}</p>`)
      printWindow.document.write(canvasRef.current.outerHTML)
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="barcode-modal-overlay">
      <div className="barcode-modal">
        <div className="barcode-header">
          <h2>Barcode Generator</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="barcode-content">
          <div className="item-details">
            <h3>{item.name}</h3>
            <p className="sku">SKU: <strong>{item.sku}</strong></p>
            <p className="qty">Quantity in Stock: <strong>{item.quantity}</strong></p>
          </div>

          <div className="barcode-display">
            <canvas ref={canvasRef} />
          </div>

          <div className="barcode-actions">
            <button onClick={downloadBarcode} className="btn btn-primary">
              <Download size={18} /> Download PNG
            </button>
            <button onClick={printBarcode} className="btn btn-secondary">
              🖨️ Print
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
