#!/usr/bin/env node

/**
 * Documentation Update Script
 * Automatically updates the DOCUMENTATION.md file with new features and changes
 */

const fs = require('fs');
const path = require('path');

class DocumentationUpdater {
  constructor() {
    this.docsPath = path.join(__dirname, '..', 'DOCUMENTATION.md');
    this.version = '1.5.0';
    this.lastUpdated = new Date().toISOString().split('T')[0];
  }

  // Add new feature to documentation
  addFeature(featureName, description, technicalDetails = '', apiChanges = []) {
    const featureEntry = {
      name: featureName,
      description: description,
      technicalDetails: technicalDetails,
      apiChanges: apiChanges,
      date: this.lastUpdated,
      version: this.version
    };

    this.updateFeatureHistory(featureEntry);
    this.updateVersion();
    console.log(`✅ Added feature: ${featureName}`);
  }

  // Update feature implementation history
  updateFeatureHistory(feature) {
    let docs = this.readDocs();
    
    // Find the Feature Implementation History section
    const historySection = docs.indexOf('## 📚 Feature Implementation History');
    if (historySection === -1) {
      console.error('❌ Could not find Feature Implementation History section');
      return;
    }

    // Find the end of the history section
    const nextSection = docs.indexOf('## ', historySection + 1);
    const historyEnd = nextSection === -1 ? docs.length : nextSection;

    // Create new feature entry
    const newEntry = `
### ${feature.name}
**Date**: ${feature.date}
**Version**: ${feature.version}
**Features Added**:
${feature.description}

${feature.technicalDetails ? `**Technical Details**:\n${feature.technicalDetails}\n` : ''}
${feature.apiChanges.length > 0 ? `**API Changes**:\n${feature.apiChanges.map(change => `- ${change}`).join('\n')}\n` : ''}
`;

    // Insert new feature before the next section
    const updatedDocs = docs.slice(0, historyEnd) + newEntry + docs.slice(historyEnd);
    this.writeDocs(updatedDocs);
  }

  // Update version information
  updateVersion() {
    let docs = this.readDocs();
    
    // Update version in multiple places
    docs = docs.replace(/Version: \d+\.\d+\.\d+/, `Version: ${this.version}`);
    docs = docs.replace(/\*\*v\d+\.\d+\.\d+\*\*: .*/, `**v${this.version}**: Latest version with current features`);
    docs = docs.replace(/\*Last Updated: .*\*/, `*Last Updated: ${this.lastUpdated}*`);
    
    this.writeDocs(docs);
  }

  // Add new API endpoint
  addAPIEndpoint(method, path, description, parameters = []) {
    let docs = this.readDocs();
    
    const apiSection = docs.indexOf('## 🌐 API Endpoints');
    if (apiSection === -1) {
      console.error('❌ Could not find API Endpoints section');
      return;
    }

    const endpointEntry = `
\`\`\`
${method.padEnd(6)} ${path.padEnd(30)} # ${description}
\`\`\`
`;

    // Find the end of the API section
    const nextSection = docs.indexOf('## ', apiSection + 1);
    const apiEnd = nextSection === -1 ? docs.length : nextSection;

    // Insert new endpoint
    const updatedDocs = docs.slice(0, apiEnd) + endpointEntry + docs.slice(apiEnd);
    this.writeDocs(updatedDocs);
    
    console.log(`✅ Added API endpoint: ${method} ${path}`);
  }

  // Add new permission
  addPermission(name, key, description) {
    let docs = this.readDocs();
    
    const permissionSection = docs.indexOf('**Core Permissions**:');
    if (permissionSection === -1) {
      console.error('❌ Could not find Core Permissions section');
      return;
    }

    const permissionEntry = `  ${name}: '${key}', // ${description}\n`;

    // Find the end of permissions object
    const permissionsEnd = docs.indexOf('};', permissionSection);
    if (permissionsEnd === -1) {
      console.error('❌ Could not find end of permissions object');
      return;
    }

    // Insert new permission
    const updatedDocs = docs.slice(0, permissionsEnd) + permissionEntry + docs.slice(permissionsEnd);
    this.writeDocs(updatedDocs);
    
    console.log(`✅ Added permission: ${name}`);
  }

