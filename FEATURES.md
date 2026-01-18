# Oxford Warehouse Racking System

## 🏭 Project Overview

**Oxford Warehouse Racking** is a professional, cloud-based inventory management system built with React 18 and Vite. The application provides comprehensive warehouse management capabilities including barcode scanning, item tracking, category management, activity logging, and advanced analytics.

**Live Demo:** https://warehouse-racking-abc123.netlify.app  
**GitHub Repository:** https://github.com/worth310/-warehouse-racking-netlify  
**Local Access:** http://192.168.1.130:3000 (when running `npm run dev`)

---

## ✨ Features Implemented

### Core Inventory Management
- ✅ **Item Management** - Add, edit, delete items with full CRUD operations
- ✅ **Barcode Scanning** - Camera-based or manual SKU entry with detection
- ✅ **Search & Filter** - Real-time search across SKU, name, and location
- ✅ **Category System** - 7 main categories with customizable subcategories:
  - Electronics (Computers, Servers, Networking, Accessories)
  - Mechanical (Motors, Bearings, Belts, Fasteners)
  - Hydraulics (Pumps, Cylinders, Valves, Seals)
  - Pneumatics (Compressors, Actuators, Regulators, Tubing)
  - Raw Materials (Metals, Plastics, Rubber, Other)
  - Tools (Hand Tools, Power Tools, Measurement, Safety)
  - Other (Miscellaneous)

### Advanced Features
- ✅ **Dashboard** - Inventory statistics, category breakdown, low stock alerts, recent additions
- ✅ **Activity Log** - Complete audit trail of all item operations (add/edit/delete) with timestamps and user tracking
- ✅ **Dark Mode** - Toggle between light and dark themes with persistent preference
- ✅ **Image Upload** - Attach product photos to items with thumbnail previews
- ✅ **Barcode Generator** - Generate, print, and download CODE128 barcodes for SKUs
- ✅ **User Authentication** - Simple login system with multi-user activity tracking
- ✅ **Back Office** - Professional admin panel with filtering, sorting, and bulk operations
- ✅ **Local Persistence** - All data saved to browser localStorage (survives page refreshes)

### User Interface
- ✅ **Professional Design** - Atlassian-inspired color palette and layout
- ✅ **Responsive Layout** - Works on desktop and mobile devices
- ✅ **Dark Mode Support** - Full CSS variable-based theming system
- ✅ **Interactive Dashboard** - Real-time statistics and visual category breakdown
- ✅ **Modal Forms** - Clean, validated item entry and editing

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI component framework with hooks
- **Vite 5.4.21** - Lightning-fast build tool and dev server
- **lucide-react** - Beautiful icon library (180+ icons)
- **jsbarcode 3.12.3** - Barcode generation library

### Styling
- **CSS3** - Custom CSS with CSS variables for theming
- **Responsive Grid** - Flexbox and CSS Grid layouts
- **CSS Transitions** - Smooth animations and interactions

### Infrastructure
- **Netlify** - Serverless hosting with auto-deployment on git push
- **GitHub** - Version control and source repository
- **localStorage** - Browser-based data persistence

### Development
- **Node.js v24.13.0**
- **npm 11.6.2**
- **Git 2.43.0**

---

## 📁 Project Structure

```
warehouse-racking-netlify/
├── src/
│   ├── components/
│   │   ├── Scanner.jsx           # Barcode/camera scanning
│   │   ├── ItemForm.jsx          # Add/edit item modal with image upload
│   │   ├── InventoryList.jsx     # Grouped inventory display with barcode button
│   │   ├── SearchItems.jsx       # Search interface
│   │   ├── BackOffice.jsx        # Admin table with filters/sorting
│   │   ├── Dashboard.jsx         # Analytics and statistics
│   │   ├── ActivityLog.jsx       # Audit trail of all operations
│   │   ├── BarcodeGenerator.jsx  # Barcode print/download modal
│   │   └── Login.jsx             # User authentication
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # All styling (1200+ lines)
│   └── main.jsx                  # React entry point
├── public/
│   ├── index.html               # HTML template
│   └── favicon.ico              # App icon
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Dependency lock file
├── vite.config.js              # Vite build configuration
├── netlify.toml                # Netlify deployment config
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ (tested with v24.13.0)
- npm v6+ (tested with v11.6.2)
- Git 2.0+

### Installation

```bash
# Clone the repository
git clone https://github.com/worth310/-warehouse-racking-netlify.git
cd warehouse-racking-netlify

# Install dependencies
npm install

