# Warehouse Racking System - Netlify

A complete warehouse inventory management system with barcode scanning, item tracking, and SKU management. Built with React, Netlify Functions, and Firebase.

## Features

✅ **Barcode/QR Code Scanning** - Scan items into inventory using device camera  
✅ **Item Management** - Add, edit, delete inventory items  
✅ **Location Tracking** - Organize items by warehouse location/rack  
✅ **SKU Management** - Track products by SKU codes  
✅ **Search Functionality** - Quick search by SKU, name, or location  
✅ **Real-time Inventory** - Instant inventory updates  
✅ **Responsive Design** - Mobile-friendly interface  
✅ **Offline Support** - Works with localStorage for offline capability  

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Netlify Functions (Serverless)
- **Database**: Firebase Firestore
- **Scanning**: Camera API + Barcode detection
- **Styling**: Custom CSS with responsive design

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Firebase project (free tier available)
- Netlify account (free tier available)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Copy your Firebase config credentials
   - Rename `.env.example` to `.env.local`
   - Add your Firebase credentials to `.env.local`

3. **Local Development**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
warehouse-racking-netlify/
├── src/
│   ├── components/
│   │   ├── Scanner.jsx          # Barcode scanner component
│   │   ├── SearchItems.jsx      # Search interface
│   │   ├── InventoryList.jsx    # Inventory display
│   │   └── ItemForm.jsx         # Add/edit items form
│   ├── config/
│   │   └── firebase.js          # Firebase configuration
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Styles
│   └── main.jsx                 # Entry point
├── netlify/functions/
│   ├── firebase-init.js         # Firebase admin init
│   ├── items.js                 # Items API (GET/POST)
│   ├── items-detail.js          # Single item (GET/PUT/DELETE)
│   └── search.js                # Search API
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── netlify.toml                 # Netlify configuration
└── package.json                 # Dependencies

```

## API Endpoints

### Items
- `GET /.netlify/functions/items` - Get all items
- `POST /.netlify/functions/items` - Create new item
- `GET /.netlify/functions/items-detail?id=<id>` - Get single item
- `PUT /.netlify/functions/items-detail?id=<id>` - Update item
- `DELETE /.netlify/functions/items-detail?id=<id>` - Delete item

### Search
- `GET /.netlify/functions/search?q=<query>` - Search items

## Deployment to Netlify

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add your Firebase credentials:
     - `REACT_APP_FIREBASE_API_KEY`
     - `REACT_APP_FIREBASE_AUTH_DOMAIN`
     - `REACT_APP_FIREBASE_PROJECT_ID`
     - `REACT_APP_FIREBASE_STORAGE_BUCKET`
     - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
     - `REACT_APP_FIREBASE_APP_ID`
   - Add Firebase Admin SDK credentials:
     - `FIREBASE_SERVICE_ACCOUNT` (JSON string)
     - `FIREBASE_DATABASE_URL`

## Usage

### Scanning Items
1. Click "Start Scanner" button
2. Grant camera permission
3. Point camera at barcode/QR code
4. Or manually enter SKU in the input field

### Adding Items
1. Click "Add New Item" button
2. Fill in item details:
   - Item Name (required)
   - SKU (required)
   - Quantity
   - Location (warehouse rack/position)
   - Description
3. Click "Add Item"

### Searching
1. Use the search box
2. Enter SKU, item name, or location
3. Results update instantly

### Managing Inventory
- Click "Edit" to modify item details
- Click "Delete" to remove items
- Quantities update in real-time

## Features Demo

### Local Storage (Demo Mode)
The app works with localStorage for quick testing without Firebase setup. Items are saved locally in the browser.

### Firebase Integration
For production, connect to Firebase Firestore for cloud storage and multi-user support.

## Security Notes

⚠️ **Important**: Never commit `.env.local` to version control. Use Netlify's environment variable settings for production.

## Troubleshooting

**Camera not working?**
- Check browser permissions for camera access
- Use HTTPS (required for camera access)
- Try manual SKU entry instead

**Firebase connection issues?**
- Verify credentials in `.env.local`
- Check Firebase console for database rules
- Ensure Firestore is enabled in your project

**Netlify Functions not working?**
- Check function logs in Netlify dashboard
- Verify environment variables are set
- Ensure Firebase service account is properly configured

## License

MIT License

## Support

For issues or questions:
1. Check the GitHub Issues tab
2. Review Netlify and Firebase documentation
3. Contact support

---

**Made with ❤️ for warehouse management**
