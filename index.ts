export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  foundedYear: number;
  employees: number;
  logo?: string;
  website?: string;
}

export interface EnrichmentData {
  summary: string;
  bulletPoints: string[];
  keywords: string[];
  signals: string[];
  sourceUrl: string;
  timestamp: number;
}

export interface CompanyList {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: {
    industry?: string;
    location?: string;
    minEmployees?: number;
    maxEmployees?: number;
  };
  timestamp: number;
}

export type View = 'companies' | 'lists' | 'saved-searches' | 'profile';

export interface SortConfig {
  field: keyof Company;
  direction: 'asc' | 'desc';
}