import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { EnrichmentData } from '../types';

interface EnrichmentCardProps {
  enrichment: EnrichmentData | null;
  isEnriching: boolean;
  onEnrich: () => void;
  isCached?: boolean;
}

export function EnrichmentCard({ enrichment, isEnriching, onEnrich, isCached }: EnrichmentCardProps) {
  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Company Intelligence</CardTitle>
            <CardDescription>
              {isCached && (
                <span className="flex items-center text-emerald-600 text-xs mt-1">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Cached result
                </span>
              )}
            </CardDescription>
          </div>
          <Button
            onClick={onEnrich}
            disabled={isEnriching || !!enrichment}
            className="bg-sky-600 hover:bg-sky-700"
          >
            {isEnriching ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Enriching...
              </>
            ) : enrichment ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Enriched
              </>
            ) : (
              'Enrich'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEnriching ? (
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
          </div>
        ) : enrichment ? (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Summary</h4>
              <p className="text-sm text-slate-600">{enrichment.summary}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Insights</h4>
              <ul className="space-y-1">
                {enrichment.bulletPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {enrichment.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Signals Detected</h4>
              <div className="space-y-1">
                {enrichment.signals.map((signal, idx) => (
                  <div key={idx} className="flex items-center text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <a
                href={enrichment.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sky-600 hover:text-sky-700 flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Source
              </a>
              <p className="text-xs text-slate-400 mt-1">
                Enriched: {new Date(enrichment.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-8">
            Click "Enrich" to fetch company intelligence
          </p>
        )}
      </CardContent>
    </Card>
  );
}