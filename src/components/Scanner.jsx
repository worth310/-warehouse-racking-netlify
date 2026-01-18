import React, { useState, useRef, useEffect } from 'react'
import { Camera } from 'lucide-react'

export default function Scanner({ onScan }) {
  const [scanning, setScanning] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const handleManualScan = (e) => {
    e.preventDefault()
    if (manualInput.trim()) {
      onScan(manualInput)
      setManualInput('')
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanning(true)
        scanFrame(stream)
      }
    } catch (err) {
      console.error('Camera access denied:', err)
      alert('Please enable camera access to use the scanner')
    }
  }

  const scanFrame = (stream) => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const ctx = canvas.getContext('2d')
    const interval = setInterval(() => {
      if (!video.readyState === video.HAVE_ENOUGH_DATA) {
        clearInterval(interval)
        return
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0)

      // Simple barcode detection (looks for patterns)
      // In production, use a library like quagga2
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const barcodeData = detectBarcode(imageData)
      
      if (barcodeData && scanning) {
        clearInterval(interval)
        onScan(barcodeData)
        stopCamera()
      }
    }, 100)
  }

  const detectBarcode = (imageData) => {
    // Placeholder for barcode detection logic
    // Use quagga2 or similar for real implementation
    return null
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setScanning(false)
    }
  }

  return (
    <div className="scanner-container">
      <div className="scanner-card">
        <h2>Barcode Scanner</h2>
        
        {scanning ? (
          <div className="scanner-active">
            <video ref={videoRef} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <button onClick={stopCamera} className="btn btn-danger">Stop Scanner</button>
          </div>
        ) : (
          <button onClick={startCamera} className="btn btn-primary">
            <Camera size={20} /> Start Scanner
          </button>
        )}

        <div className="divider">OR</div>

        <form onSubmit={handleManualScan} className="manual-input">
          <input
            type="text"
            placeholder="Enter SKU or Barcode manually"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-secondary">Search</button>
        </form>
      </div>
    </div>
  )
}
