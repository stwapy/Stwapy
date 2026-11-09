'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Tag,
  Search,
} from 'lucide-react';

export default function SellerProductsPage() {
  const [products] = useState([
    {
      id: 'list-od-001',
      title: 'Casio fx-991EX Classwiz Scientific Calculator',
      price: 850,
      category: 'Scientific Calculators',
      condition: 'LIKE_NEW',
      stock: 1,
      views: 48,
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'list-od-002',
      title: 'Engineering Drawing Mini Drafter with Steel Arm',
      price: 350,
      category: 'Drafters & Tools',
      condition: 'GOOD',
      stock: 1,
      views: 31,
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'list-od-003',
      title: 'Higher Engineering Mathematics by BS Grewal (44th Edition)',
      price: 499,
      category: 'Engineering Textbooks',
      condition: 'NEW',
      stock: 2,
      views: 112,
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Manage Products & Inventory</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control pricing, stock levels, and student visibility</p>
        </div>

        <Link
          href="/post"
          className="inline-flex items-center gap-2 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Link>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search catalog..."
              className="w-full bg-slate-50 pl-9 pr-3 py-1.5 rounded-xl text-xs border border-slate-200 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500 font-semibold">{products.length} Products Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{item.category}</td>
                  <td className="p-4 font-bold text-slate-900">₹{item.price}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[10px]">
                      {item.condition}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{item.stock} in stock</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/listing/${item.id}`}
                        className="p-1.5 text-slate-400 hover:text-purple-800 transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
