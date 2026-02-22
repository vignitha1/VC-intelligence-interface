import { useState } from 'react';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '/components/ui/card';
import { Plus, Download, Trash2, Building2, ArrowLeft } from 'lucide-react';
import { CompanyList, Company } from '../types';
import { mockCompanies } from '../utils/mockData';

interface ListsManagerProps {
  lists: CompanyList[];
  onCreateList: (name: string) => void;
  onDeleteList: (listId: string) => void;
  onCompanySelect: (company: Company) => void;
}

export function ListsManager({
  lists,
  onCreateList,
  onDeleteList,
  onCompanySelect
}: ListsManagerProps) {
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName('');
      setShowNewListInput(false);
    }
  };

  const handleExportList = (list: CompanyList) => {
    const companies = list.companyIds
      .map(id => mockCompanies.find(c => c.id === id))
      .filter(Boolean) as Company[];

    const csvContent = [
      ['Name', 'Industry', 'Location', 'Founded', 'Employees', 'Website'].join(','),
      ...companies.map(c => [
        c.name,
        c.industry,
        c.location,
        c.foundedYear,
        c.employees,
        c.website || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name.replace(/\s+/g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = (list: CompanyList) => {
    const companies = list.companyIds
      .map(id => mockCompanies.find(c => c.id === id))
      .filter(Boolean) as Company[];

    const jsonContent = JSON.stringify(companies, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Lists</CardTitle>
              <CardDescription>Organize and export your company lists</CardDescription>
            </div>
            <Button onClick={() => setShowNewListInput(!showNewListInput)}>
              <Plus className="h-4 w-4 mr-2" />
              New List
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showNewListInput && (
            <div className="flex gap-2 mb-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <Label htmlFor="new-list-name">List Name</Label>
                <Input
                  id="new-list-name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter list name..."
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleCreateList} disabled={!newListName.trim()}>
                  Create
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewListInput(false);
                    setNewListName('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {lists.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium">No lists yet</p>
              <p className="text-sm">Create a list to start organizing companies</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {lists.map((list) => {
                const companies = list.companyIds
                  .map(id => mockCompanies.find(c => c.id === id))
                  .filter(Boolean) as Company[];

                return (
                  <Card key={list.id} className="border-slate-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{list.name}</CardTitle>
                          <CardDescription>
                            {companies.length} company{companies.length !== 1 ? 'ies' : ''}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteList(list.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {companies.slice(0, 5).map((company) => (
                          <div
                            key={company.id}
                            className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer"
                            onClick={() => onCompanySelect(company)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">
                                <span className="text-sm font-semibold text-slate-500">
                                  {company.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{company.name}</p>
                                <p className="text-xs text-slate-500">{company.industry}</p>
                              </div>
                            </div>
                            <ArrowLeft className="h-4 w-4 text-slate-400 rotate-180" />
                          </div>
                        ))}
                        {companies.length > 5 && (
                          <p className="text-sm text-slate-500 text-center py-2">
                            +{companies.length - 5} more companies
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportList(list)}
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportJson(list)}
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export JSON
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}