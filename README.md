# Madrasa ERP Management System

A comprehensive educational management platform designed specifically for Islamic educational institutions (Madrasas).

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MadarsaERP
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Start the application**
   ```bash
   # Start the server (from server directory)
   npm start
   # or
   node server.js

   # Start the client (from client directory)
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🔐 Demo Accounts

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Super Admin** | superadmin@madrasa.edu | superadmin123 | Full system access |
| **Admin** | admin@madrasa.edu | admin123 | Administrative functions |
| **Teacher** | teacher@madrasa.edu | teacher123 | Teaching functions |
| **Guardian** | guardian@madrasa.edu | guardian123 | Child monitoring |
| **Student** | student@madrasa.edu | student123 | Self-service portal |

## 📚 Documentation

Comprehensive documentation is available in [`DOCUMENTATION.md`](./DOCUMENTATION.md) including:

- **Architecture Overview** - System design and technology stack
- **Authentication & Authorization** - RBAC system and permissions
- **API Documentation** - All available endpoints
- **Database Schema** - Entity definitions and relationships
- **UI Components** - Component library and design system
- **Feature History** - Implementation timeline and changes
- **Development Guidelines** - Coding standards and best practices

## 🛠️ Development

### Project Structure
```
MadarsaERP/
├── client/          # React frontend application
├── server/          # Express.js backend server
├── scripts/         # Utility scripts
├── DOCUMENTATION.md # Comprehensive documentation
└── README.md        # This file
```

### Key Features
- ✅ **Role-Based Access Control** - Granular permissions system
- ✅ **Student Management** - Complete student lifecycle
- ✅ **Teacher Management** - Staff and subject management
- ✅ **Financial Tracking** - Fee collection and donations
- ✅ **Academic Progress** - Hifz tracking and attendance
- ✅ **Data Management** - Import/export functionality
- ✅ **Responsive Design** - Mobile-friendly interface

### Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Express.js, JSON-based storage
- **Authentication**: Custom JWT-based system
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Charts**: Recharts

## 📖 Documentation Maintenance

The documentation system includes automated tools for maintaining up-to-date documentation:

### Update Documentation
```bash
# Add new feature
node scripts/update-docs.js feature "Feature Name" "Description"

# Add new API endpoint
node scripts/update-docs.js api POST /new-endpoint "Endpoint description"

# Add new permission
node scripts/update-docs.js permission PERMISSION_NAME "permission:key" "Description"

# Add new role
node scripts/update-docs.js role "Role Name" "Description" "permission1" "permission2"

# Increment version
node scripts/update-docs.js version minor
```

### Documentation Standards
- Update documentation with every feature addition
- Include technical implementation details
- Document API changes and new endpoints
- Maintain version history and changelog
- Keep architecture diagrams current

## 🔧 Configuration

### Environment Variables
Create `.env` files in both client and server directories:

**Server (.env)**
```env
PORT=3001
NODE_ENV=development
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Madrasa ERP
```

## 🧪 Testing

### Manual Testing
1. **Authentication Flow**
   - Test login with different roles
   - Verify permission-based navigation
   - Check session persistence

2. **Role-Based Access**
   - Verify each role sees appropriate features
   - Test route protection
   - Check permission-based UI elements

3. **Data Management**
   - Test CRUD operations
   - Verify data import/export
   - Check data persistence

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client
npm run build

# Start server in production
cd ../server
NODE_ENV=production npm start
```

### Docker Deployment (Future)
```bash
# Build and run with Docker
docker-compose up -d
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Update documentation** (`node scripts/update-docs.js feature "Amazing Feature" "Description"`)
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Write comprehensive documentation
- Include tests for new features
- Update version numbers appropriately
- Maintain backward compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Documentation**: Check [`DOCUMENTATION.md`](./DOCUMENTATION.md)
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions

## 🎯 Roadmap

### Upcoming Features
- [ ] Real database integration (PostgreSQL)
- [ ] Advanced reporting system
- [ ] Mobile application
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Messaging system
- [ ] Calendar integration

### Technical Improvements
- [ ] Automated testing suite
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] API documentation (Swagger)
- [ ] Microservices architecture

---

**Version**: 1.5.0  
**Last Updated**: September 16, 2025  
**Maintainer**: Development Team