  // Add new role
  addRole(roleName, description, permissions = []) {
    let docs = this.readDocs();
    
    const roleSection = docs.indexOf('### Role Hierarchy');
    if (roleSection === -1) {
      console.error('❌ Could not find Role Hierarchy section');
      return;
    }

    const roleEntry = `
**${roleName}** (${description})
${permissions.length > 0 ? `- ${permissions.join('\n- ')}` : ''}
`;

    // Find the end of role hierarchy
    const nextSection = docs.indexOf('### ', roleSection + 1);
    const roleEnd = nextSection === -1 ? docs.indexOf('## ', roleSection + 1) : nextSection;
    const finalEnd = roleEnd === -1 ? docs.length : roleEnd;

    // Insert new role
    const updatedDocs = docs.slice(0, finalEnd) + roleEntry + docs.slice(finalEnd);
    this.writeDocs(updatedDocs);
    
    console.log(`✅ Added role: ${roleName}`);
  }

  // Read documentation file
  readDocs() {
    try {
      return fs.readFileSync(this.docsPath, 'utf8');
    } catch (error) {
      console.error('❌ Error reading documentation file:', error.message);
      return '';
    }
  }

  // Write documentation file
  writeDocs(content) {
    try {
      fs.writeFileSync(this.docsPath, content, 'utf8');
    } catch (error) {
      console.error('❌ Error writing documentation file:', error.message);
    }
  }

  // Generate changelog entry
  generateChangelog(changes) {
    const changelog = `
## Changelog - ${this.lastUpdated}

### Added
${changes.added?.map(item => `- ${item}`).join('\n') || '- No new features'}

### Changed
${changes.changed?.map(item => `- ${item}`).join('\n') || '- No changes'}

### Fixed
${changes.fixed?.map(item => `- ${item}`).join('\n') || '- No fixes'}

### Removed
${changes.removed?.map(item => `- ${item}`).join('\n') || '- No removals'}
`;

    return changelog;
  }

  // Update version number
  incrementVersion(type = 'patch') {
    const [major, minor, patch] = this.version.split('.').map(Number);
    
    switch (type) {
      case 'major':
        this.version = `${major + 1}.0.0`;
        break;
      case 'minor':
        this.version = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
      default:
        this.version = `${major}.${minor}.${patch + 1}`;
        break;
    }
    
    console.log(`📈 Version updated to: ${this.version}`);
  }
}

// CLI interface
if (require.main === module) {
  const updater = new DocumentationUpdater();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📚 Documentation Updater

Usage:
  node update-docs.js <command> [options]

Commands:
  feature <name> <description>     Add new feature
  api <method> <path> <desc>       Add new API endpoint
  permission <name> <key> <desc>   Add new permission
  role <name> <desc> [perms...]    Add new role
  version <type>                   Increment version (major|minor|patch)
  changelog                        Generate changelog

Examples:
  node update-docs.js feature "User Management" "Complete user CRUD operations"
  node update-docs.js api POST /users "Create new user"
  node update-docs.js permission USER_DELETE "user:delete" "Delete user accounts"
  node update-docs.js version minor
    `);
    process.exit(0);
  }

  const command = args[0];
  
  switch (command) {
    case 'feature':
      if (args.length < 3) {
        console.error('❌ Usage: feature <name> <description>');
        process.exit(1);
      }
      updater.addFeature(args[1], args[2]);
      break;
      
    case 'api':
      if (args.length < 4) {
        console.error('❌ Usage: api <method> <path> <description>');
        process.exit(1);
      }
      updater.addAPIEndpoint(args[1], args[2], args[3]);
      break;
      
    case 'permission':
      if (args.length < 4) {
        console.error('❌ Usage: permission <name> <key> <description>');
        process.exit(1);
      }
      updater.addPermission(args[1], args[2], args[3]);
      break;
      
    case 'role':
      if (args.length < 3) {
        console.error('❌ Usage: role <name> <description> [permissions...]');
        process.exit(1);
      }
      updater.addRole(args[1], args[2], args.slice(3));
      break;
      
    case 'version':
      updater.incrementVersion(args[1] || 'patch');
      updater.updateVersion();
      break;
      
    default:
      console.error(`❌ Unknown command: ${command}`);
      process.exit(1);
  }
}

module.exports = DocumentationUpdater;






