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
import { Trash2, Play, Clock, Search } from 'lucide-react';
import { SavedSearch } from '../types';

interface SavedSearchesProps {
  searches: SavedSearch[];
  onDeleteSearch: (searchId: string) => void;
  onRunSearch: (search: SavedSearch) => void;
  currentQuery: string;
  currentFilters: {
    industry?: string;
    location?: string;
  };
}

export function SavedSearches({
  searches,
  onDeleteSearch,
  onRunSearch,
  currentQuery,
  currentFilters
}: SavedSearchesProps) {
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      const newSearch: SavedSearch = {
        id: Date.now().toString(),
        name: searchName.trim(),
        query: currentQuery,
        filters: currentFilters,
        timestamp: Date.now()
      };
      // This would be handled by parent component
      setShowSaveInput(false);
      setSearchName('');
    }
  };

  const getFilterDescription = (search: SavedSearch) => {
    const parts = [];
    if (search.query) parts.push(`"${search.query}"`);
    if (search.filters.industry) parts.push(`Industry: ${search.filters.industry}`);
    if (search.filters.location) parts.push(`Location: ${search.filters.location}`);
    return parts.length > 0 ? parts.join(' • ') : 'All companies';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Saved Searches</CardTitle>
          <CardDescription>Quick access to your frequently used searches</CardDescription>
        </CardHeader>
        <CardContent>
          {searches.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium">No saved searches</p>
              <p className="text-sm">Save a search to quickly access it later</p>
            </div>
          ) : (
            <div className="space-y-3">
              {searches.map((search) => (
                <Card key={search.id} className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{search.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {getFilterDescription(search)}
                        </p>
                        <p className="text-xs text-slate-400 mt-2 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Saved {new Date(search.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRunSearch(search)}
                          className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteSearch(search.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}