import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { Company, EnrichmentData, CompanyList } from '../types';
import { EnrichmentCard } from './EnrichmentCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface CompanyProfileProps {
  company: Company;
  onBack: () => void;
  lists: CompanyList[];
  onAddToList: (listId: string, companyId: string) => void;
  onCreateList: (name: string) => void;
}

export function CompanyProfile({
  company,
  onBack,
  lists,
  onAddToList,
  onCreateList
}: CompanyProfileProps) {
  const [notes, setNotes] = useState('');
  const [enrichment, setEnrichment] = useState<EnrichmentData | null>(null);
  const [isEnriching, setIsEnriching] = useState(false);
  const [selectedList, setSelectedList] = useState<string>('');
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`vc-intelligence-notes-${company.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [company.id]);

  // Load cached enrichment
  useEffect(() => {
    const cache = localStorage.getItem('vc-intelligence-enrichment-cache');
    if (cache) {
      const parsedCache = JSON.parse(cache);
      if (parsedCache[company.id]) {
        setEnrichment(parsedCache[company.id]);
      }
    }
  }, [company.id]);

  const handleSaveNotes = () => {
    localStorage.setItem(`vc-intelligence-notes-${company.id}`, notes);
  };

  const handleEnrich = async () => {
    setIsEnriching(true);
    
    // Simulate API call with 2 second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockEnrichment: EnrichmentData = {
      summary: `${company.name} is a ${company.industry} company founded in ${company.foundedYear}. Based in ${company.location}, the company has grown to ${company.employees} employees and is positioned as a key player in their sector.`,
      bulletPoints: [
        `Strong growth trajectory with ${company.employees} team members`,
        `Strategic location in ${company.location.split(',')[1]?.trim() || company.location}`,
        `Operating in the competitive ${company.industry} market`,
        `Founded during the ${company.foundedYear >= 2020 ? 'post-pandemic' : 'pre-pandemic'} era`,
        `Focus on innovation and market expansion`
      ],
      keywords: [
        company.industry.toLowerCase(),
        'startup',
        'technology',
        'innovation',
        'growth',
        'venture capital',
        'scaling'
      ],
      signals: [
        'Active careers page detected',
        'Recent blog posts found',
        'Social media presence active',
        'Funding announcements tracked'
      ],
      sourceUrl: `https://example.com/enrichment/${company.id}`,
      timestamp: Date.now()
    };

    setEnrichment(mockEnrichment);

    // Cache the result
    const cache = localStorage.getItem('vc-intelligence-enrichment-cache') || '{}';
    const parsedCache = JSON.parse(cache);
    parsedCache[company.id] = mockEnrichment;
    localStorage.setItem('vc-intelligence-enrichment-cache', JSON.stringify(parsedCache));

    setIsEnriching(false);
  };

  const handleAddToList = () => {
    if (selectedList) {
      onAddToList(selectedList, company.id);
      setSelectedList('');
    }
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName('');
      setShowNewListInput(false);
    }
  };

  const isEnriched = !!enrichment;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Companies
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-slate-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-400">
                  {company.name.charAt(0)}
                </span>
              </div>
              <div>
                <CardTitle className="text-2xl">{company.name}</CardTitle>
                <p className="text-slate-600 mt-1">{company.industry}</p>
                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                  <span>{company.location}</span>
                  <span>•</span>
                  <span>Founded {company.foundedYear}</span>
                  <span>•</span>
                  <span>{company.employees} employees</span>
                </div>
              </div>
            </div>
            {company.website && (
              <Button variant="outline" asChild>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Add your notes about this company..."
              className="min-h-32 mt-2"
            />
            <p className="text-xs text-slate-400 mt-1">Notes are auto-saved</p>
          </div>

          <div>
            <Label>Add to List</Label>
            <div className="flex gap-2 mt-2">
              <Select value={selectedList} onValueChange={setSelectedList}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a list" />
                </SelectTrigger>
                <SelectContent>
                  {lists.map((list) => (
                    <SelectItem key={list.id} value={list.id}>
                      {list.name} ({list.companyIds.length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddToList} disabled={!selectedList}>
                Add
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewListInput(!showNewListInput)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {showNewListInput && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="New list name..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
                />
                <Button onClick={handleCreateList} size="sm">
                  Create
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EnrichmentCard
        enrichment={enrichment}
        isEnriching={isEnriching}
        onEnrich={handleEnrich}
        isCached={isEnriched}
      />
    </div>
  );
}