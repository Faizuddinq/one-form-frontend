
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from '../contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const FormResponses = () => {
  const { formId } = useParams();
  const { state } = useForm();
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  const form = state.forms.find(f => f.id === formId);
  const responses = state.responses.filter(r => r.formId === formId);

  if (!form) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Form Not Found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const exportToCsv = () => {
    if (responses.length === 0) return;

    // Get all field labels
    const allFields = form.steps.flatMap(step => step.fields);
    const headers = ['Submission Date', ...allFields.map(f => f.label)];

    // Convert responses to CSV format
    const csvData = responses.map(response => {
      return [
        new Date(response.submittedAt).toLocaleString(),
        ...allFields.map(field => {
          const value = response.data[field.id];
          if (Array.isArray(value)) {
            return value.join(', ');
          }
          return value || '';
        })
      ];
    });

    // Create CSV content
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.name}_responses.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJson = () => {
    if (responses.length === 0) return;

    const jsonData = JSON.stringify(responses, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.name}_responses.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-surface border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/builder" className="flex items-center space-x-2 text-text-primary hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Builder</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button onClick={exportToCsv} variant="outline" disabled={responses.length === 0}>
                Export CSV
              </Button>
              <Button onClick={exportToJson} variant="outline" disabled={responses.length === 0}>
                Export JSON
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            {form.name} - Responses
          </h1>
          <p className="text-text-muted">
            {responses.length} {responses.length === 1 ? 'response' : 'responses'} collected
          </p>
        </div>

        {responses.length === 0 ? (
          <div className="bg-surface rounded-xl p-12 border border-border text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No Responses Yet
            </h3>
            <p className="text-text-muted mb-6">
              Share your form to start collecting responses
            </p>
            <Link to={`/fill/${formId}`} className="btn-primary">
              View Form
            </Link>
          </div>
        ) : (
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-text-primary">Submitted</TableHead>
                    {form.steps.flatMap(step => step.fields).map(field => (
                      <TableHead key={field.id} className="text-text-primary">
                        {field.label}
                      </TableHead>
                    ))}
                    <TableHead className="text-text-primary">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.map((response) => (
                    <React.Fragment key={response.id}>
                      <TableRow className="border-border hover:bg-primary/50">
                        <TableCell className="text-text-primary">
                          {new Date(response.submittedAt).toLocaleDateString()}
                        </TableCell>
                        {form.steps.flatMap(step => step.fields).map(field => (
                          <TableCell key={field.id} className="text-text-primary max-w-xs truncate">
                            {Array.isArray(response.data[field.id])
                              ? response.data[field.id].join(', ')
                              : response.data[field.id] || '-'
                            }
                          </TableCell>
                        ))}
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedResponse(
                              selectedResponse === response.id ? null : response.id
                            )}
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${
                              selectedResponse === response.id ? 'rotate-180' : ''
                            }`} />
                          </Button>
                        </TableCell>
                      </TableRow>
                      
                      {selectedResponse === response.id && (
                        <TableRow className="border-border">
                          <TableCell colSpan={form.steps.flatMap(s => s.fields).length + 2}>
                            <div className="bg-primary rounded-lg p-4 space-y-4">
                              <h4 className="font-semibold text-text-primary mb-3">
                                Full Response Details
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {form.steps.flatMap(step => step.fields).map(field => (
                                  <div key={field.id}>
                                    <label className="text-sm font-medium text-text-primary">
                                      {field.label}
                                    </label>
                                    <div className="mt-1 text-text-muted">
                                      {Array.isArray(response.data[field.id])
                                        ? response.data[field.id].join(', ')
                                        : response.data[field.id] || 'No response'
                                      }
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="text-xs text-text-muted mt-4">
                                Submitted: {new Date(response.submittedAt).toLocaleString()}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormResponses;
