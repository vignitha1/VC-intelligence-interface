import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { ArrowUpDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Company, SortConfig } from '../types';
import { industries, locations } from '../utils/mockData';

interface CompanyTableProps {
  companies: Company[];
  onCompanySelect: (company: Company) => void;
  lists: { id: string; name: string; companyIds: string[] }[];
  onAddToList: (listId: string, companyId: string) => void;
}

export function CompanyTable({
  companies,
  onCompanySelect,
  lists,
  onAddToList
}: CompanyTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkListId, setBulkListId] = useState('');

  const itemsPerPage = 10;

  const filteredAndSortedCompanies = companies
    .filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
      const matchesLocation = locationFilter === 'all' || company.location === locationFilter;

      return matchesSearch && matchesIndustry && matchesLocation;
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { field, direction } = sortConfig;
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredAndSortedCompanies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: keyof Company) => {
    setSortConfig((prev) => {
      if (prev?.field === field) {
        return prev.direction === 'asc' ? { field, direction: 'desc' } : null;
      }
      return { field, direction: 'asc' };
    });
  };

  const handleSelectCompany = (companyId: string) => {
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else {
      newSelected.add(companyId);
    }
    setSelectedCompanies(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectedCompanies.size === paginatedCompanies.length) {
      setSelectedCompanies(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedCompanies(new Set(paginatedCompanies.map((c) => c.id)));
      setShowBulkActions(true);
    }
  };

  const handleBulkAddToList = () => {
    if (bulkListId) {
      selectedCompanies.forEach((companyId) => {
        onAddToList(bulkListId, companyId);
      });
      setSelectedCompanies(new Set());
      setShowBulkActions(false);
      setBulkListId('');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setIndustryFilter('all');
    setLocationFilter('all');
    setSortConfig(null);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Refine your company search</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                type="text"
                placeholder="Name, industry, or location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={industryFilter} onValueChange={(value) => {
                setIndustryFilter(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger id="industry">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={locationFilter} onValueChange={(value) => {
                setLocationFilter(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger id="location">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </CardContent>
      </Card>

      {showBulkActions && (
        <Card className="bg-sky-50 border-sky-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-sky-700">
                {selectedCompanies.size} companies selected
              </span>
              <div className="flex gap-2">
                <Select value={bulkListId} onValueChange={setBulkListId}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select list" />
                  </SelectTrigger>
                  <SelectContent>
                    {lists.map((list) => (
                      <SelectItem key={list.id} value={list.id}>
                        {list.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleBulkAddToList} disabled={!bulkListId} size="sm">
                  Add to List
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCompanies(new Set());
                    setShowBulkActions(false);
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Companies</CardTitle>
              <CardDescription>
                Showing {paginatedCompanies.length} of {filteredAndSortedCompanies.length} companies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-4 font-medium text-slate-600 w-12">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.size === paginatedCompanies.length && paginatedCompanies.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4"
                    />
                  </th>
                  {[
                    { key: 'name' as keyof Company, label: 'Name' },
                    { key: 'industry' as keyof Company, label: 'Industry' },
                    { key: 'location' as keyof Company, label: 'Location' },
                    { key: 'foundedYear' as keyof Company, label: 'Founded' },
                    { key: 'employees' as keyof Company, label: 'Employees' }
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="text-left p-4 font-medium text-slate-600 cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        {sortConfig?.field === key && (
                          <ArrowUpDown className="h-4 w-4 text-sky-600" />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="text-left p-4 font-medium text-slate-600 w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.has(company.id)}
                        onChange={() => handleSelectCompany(company.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4"
                      />
                    </td>
                    <td
                      className="p-4 font-medium"
                      onClick={() => onCompanySelect(company)}
                    >
                      {company.name}
                    </td>
                    <td className="p-4 text-slate-600" onClick={() => onCompanySelect(company)}>
                      {company.industry}
                    </td>
                    <td className="p-4 text-slate-600" onClick={() => onCompanySelect(company)}>
                      {company.location}
                    </td>
                    <td className="p-4 text-slate-600" onClick={() => onCompanySelect(company)}>
                      {company.foundedYear}
                    </td>
                    <td className="p-4 text-slate-600" onClick={() => onCompanySelect(company)}>
                      {company.employees}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCompanySelect(company)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}