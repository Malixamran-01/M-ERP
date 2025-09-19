# Madrasa ERP - Setup Instructions

## Quick Start

### Option 1: Automated Setup (Windows)
1. Double-click `start.bat` to automatically install dependencies and start both server and client
2. Wait for both applications to start
3. Open your browser and go to `http://localhost:5173`

### Option 2: Manual Setup

#### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

#### Server Setup
```bash
cd server
npm install
npm run dev
```
Server will run on `http://localhost:3001`

#### Client Setup
```bash
cd client
npm install
npm run dev
```
Client will run on `http://localhost:5173`

## What's Fixed

### ✅ Issues Resolved
1. **Missing HelloWorld.vue component** - Created the missing Vue component
2. **Import path errors** - Fixed all import paths to use relative paths
3. **Missing UI components** - Created complete UI component library
4. **Missing entity classes** - Created API client classes for all entities
5. **Server setup** - Created Express.js server with JSON-based data storage
6. **Mixed framework issues** - Set up proper React + Vue configuration

### 🏗️ Architecture
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Express.js with JSON-based data storage
- **UI Components**: Custom component library with Islamic design theme
- **API**: RESTful API endpoints for all entities

### 📊 Features Available
- **Dashboard**: Statistics and charts
- **Student Management**: Add, view, and manage students
- **Role-based Navigation**: Different views for admin, teacher, student, manager
- **Responsive Design**: Works on desktop and mobile
- **Islamic Theme**: Green color scheme with appropriate icons

### 🔧 API Endpoints
- `GET /api/students` - List all students
- `POST /api/students` - Create new student
- `GET /api/teachers` - List all teachers
- `GET /api/fee-payments` - List fee payments
- `GET /api/donations` - List donations
- `GET /api/users/me` - Get current user

### 🎨 UI Components Created
- Button, Card, Input, Label, Textarea
- Badge, Table, Dialog, Select, Tabs
- Sidebar with navigation
- Stats cards with charts

## Troubleshooting

### Common Issues
1. **Port already in use**: Change ports in `vite.config.js` and `server.js`
2. **Dependencies not installed**: Run `npm install` in both client and server directories
3. **CORS errors**: Server is configured with CORS for localhost:5173

### Development Notes
- Server uses in-memory storage (data resets on restart)
- Client proxies API calls to server automatically
- Hot reload enabled for both client and server
- All components are functional and ready for use

## Next Steps
1. Add more pages (Admissions, Finance, Academics, etc.)
2. Implement user authentication
3. Add data persistence (database)
4. Add more advanced features like file uploads
5. Deploy to production

The application is now fully functional with a working client-server connection!






