import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Tag, 
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { ItemCard } from '../components/ItemCard';
import { CATEGORIES, LOCATIONS } from '../data/sampleData';
import { findMatchesForReport } from '../utils/matchingEngine';

export const ExplorePage = ({ 
  reports = [], 
  onSelectItem, 
  onSelectMatch,
  onInitiateReport 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'lost' | 'found'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'title'

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setLocationFilter('All Locations');
    setSortBy('newest');
  };

  const isFiltered = 
    searchQuery.trim() !== '' || 
    typeFilter !== 'all' || 
    categoryFilter !== 'all' || 
    locationFilter !== 'All Locations' ||
    sortBy !== 'newest';

  // Computed filtered & sorted items
  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // Type Filter
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }

      // Category Filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }

      // Location Filter
      if (locationFilter !== 'All Locations' && item.location !== locationFilter) {
        return false;
      }

      // Search Query (checks title, description, color, id)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title?.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesColor = item.color?.toLowerCase().includes(query);
        const matchesId = item.id?.toLowerCase().includes(query);
        const matchesLoc = item.location?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesColor && !matchesId && !matchesLoc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.dateTime || 0) - new Date(a.dateTime || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.dateTime || 0) - new Date(b.dateTime || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [reports, searchQuery, typeFilter, categoryFilter, locationFilter, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-midnight-950 tracking-tight">
            Explore Campus Registry
          </h1>
          <p className="text-xs sm:text-sm text-midnight-500 mt-1">
            Search, filter, and inspect all reported lost belongings and custodial found items.
          </p>
        </div>

        {/* Type Filter Tabs: All / Lost / Found */}
        <div className="flex p-1 bg-warm-200 rounded-xl border border-warm-300 self-start sm:self-auto shrink-0">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'lost', label: 'Lost Only' },
            { id: 'found', label: 'Found Only' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                typeFilter === tab.id
                  ? 'bg-midnight-950 text-white shadow-subtle'
                  : 'text-midnight-600 hover:text-midnight-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-warm-300 shadow-subtle space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, item name, color, campus building, or report ID..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium placeholder-midnight-400 bg-warm-50/50"
          />
          <Search className="w-5 h-5 text-midnight-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-midnight-400 hover:text-midnight-900"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-mono uppercase text-midnight-500 font-bold block mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-warm-300 bg-white text-midnight-900 focus:outline-none focus:border-midnight-800"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="text-[11px] font-mono uppercase text-midnight-500 font-bold block mb-1">
              Campus Location
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-warm-300 bg-white text-midnight-900 focus:outline-none focus:border-midnight-800 truncate"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div>
            <label className="text-[11px] font-mono uppercase text-midnight-500 font-bold block mb-1">
              Sort By
            </label>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-warm-300 bg-white text-midnight-900 focus:outline-none focus:border-midnight-800"
              >
                <option value="newest">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>

              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-2 rounded-xl bg-warm-200 hover:bg-warm-300 text-midnight-800 text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                  title="Reset all search filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Status Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-midnight-500 px-1">
        <span>
          Showing <strong className="text-midnight-950 font-bold">{filteredReports.length}</strong> of {reports.length} campus reports
        </span>
        {isFiltered && (
          <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Active Filter Applied
          </span>
        )}
      </div>

      {/* Items Grid */}
      {filteredReports.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-warm-300 space-y-4 shadow-subtle">
          <div className="w-16 h-16 rounded-2xl bg-warm-200 text-midnight-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 opacity-40" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-midnight-950">
              No matching records found
            </h3>
            <p className="text-xs text-midnight-600 max-w-sm mx-auto">
              We couldn't find any reports matching your search or active filter settings. Try relaxing your criteria or report a new item.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-warm-200 hover:bg-warm-300 text-midnight-900 font-bold text-xs"
            >
              Clear All Filters
            </button>
            <button
              onClick={onInitiateReport}
              className="px-4 py-2 rounded-xl bg-midnight-950 hover:bg-midnight-900 text-lime font-bold text-xs"
            >
              Report a New Item
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredReports.map((item) => {
            const matches = findMatchesForReport(item, reports, 40);
            return (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
                onFindMatches={() => {
                  if (matches.length > 0) {
                    onSelectMatch(matches[0]);
                  } else {
                    onSelectItem(item);
                  }
                }}
                matchCount={matches.length}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
