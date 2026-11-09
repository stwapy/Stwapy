'use client';

import React from 'react';
import { Category } from '@/lib/api';
import {
  BookOpen,
  Wrench,
  Cpu,
  Laptop,
  Smartphone,
  Home,
  Armchair,
  Bike,
  Layers,
  FlaskConical,
  Music,
  Trophy,
  Gift,
  Boxes,
} from 'lucide-react';

interface CategoryBarProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory: (categoryId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Wrench,
  Cpu,
  Laptop,
  Smartphone,
  Home,
  Armchair,
  Bike,
  Layers,
  FlaskConical,
  Music,
  Trophy,
  Gift,
};

export default function CategoryBar({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryBarProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2.5 min-w-max px-1">
        {/* All Categories Pill */}
        <button
          type="button"
          onClick={() => onSelectCategory('')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            !selectedCategoryId
              ? 'bg-[#5423A5] text-white shadow-md shadow-[#5423A5]/25 border border-[#5423A5]'
              : 'bg-white border border-[#E5E7EB] text-[#222222] hover:bg-[#F5F5F7]'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>All Items</span>
        </button>

        {/* Categories */}
        {categories.map((cat) => {
          const IconComp = iconMap[cat.icon] || Boxes;
          const isSelected = selectedCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#F1EAFE] text-[#5423A5] font-bold border-2 border-[#5423A5] shadow-xs'
                  : 'bg-white border border-[#E5E7EB] text-[#222222] font-semibold hover:bg-[#F5F5F7] hover:border-[#5423A5]/40'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isSelected ? 'text-[#5423A5]' : 'text-[#6B7280]'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