# Start development server
npm run dev
# Access at http://localhost:3000 or http://192.168.1.130:3000
```

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📖 Usage Guide

### 1. **Login**
- Start by entering any username and password (3+ characters)
- Your username will be tracked in the activity log
- Click the door icon (🚪) in the header to logout

### 2. **Adding Items**
1. Click "Add New Item" button
2. Fill in required fields:
   - Item Name
   - SKU (unique identifier)
   - Quantity
   - Category & Subcategory
3. Optional fields:
   - Location (e.g., "Rack A-12")
   - Description
   - Item Image (click upload to add photo)
4. Click "Add Item" to save

### 3. **Searching & Filtering**
- Use the search box to find items by name, SKU, or location
- Results update in real-time
- Click "Clear" to reset search

### 4. **Barcode Scanning**
- Click the camera icon to access scanner
- Point camera at barcode to scan
- If item not found, option to create new item
- Manual input field available for direct SKU entry

### 5. **Viewing Dashboard**
- Click chart icon (📊) in header
- View inventory statistics:
  - Total items count
  - Total quantity in stock
  - Low stock alerts (< 5 units)
  - Category breakdown chart
  - Recently added items list

### 6. **Activity Log**
- Click clipboard icon (📋) in header
- View complete audit trail of all operations
- Filter by action type (Added/Edited/Deleted)
- See timestamp and username for each change
- Clear log with "Clear Log" button

### 7. **Back Office**
- Click "Back Office" button
- Professional admin table view with:
  - Search by name or SKU
  - Filter by category
  - Sort by name, SKU, quantity, or category
  - Inline edit/delete buttons
  - Low stock highlighting (orange badge)
  - Bulk operations support

### 8. **Generating Barcodes**
1. In inventory list, click "Barcode" button on item
2. Modal shows item details and generated barcode
3. Download as PNG for printing
4. Click Print button for direct printing

### 9. **Dark Mode**
- Click moon/sun icon (🌙/☀️) in header to toggle
- Setting persists across sessions
- Affects all UI elements with smooth transition

---

## 💾 Data Storage

All data is stored in the browser's **localStorage**:
- **warehouseItems** - JSON array of all inventory items
- **activityLog** - JSON array of all operations with timestamps
- **darkMode** - Boolean for theme preference
- **currentUser** - Current logged-in user object

**Note:** Data is NOT synced to a server. Clearing browser data will delete all inventory. For production use, integrate with a backend database (Firebase, PostgreSQL, etc.).

---

## 🎨 Styling & Customization

### Color Scheme
The app uses CSS variables for easy theming:

```css
:root {
  --primary-color: #0052cc;        /* Oxford Blue */
  --primary-dark: #003d99;
  --secondary-color: #5a6c7d;      /* Gray */
  --danger-color: #d32f2f;         /* Red */
  --success-color: #2e7d32;        /* Green */
  --warning-color: #f57c00;        /* Orange */
  --bg-color: #f5f6f8;             /* Light Gray */
  --card-bg: #ffffff;              /* White */
  --border-color: #d0d7e0;
  --text-primary: #172b4d;         /* Dark Gray */
  --text-secondary: #626f86;       /* Medium Gray */
}

/* Dark mode override */
body.dark-mode {
  --bg-color: #1a1a1a;
  --card-bg: #2d2d2d;
  --text-primary: #e0e0e0;
  /* ... more overrides */
}
```

Edit `src/App.css` to customize colors, fonts, spacing, or shadows.

---

## 🔐 Security Considerations

### Current Implementation (Demo)
- ⚠️ **No password encryption** - Demo mode accepts any password
- ⚠️ **No authentication backend** - User stored in localStorage only
- ⚠️ **No data encryption** - All data visible in browser
- ⚠️ **Client-side only** - No server-side validation

### For Production
1. **Implement Backend Auth**
   - Use Firebase Authentication, Auth0, or Okta
   - Implement proper password hashing (bcrypt)
   - Add session management with JWT tokens

2. **Database Integration**
   - Replace localStorage with PostgreSQL, MongoDB, or Firebase Firestore
   - Implement server-side data validation
   - Add backup and disaster recovery

3. **Security Hardening**
   - Add HTTPS/TLS encryption
   - Implement role-based access control (RBAC)
   - Add audit logging and compliance tracking
   - Set up rate limiting and DDoS protection
   - Implement input validation and sanitization

---

## 📊 Feature Breakdown

### Component Responsibilities

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Scanner** | Barcode input | Camera access, manual fallback |
| **ItemForm** | Item creation/edit | Validation, image upload, category system |
| **InventoryList** | Visual inventory display | Grouping by category, thumbnails, edit/delete |
| **SearchItems** | Item discovery | Real-time filtering |
| **BackOffice** | Admin management | Table view, sorting, filtering, bulk ops |
| **Dashboard** | Analytics overview | Stats, charts, alerts, recent items |
| **ActivityLog** | Audit trail | Event tracking, filtering, user attribution |
| **BarcodeGenerator** | Barcode management | Generation, printing, downloading |
| **Login** | User authentication | Session management, activity attribution |

---

## 🔄 Data Flow

```
User Action
    ↓
Component Handler (e.g., handleAddItem)
    ↓
