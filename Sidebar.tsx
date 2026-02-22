import { Search, Building2, List, Bookmark, Menu } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) {
  const navItems = [
    { id: 'companies' as View, label: 'Companies', icon: Building2 },
    { id: 'lists' as View, label: 'Lists', icon: List },
    { id: 'saved-searches' as View, label: 'Saved Searches', icon: Bookmark }
  ];

  return (
    <aside
      className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-lg font-semibold text-sky-400">VC Intelligence</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 border-b border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder={isCollapsed ? '' : 'Search companies...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-sky-500 ${
              isCollapsed ? 'w-10 px-0' : 'w-full'
            }`}
            disabled={isCollapsed}
          />
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={currentView === item.id ? 'default' : 'ghost'}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full justify-start ${
                    currentView === item.id
                      ? 'bg-sky-600 text-white hover:bg-sky-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        {!isCollapsed && (
          <p className="text-xs text-slate-500">
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">Ctrl+K</kbd> to search
          </p>
        )}
      </div>
    </aside>
  );
}