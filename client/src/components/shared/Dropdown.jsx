import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ label, options, selectedValue, onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || '';

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        className="relative w-full cursor-default rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-2.5 pl-4 pr-10 text-left text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 sm:text-sm transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <span className="block truncate">{selectedLabel}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1.5 max-h-60 w-full overflow-auto rounded-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl py-1.5 text-sm shadow-xl border border-slate-200/60 dark:border-slate-700/60 focus:outline-none">
          {options.map((option) => (
            <li
              key={option.value}
              className={`relative cursor-default select-none py-2.5 pl-4 pr-9 transition-colors duration-150 rounded-lg mx-1 ${option.value === selectedValue
                  ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              onMouseDown={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              <span className="block truncate">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
