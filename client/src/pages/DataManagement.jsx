import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { 
  Upload, 
  Download, 
  FileText, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Info
} from 'lucide-react';
import { DataImporter } from '../utils/dataImporter.jsx';

export default function DataManagement() {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [importFile, setImportFile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [exportStatus, setExportStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const entities = DataImporter.getAvailableEntities();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      setImportFile(file);
      setImportStatus(null);
    } else {
      setImportStatus({ 
        type: 'error', 
        message: 'Please select a valid JSON file' 
      });
    }
  };

  const handleImport = async () => {
    if (!selectedEntity || !importFile) {
      setImportStatus({ 
        type: 'error', 
        message: 'Please select an entity and file' 
      });
      return;
    }

    setIsLoading(true);
    setImportStatus(null);

    try {
      // Validate data first
      const text = await importFile.text();
      const data = JSON.parse(text);
      const validation = DataImporter.validateData(data, selectedEntity);
      
      if (!validation.valid) {
        setImportStatus({ 
          type: 'error', 
          message: validation.error 
        });
        setIsLoading(false);
        return;
      }

      // Import data
      const result = await DataImporter.importFromFile(selectedEntity, importFile);
      setImportStatus({ 
        type: 'success', 
        message: result.message 
      });
      setImportFile(null);
      document.getElementById('file-input').value = '';
    } catch (error) {
      setImportStatus({ 
        type: 'error', 
        message: error.message 
      });
    }
    setIsLoading(false);
  };

  const handleExport = async () => {
    if (!selectedEntity) {
      setExportStatus({ 
        type: 'error', 
        message: 'Please select an entity to export' 
      });
      return;
    }

    setIsLoading(true);
    setExportStatus(null);

    try {
      const result = await DataImporter.exportToFile(selectedEntity);
      setExportStatus({ 
        type: 'success', 
        message: result.message 
      });
    } catch (error) {
      setExportStatus({ 
        type: 'error', 
        message: error.message 
      });
    }
    setIsLoading(false);
  };

  const downloadTemplate = () => {
    if (!selectedEntity) {
      setImportStatus({ 
        type: 'error', 
        message: 'Please select an entity first' 
      });
      return;
    }

    const template = DataImporter.generateSampleTemplate(selectedEntity);
    const blob = new Blob([JSON.stringify(template, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedEntity}_template.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 flex items-center gap-2">
            <Database className="w-8 h-8" />
            Data Management
          </h1>
          <p className="text-emerald-600 mt-1">
            Import and export data for your Madarsa ERP system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Import Section */}
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Import Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Entity Selection */}
              <div>
                <Label htmlFor="entity-select">Select Entity</Label>
                <select
                  id="entity-select"
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full mt-1 p-2 border border-emerald-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Choose an entity...</option>
                  {entities.map(entity => (
                    <option key={entity.name} value={entity.name}>
                      {entity.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload */}
              <div>
                <Label htmlFor="file-input">Select JSON File</Label>
                <Input
                  id="file-input"
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="mt-1"
                />
                {importFile && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
                    <FileText className="w-4 h-4" />
                    {importFile.name}
                  </div>
                )}
              </div>

              {/* Template Download */}
              <div className="flex gap-2">
                <Button
                  onClick={downloadTemplate}
                  variant="outline"
                  className="flex-1"
                  disabled={!selectedEntity}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!selectedEntity || !importFile || isLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? 'Importing...' : 'Import Data'}
                </Button>
              </div>

              {/* Import Status */}
              {importStatus && (
                <div className={`p-3 rounded-md flex items-center gap-2 ${
                  importStatus.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {importStatus.type === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {importStatus.message}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Export Section */}
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Entity Selection for Export */}
              <div>
                <Label htmlFor="export-entity-select">Select Entity</Label>
                <select
                  id="export-entity-select"
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full mt-1 p-2 border border-emerald-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Choose an entity...</option>
                  {entities.map(entity => (
                    <option key={entity.name} value={entity.name}>
                      {entity.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Export Button */}
              <Button
                onClick={handleExport}
                disabled={!selectedEntity || isLoading}
                className="w-full bg-sky-600 hover:bg-sky-700"
              >
                {isLoading ? 'Exporting...' : 'Export Data'}
              </Button>

              {/* Export Status */}
              {exportStatus && (
                <div className={`p-3 rounded-md flex items-center gap-2 ${
                  exportStatus.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {exportStatus.type === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {exportStatus.message}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Entity Information */}
        <Card className="mt-8 bg-white/60 backdrop-blur-sm border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Available Entities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entities.map(entity => (
                <div key={entity.name} className="p-4 border border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {entity.name}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-emerald-900">{entity.label}</h4>
                  <p className="text-sm text-emerald-600">{entity.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8 bg-sky-50/60 backdrop-blur-sm border-sky-200/50">
          <CardHeader>
            <CardTitle className="text-sky-900">Import Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-sky-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>Select the entity type you want to import data for</li>
              <li>Download the template to see the required data structure</li>
              <li>Prepare your JSON file following the template format</li>
              <li>Upload your JSON file and click "Import Data"</li>
              <li>The system will validate your data before importing</li>
            </ol>
            <div className="mt-4 p-3 bg-sky-100 rounded-md">
              <strong>Note:</strong> All imported data will be added to existing records. 
              Make sure your data follows the correct format to avoid errors.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



