'use client';

import React from 'react';
import { District, Institution } from '@/lib/api';
import { SlidersHorizontal, RotateCcw, Building2, MapPin, IndianRupee, ChevronDown, Search, Check, X } from 'lucide-react';

interface FilterSidebarProps {
  districts: District[];
  institutions: Institution[];
  selectedDistrict: string;
  selectedInstitution: string;
  selectedCondition: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  onChangeDistrict: (val: string) => void;
  onChangeInstitution: (val: string) => void;
  onChangeCondition: (val: string) => void;
  onChangeMinPrice: (val: string) => void;
  onChangeMaxPrice: (val: string) => void;
  onChangeSortBy: (val: string) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  districts,
  institutions,
  selectedDistrict,
  selectedInstitution,
  selectedCondition,
  minPrice,
  maxPrice,
  sortBy,
  onChangeDistrict,
  onChangeInstitution,
  onChangeCondition,
  onChangeMinPrice,
  onChangeMaxPrice,
  onChangeSortBy,
  onReset,
}: FilterSidebarProps) {
  const [isCampusOpen, setIsCampusOpen] = React.useState(false);
  const [campusSearchQuery, setCampusSearchQuery] = React.useState('');
  const campusContainerRef = React.useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (campusContainerRef.current && !campusContainerRef.current.contains(e.target as Node)) {
        setIsCampusOpen(false);
      }
    };
    if (isCampusOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCampusOpen]);

  // Selected institution record
  const selectedInst = React.useMemo(() => {
    return institutions.find((i) => i.id === selectedInstitution);
  }, [institutions, selectedInstitution]);

  // Filter colleges matching selected district and search query
  const filteredColleges = React.useMemo(() => {
    let list = selectedDistrict
      ? institutions.filter((i) => i.district.toLowerCase() === selectedDistrict.toLowerCase())
      : institutions;

    if (campusSearchQuery.trim()) {
      const q = campusSearchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          (i.name && i.name.toLowerCase().includes(q)) ||
          (i.shortName && i.shortName.toLowerCase().includes(q)) ||
          (i.city && i.city.toLowerCase().includes(q)) ||
          (i.district && i.district.toLowerCase().includes(q))
      );
    }
    return list;
  }, [institutions, selectedDistrict, campusSearchQuery]);

  const sidebarRef = React.useRef<HTMLDivElement | null>(null);

  // Smooth scroll delegation: when sidebar hits top or bottom boundary, forward scroll to the window
  React.useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;

    const normalizeDelta = (e: WheelEvent) => {
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta = e.deltaY * 35;
      else if (e.deltaMode === 2) delta = e.deltaY * window.innerHeight;
      return delta;
    };

    const handleWheel = (e: WheelEvent) => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) {
        window.scrollBy({ top: normalizeDelta(e), behavior: 'auto' });
        return;
      }

      const isAtBottom = el.scrollTop >= maxScroll - 2;
      const isAtTop = el.scrollTop <= 2;
      const delta = normalizeDelta(e);

      if (delta > 0 && isAtBottom) {
        window.scrollBy({ top: delta, behavior: 'auto' });
      } else if (delta < 0 && isAtTop) {
        window.scrollBy({ top: delta, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 space-y-3.5 shadow-sm w-full md:max-h-[calc(100vh-130px)] overflow-y-auto overscroll-auto pr-3"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#C9ABFA #F5F5F7',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#5423A5]" />
          <h3 className="text-sm font-bold text-[#222222]">Filters & Campus</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] font-semibold text-[#858585] hover:text-[#5423A5] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222]">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onChangeSortBy(e.target.value)}
          className="w-full text-xs font-medium px-3 py-2 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5] cursor-pointer text-[#222222]"
        >
          <option value="newest">Newest Listings First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* District / Region */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#222222]">
          <MapPin className="w-3.5 h-3.5 text-[#5423A5]" />
          <label>Location / City</label>
        </div>
        <select
          value={selectedDistrict}
          onChange={(e) => {
            onChangeDistrict(e.target.value);
            onChangeInstitution(''); // Reset institution when district changes
          }}
          className="w-full text-xs font-medium px-3 py-2 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5] cursor-pointer text-[#222222]"
        >
          <option value="">All Locations</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name} ({d.headquarter})
            </option>
          ))}
        </select>
      </div>

      {/* College / University Filter - Explicitly opens DOWNWARDS */}
      <div className="space-y-1.5 relative" ref={campusContainerRef}>
        <div className="flex items-center justify-between text-xs font-bold text-[#222222]">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#5423A5]" />
            <label>Campus / College</label>
          </div>
          {selectedInstitution && (
            <button
              type="button"
              onClick={() => {
                onChangeInstitution('');
                setCampusSearchQuery('');
              }}
              className="text-[10px] text-[#5423A5] font-semibold hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Downwards Trigger Button */}
        <button
          type="button"
          onClick={() => setIsCampusOpen((prev) => !prev)}
          id="campus-college-trigger"
          className={`w-full flex items-center justify-between text-xs font-medium px-3 py-2.5 bg-[#F5F5F7] hover:bg-[#EBEBF0] border rounded-xl text-[#222222] transition-all cursor-pointer ${
            isCampusOpen ? 'border-[#5423A5] ring-2 ring-[#5423A5]/20 shadow-xs' : 'border-[#E5E7EB]'
          }`}
          aria-expanded={isCampusOpen}
        >
          <div className="truncate pr-2 text-left">
            {selectedInst ? (
              <span className="font-bold text-[#5423A5]">
                {selectedInst.shortName}{' '}
                <span className="font-normal text-slate-500 text-[11px]">({selectedInst.city})</span>
              </span>
            ) : (
              <span className="text-slate-600">
                All Institutions{' '}
                <span className="text-[10px] text-slate-400">({institutions.length})</span>
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#5423A5] shrink-0 transition-transform duration-200 ${
              isCampusOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Downwards Opening Menu Panel */}
        {isCampusOpen && (
          <div
            id="campus-college-dropdown-panel"
            className="mt-1.5 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2.5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 origin-top"
          >
            {/* Live Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={campusSearchQuery}
                onChange={(e) => setCampusSearchQuery(e.target.value)}
                placeholder="Search 286+ colleges or cities..."
                className="w-full text-xs pl-8 pr-7 py-2 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5423A5] focus:border-[#5423A5]"
                autoFocus
              />
              {campusSearchQuery && (
                <button
                  type="button"
                  onClick={() => setCampusSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Scrollable list downwards */}
            <div
              className="max-h-56 overflow-y-auto divide-y divide-slate-100 rounded-xl pr-1 space-y-0.5"
              style={{ scrollbarWidth: 'thin' }}
            >
              {/* Option: All Institutions */}
              <div
                onClick={() => {
                  onChangeInstitution('');
                  setIsCampusOpen(false);
                  setCampusSearchQuery('');
                }}
                className={`p-2 rounded-xl text-xs cursor-pointer flex items-center justify-between transition-colors ${
                  !selectedInstitution
                    ? 'bg-[#F1EAFE] text-[#5423A5] font-bold'
                    : 'hover:bg-[#F8FAFC] text-slate-700'
                }`}
              >
                <span>All Institutions ({institutions.length})</span>
                {!selectedInstitution && <Check className="w-3.5 h-3.5 text-[#5423A5]" />}
              </div>

              {/* Filtered Institutions */}
              {filteredColleges.map((inst) => {
                const isSelected = selectedInstitution === inst.id;
                return (
                  <div
                    key={inst.id}
                    onClick={() => {
                      onChangeInstitution(inst.id);
                      setIsCampusOpen(false);
                    }}
                    className={`p-2 rounded-xl text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#F1EAFE] text-[#5423A5] font-bold'
                        : 'hover:bg-[#F8FAFC] text-slate-700'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold text-slate-900 truncate">
                        {inst.shortName || inst.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {inst.city} • {inst.district}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#5423A5] shrink-0" />}
                  </div>
                );
              })}

              {filteredColleges.length === 0 && (
                <div className="p-3 text-center text-xs text-slate-400">
                  No colleges matching &quot;{campusSearchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Condition Filter (Clean & Compact Dropdown) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222]">Product Condition</label>
        <select
          value={selectedCondition}
          onChange={(e) => onChangeCondition(e.target.value)}
          className="w-full text-xs font-medium px-3 py-2 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5] cursor-pointer text-[#222222]"
        >
          <option value="">Any Condition (All)</option>
          <option value="NEW">Brand New</option>
          <option value="LIKE_NEW">Like New</option>
          <option value="GOOD">Good Condition</option>
          <option value="FAIR">Fair / Usable</option>
        </select>
      </div>

      {/* Price Range (Clean Input & Fast Preset Chips) */}
      <div className="space-y-2 pt-2.5 border-t border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#222222]">
            <IndianRupee className="w-3.5 h-3.5 text-[#FF7900]" />
            <label>Price Range (INR ₹)</label>
          </div>
          {(minPrice || maxPrice) && (
            <button
              type="button"
              onClick={() => {
                onChangeMinPrice('');
                onChangeMaxPrice('');
              }}
              className="text-[10px] font-bold text-[#5423A5] hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#858585]">₹</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onChangeMinPrice(e.target.value)}
              className="w-full text-xs font-medium pl-6 pr-2 py-2 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5] text-[#222222]"
            />
          </div>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#858585]">₹</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onChangeMaxPrice(e.target.value)}
              className="w-full text-xs font-medium pl-6 pr-2 py-2 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5] text-[#222222]"
            />
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
          {[
            { label: '< ₹500', min: '', max: '500' },
            { label: '₹500 - ₹2K', min: '500', max: '2000' },
            { label: '₹2K - ₹5K', min: '2000', max: '5000' },
            { label: '₹5K+', min: '5000', max: '' },
          ].map((p, idx) => {
            const isActive = minPrice === p.min && maxPrice === p.max;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChangeMinPrice(p.min);
                  onChangeMaxPrice(p.max);
                }}
                className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#5423A5] text-white border-[#5423A5] shadow-xs'
                    : 'bg-[#F5F5F7] text-[#6B7280] border-[#E5E7EB] hover:bg-[#F1EAFE] hover:text-[#5423A5] hover:border-[#5423A5]/30'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
