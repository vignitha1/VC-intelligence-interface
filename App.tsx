import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { CompanyTable } from './components/CompanyTable';
import { CompanyProfile } from './components/CompanyProfile';
import { ListsManager } from './components/ListsManager';
import { SavedSearches } from './components/SavedSearches';
import { useLocalStorage } from './hooks/useLocalStorage';
import { mockCompanies } from './utils/mockData';
import { Company, CompanyList, SavedSearch, View } from './types';
import { Button } from '/components/ui/button';
import { Save } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('companies');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Filters state
  const [industryFilter, setIndustryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Local storage for lists and searches
  const [lists, setLists] = useLocalStorage<CompanyList[]>('vc-intelligence-lists', []);
  const [savedSearches, setSavedSearches] = useLocalStorage<SavedSearch[]>('vc-intelligence-saved-searches', []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveCurrentSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, industryFilter, locationFilter]);

  const handleCompanySelect = useCallback((company: Company) => {
    setSelectedCompany(company);
    setCurrentView('profile');
  }, []);

  const handleAddToList = useCallback((listId: string, companyId: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, companyIds: [...new Set([...list.companyIds, companyId])] }
          : list
      )
    );
  }, [setLists]);

  const handleCreateList = useCallback((name: string) => {
    const newList: CompanyList = {
      id: Date.now().toString(),
      name,
      companyIds: [],
      createdAt: Date.now()
    };
    setLists(prev => [...prev, newList]);
  }, [setLists]);

  const handleDeleteList = useCallback((listId: string) => {
    setLists(prev => prev.filter(list => list.id !== listId));
  }, [setLists]);

  const handleSaveCurrentSearch = useCallback(() => {
    if (!searchQuery && industryFilter === 'all' && locationFilter === 'all') {
      return;
    }

    const name = prompt('Name this search:');
    if (name) {
      const newSearch: SavedSearch = {
        id: Date.now().toString(),
        name,
        query: searchQuery,
        filters: {
          industry: industryFilter !== 'all' ? industryFilter : undefined,
          location: locationFilter !== 'all' ? locationFilter : undefined
        },
        timestamp: Date.now()
      };
      setSavedSearches(prev => [...prev, newSearch]);
    }
  }, [searchQuery, industryFilter, locationFilter, setSavedSearches]);

  const handleRunSearch = useCallback((search: SavedSearch) => {
    setSearchQuery(search.query);
    setIndustryFilter(search.filters.industry || 'all');
    setLocationFilter(search.filters.location || 'all');
    setCurrentView('companies');
  }, []);

  const handleDeleteSearch = useCallback((searchId: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  }, [setSavedSearches]);

  const renderContent = () => {
    switch (currentView) {
      case 'companies':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Companies</h2>
                <p className="text-slate-600">Discover and research potential investments</p>
              </div>
              <Button
                variant="outline"
                onClick={handleSaveCurrentSearch}
                disabled={!searchQuery && industryFilter === 'all' && locationFilter === 'all'}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Search
              </Button>
            </div>
            <CompanyTable
              companies={mockCompanies}
              onCompanySelect={handleCompanySelect}
              lists={lists}
              onAddToList={handleAddToList}
            />
          </div>
        );

      case 'profile':
        return selectedCompany ? (
          <CompanyProfile
            company={selectedCompany}
            onBack={() => {
              setSelectedCompany(null);
              setCurrentView('companies');
            }}
            lists={lists}
            onAddToList={handleAddToList}
            onCreateList={handleCreateList}
          />
        ) : null;

      case 'lists':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Lists</h2>
              <p className="text-slate-600">Organize and export your company lists</p>
            </div>
            <ListsManager
              lists={lists}
              onCreateList={handleCreateList}
              onDeleteList={handleDeleteList}
              onCompanySelect={handleCompanySelect}
            />
          </div>
        );

      case 'saved-searches':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Saved Searches</h2>
              <p className="text-slate-600">Quick access to your frequently used searches</p>
            </div>
            <SavedSearches
              searches={savedSearches}
              onDeleteSearch={handleDeleteSearch}
              onRunSearch={handleRunSearch}
              currentQuery={searchQuery}
              currentFilters={{
                industry: industryFilter !== 'all' ? industryFilter : undefined,
                location: locationFilter !== 'all' ? locationFilter : undefined
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}