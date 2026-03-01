import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor="search-problems"
        className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5"
      >
        Search
      </label>
      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <Search className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors duration-200" aria-hidden="true" />
        </div>
        <input
          id="search-problems"
          name="search"
          className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-2.5 pl-10 pr-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 sm:text-sm transition-all duration-200"
          placeholder={placeholder}
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
