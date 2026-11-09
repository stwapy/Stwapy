'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Building2,
  ShieldCheck,
} from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  institution: string;
  hostelOrRoom: string;
  street: string;
  city: string;
  district: string;
  pincode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'Indrajit Jena',
      phone: '+91 98765 43210',
      institution: 'KIIT University, Bhubaneswar',
      hostelOrRoom: 'KP-7 Hostel, Room 304',
      street: 'Campus 3 Main Road, Patia',
      city: 'Bhubaneswar',
      district: 'Khordha',
      pincode: '751024',
      isDefault: true,
    },
    {
      id: 'addr-2',
      name: 'Indrajit Jena (OUTR Hub)',
      phone: '+91 98765 43210',
      institution: 'OUTR Bhubaneswar',
      hostelOrRoom: 'Boys Hostel 2, Gate C',
      street: 'Techno Campus Road, Ghatikia',
      city: 'Bhubaneswar',
      district: 'Khordha',
      pincode: '751003',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newInstitution, setNewInstitution] = useState('KIIT University');
  const [newHostel, setNewHostel] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newDistrict, setNewDistrict] = useState('Khordha');
  const [newPincode, setNewPincode] = useState('751024');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newStreet) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      name: newName,
      phone: newPhone,
      institution: newInstitution,
      hostelOrRoom: newHostel,
      street: newStreet,
      city: 'Bhubaneswar',
      district: newDistrict,
      pincode: newPincode,
      isDefault: addresses.length === 0,
    };

    setAddresses([newAddr, ...addresses]);
    setShowAddForm(false);
    setNewName('');
    setNewStreet('');
    setNewHostel('');
  };

  const setDefault = (id: string) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Campus Address
          </button>
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-1">Campus Delivery Addresses</h1>
        <p className="text-xs text-slate-500 mb-6">Manage your college hostels, department gates, and safe peer pickup spots</p>

        {/* Add Address Form Modal / Box */}
        {showAddForm && (
          <form onSubmit={handleAddAddress} className="bg-white p-6 rounded-3xl border border-purple-200 shadow-md mb-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Add New Delivery Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-purple-700"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-purple-700"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">College / University</label>
                <select
                  value={newInstitution}
                  onChange={(e) => setNewInstitution(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-purple-700"
                >
                  <option value="KIIT University">KIIT University, Bhubaneswar</option>
                  <option value="OUTR Bhubaneswar">OUTR Bhubaneswar</option>
                  <option value="IIT Bhubaneswar">IIT Bhubaneswar</option>
                  <option value="SOA University">SOA University, SUM Hospital</option>
                  <option value="VSSUT Burla">VSSUT Burla, Sambalpur</option>
                  <option value="NIT Rourkela">NIT Rourkela</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Hostel & Room / Gate</label>
                <input
                  type="text"
                  value={newHostel}
                  onChange={(e) => setNewHostel(e.target.value)}
                  placeholder="e.g. KP-7 Hostel, Room 304"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-purple-700"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Street / Campus Landmark</label>
                <input
                  type="text"
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="e.g. Near Central Library or Sports Complex Gate"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-purple-700"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-purple-900 shadow-xs"
              >
                Save Delivery Spot
              </button>
            </div>
          </form>
        )}

        {/* Addresses List */}
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white p-6 rounded-3xl border transition-all ${
                addr.isDefault ? 'border-purple-400 shadow-sm' : 'border-slate-200/80 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{addr.name}</h3>
                    {addr.isDefault && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        Default Address
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{addr.phone}</p>
                  <p className="text-xs text-purple-700 font-semibold mt-2">{addr.institution}</p>
                  <p className="text-xs text-slate-700 mt-0.5">{addr.hostelOrRoom} • {addr.street}</p>
                  <p className="text-xs text-slate-500">{addr.city}, {addr.district} - {addr.pincode}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefault(addr.id)}
                      className="text-xs font-semibold text-purple-700 hover:underline"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => removeAddress(addr.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
