import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data import utility for Madrasa ERP
export class DataImporter {
  constructor() {
    this.entitiesPath = path.join(__dirname, 'Entities');
    this.dataPath = path.join(__dirname, 'data');
  }

  // Load entity schemas
  loadSchemas() {
    const entities = ['Student', 'Teacher', 'Attendance', 'FeePayment', 'Donation', 'HifzProgress'];
    const schemas = {};
    
    entities.forEach(entity => {
      const filePath = path.join(this.entitiesPath, `${entity}.json`);
      if (fs.existsSync(filePath)) {
        const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        schemas[entity] = schema;
        console.log(`✅ Loaded ${entity} schema`);
      }
    });
    
    return schemas;
  }

  // Import data from external JSON files
  importFromFile(entityName, filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const schema = this.loadSchemas()[entityName];
      
      if (!schema) {
        throw new Error(`Schema not found for entity: ${entityName}`);
      }

      // Validate data against schema
      const validatedData = this.validateData(fileData, schema);
      
      console.log(`✅ Imported ${validatedData.length} ${entityName} records from ${filePath}`);
      return validatedData;
    } catch (error) {
      console.error(`❌ Error importing ${entityName} data:`, error.message);
      throw error;
    }
  }

  // Validate data against schema
  validateData(data, schema) {
    if (!Array.isArray(data)) {
      data = [data];
    }

    return data.map((item, index) => {
      const validatedItem = {};
      
      // Check required fields
      if (schema.required) {
        schema.required.forEach(field => {
          if (!item[field]) {
            throw new Error(`Required field '${field}' is missing in record ${index + 1}`);
          }
          validatedItem[field] = item[field];
        });
      }

      // Validate optional fields
      Object.keys(schema.properties).forEach(field => {
        if (item[field] !== undefined) {
          const fieldSchema = schema.properties[field];
          
          // Type validation
          if (fieldSchema.type === 'string' && typeof item[field] !== 'string') {
            throw new Error(`Field '${field}' must be a string in record ${index + 1}`);
          }
          
          if (fieldSchema.type === 'number' && typeof item[field] !== 'number') {
            throw new Error(`Field '${field}' must be a number in record ${index + 1}`);
          }
          
          if (fieldSchema.type === 'boolean' && typeof item[field] !== 'boolean') {
            throw new Error(`Field '${field}' must be a boolean in record ${index + 1}`);
          }
          
          if (fieldSchema.type === 'array' && !Array.isArray(item[field])) {
            throw new Error(`Field '${field}' must be an array in record ${index + 1}`);
          }

          // Enum validation
          if (fieldSchema.enum && !fieldSchema.enum.includes(item[field])) {
            throw new Error(`Field '${field}' must be one of: ${fieldSchema.enum.join(', ')} in record ${index + 1}`);
          }

          validatedItem[field] = item[field];
        } else if (fieldSchema.default !== undefined) {
          validatedItem[field] = fieldSchema.default;
        }
      });

      return validatedItem;
    });
  }

  // Export data to JSON file
  exportToFile(entityName, data, filePath) {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Exported ${data.length} ${entityName} records to ${filePath}`);
    } catch (error) {
      console.error(`❌ Error exporting ${entityName} data:`, error.message);
      throw error;
    }
  }

  // Create sample data based on schema
  generateSampleData(entityName, count = 5) {
    const schema = this.loadSchemas()[entityName];
    if (!schema) {
      throw new Error(`Schema not found for entity: ${entityName}`);
    }

    const sampleData = [];
    
    for (let i = 0; i < count; i++) {
      const item = {};
      
      Object.keys(schema.properties).forEach(field => {
        const fieldSchema = schema.properties[field];
        
        if (fieldSchema.default !== undefined) {
          item[field] = fieldSchema.default;
        } else if (fieldSchema.enum) {
          item[field] = fieldSchema.enum[Math.floor(Math.random() * fieldSchema.enum.length)];
        } else {
          switch (fieldSchema.type) {
            case 'string':
              if (fieldSchema.format === 'email') {
                item[field] = `sample${i + 1}@example.com`;
              } else if (fieldSchema.format === 'date') {
                item[field] = new Date().toISOString().split('T')[0];
              } else {
                item[field] = `Sample ${field} ${i + 1}`;
              }
              break;
            case 'number':
              item[field] = Math.floor(Math.random() * 1000) + 1;
              break;
            case 'boolean':
              item[field] = Math.random() > 0.5;
              break;
            case 'array':
              item[field] = [`Sample Item ${i + 1}`];
              break;
            default:
              item[field] = `Sample ${field} ${i + 1}`;
          }
        }
      });
      
      sampleData.push(item);
    }
    
    return sampleData;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const importer = new DataImporter();
  const command = process.argv[2];
  const entityName = process.argv[3];
  const filePath = process.argv[4];
  
  switch (command) {
    case 'import':
      if (!entityName || !filePath) {
        console.log('Usage: node importData.js import <entityName> <filePath>');
        process.exit(1);
      }
      importer.importFromFile(entityName, filePath);
      break;
      
    case 'export':
      if (!entityName || !filePath) {
        console.log('Usage: node importData.js export <entityName> <filePath>');
        process.exit(1);
      }
      // This would need to be connected to the actual data source
      console.log('Export functionality requires connection to data source');
      break;
      
    case 'generate':
      const count = parseInt(process.argv[4]) || 5;
      if (!entityName) {
        console.log('Usage: node importData.js generate <entityName> [count]');
        process.exit(1);
      }
      const sampleData = importer.generateSampleData(entityName, count);
      console.log(JSON.stringify(sampleData, null, 2));
      break;
      
    default:
      console.log('Available commands:');
      console.log('  import <entityName> <filePath> - Import data from JSON file');
      console.log('  export <entityName> <filePath> - Export data to JSON file');
      console.log('  generate <entityName> [count] - Generate sample data');
      console.log('');
      console.log('Example:');
      console.log('  node importData.js generate Student 10');
      console.log('  node importData.js import Student ./data/students.json');
  }
}