State Update (setItems, setActivityLog)
    ↓
localStorage Save (via useEffect)
    ↓
Activity Log Entry (logActivity called)
    ↓
Component Re-render (React updates UI)
```

---

## 🚀 Deployment

### Netlify (Current)
1. Repository connected to Netlify
2. Auto-build triggered on git push
3. Build command: `npm ci --include=dev && npm run build`
4. Publish directory: `dist/`
5. Environment: Node.js v18 LTS on Netlify

### Deploy Process
```bash
git add .
git commit -m "Feature description"
git push origin main
# Netlify automatically builds and deploys
```

### Alternative Deployment Options
- **Vercel** - Optimized for React/Vite
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable CDN
- **Docker** - Containerized deployment
- **Self-hosted** - VPS or dedicated server

---

## 🐛 Troubleshooting

### App Won't Start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### Build Fails
```bash
# Check for syntax errors
npm run build

# Clear cache
rm -rf dist node_modules
npm install
npm run build
```

### Dark Mode Not Working
- Clear localStorage: `localStorage.clear()`
- Reload page
- Check if `body` element has `dark-mode` class

### Barcode Not Generating
- Ensure jsbarcode is installed: `npm list jsbarcode`
- Check browser console for errors (F12)
- Verify SKU format (CODE128 works with most characters)

---

## 📈 Performance Metrics

### Build Output (Production)
- **CSS:** 17.87 kB (3.65 kB gzipped)
- **JS:** 245.21 kB (70.49 kB gzipped)
- **HTML:** 0.49 kB (0.33 kB gzipped)
- **Total:** ~74 kB compressed
- **Build time:** ~2.5 seconds

### Load Performance
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: 92+ (Performance)

---

## 🔮 Future Enhancements

### Planned Features
- [ ] CSV/Excel export functionality
- [ ] Batch barcode printing
- [ ] Inventory value tracking (cost + selling price)
- [ ] Stock level predictions using ML
- [ ] Multi-warehouse support
- [ ] Real-time sync across devices
- [ ] Mobile app (React Native)
- [ ] API for integration with ERP systems
- [ ] Advanced reporting (PDF generation)
- [ ] Stock movement history graphs
- [ ] Supplier management module
- [ ] Warranty tracking
- [ ] QR code generation and scanning
- [ ] Two-factor authentication
- [ ] Email notifications for low stock

### Technical Debt
- Replace localStorage with backend database
- Implement proper authentication system
- Add unit and integration tests
- Improve error handling and validation
- Optimize re-renders with memo/useMemo
- Add TypeScript for type safety
- Implement service workers for offline support

---

## 📝 Notes for Developers

### Adding New Fields to Items
1. Update ItemForm.jsx validation
2. Add field to form JSX
3. Update InventoryList.jsx display if needed
4. Update BackOffice.jsx table if needed
5. Update Dashboard.jsx aggregation if needed

### Extending Categories
Edit the CATEGORIES object in ItemForm.jsx:
```javascript
const CATEGORIES = {
  'Your Category': ['Subcategory 1', 'Subcategory 2', ...],
  // ...
}
```

### Customizing Activity Log
Edit the logActivity function in App.jsx to track additional fields or actions.

### Testing Dark Mode
1. Open DevTools (F12)
2. Go to Application → localStorage
3. Add: `darkMode: true`
4. Refresh page - should show dark theme

---

## 📞 Support & Contribution

- **Issues:** Report bugs on [GitHub Issues](https://github.com/worth310/-warehouse-racking-netlify/issues)
- **Discussions:** Use [GitHub Discussions](https://github.com/worth310/-warehouse-racking-netlify/discussions)
- **Pull Requests:** Contributions welcome!
- **License:** MIT

---

## 📄 Version History

### v1.5.0 (Current)
- Added user authentication system
- Added barcode generator with print/download
- Added item image upload feature
- Added dark mode toggle
- Renamed to "Oxford Warehouse Racking"

### v1.4.0
- Added Dashboard component with analytics
- Added Activity Log with audit trail
- Improved CSS styling and responsiveness

### v1.3.0
- Added Back Office admin panel
- Added category and subcategory system
- Improved search and filtering

### v1.2.0
- Added barcode scanner component
- Added search functionality
- Professional UI redesign

### v1.1.0
- Basic CRUD operations
- localStorage persistence

### v1.0.0
- Initial release
- React + Vite setup

---

## 🎯 Getting Help

1. **Check the [GitHub Issues](https://github.com/worth310/-warehouse-racking-netlify/issues)** for known problems
2. **Review the code comments** in component files
3. **Check browser console** for error messages (F12)
4. **Try clearing localStorage** - sometimes stale data causes issues
5. **Rebuild the project** - `npm install && npm run build`

---

**Last Updated:** 2024  
**Maintainer:** Warehouse System Team  
**Repository:** https://github.com/worth310/-warehouse-racking-netlify
