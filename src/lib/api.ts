/**
 * STWAPY WEB API CLIENT
 * Connects to Stwapy Central Control Plane & State Gateway (Port 4000)
 * Operated by Stwapy Technologies Pvt LTD
 */

const CENTRAL_API_BASE = process.env.NEXT_PUBLIC_CENTRAL_API_URL || 'http://localhost:4000/api/v1';

export type UserAccountType = 'INSTITUTE_STUDENT' | 'STUDENT' | 'NORMAL_USER';
export type UserVerificationStatus = 'AUTO_VERIFIED' | 'VERIFIED' | 'PENDING' | 'REJECTED' | 'NOT_APPLICABLE';

export interface User {
  id: string;
  email: string;
  phone?: string;
  alternatePhone?: string;
  address?: string;
  fullName: string;
  avatarUrl?: string;
  role: 'STUDENT' | 'STATE_ADMIN' | 'SUPER_ADMIN';
  accountType?: UserAccountType;
  collegeName?: string;
  collegeIdNumber?: string;
  idCardImageUrl?: string;
  verificationStatus?: UserVerificationStatus;
  rejectionReason?: string;
  canSell?: boolean;
  profileComplete?: boolean;
  status: 'ACTIVE' | 'SUSPENDED';
  primaryState: string;
  createdAt: string;
}

import { ALL_COLLEGE_NAMES, ALL_ODISHA_COLLEGES } from '@/data/colleges';

// Known College Domains Mapping for Instant Auto-Detection
export const KNOWN_CAMPUS_DOMAINS: Record<string, string> = {
  'pmec.ac.in': 'Parala Maharaja Engineering College, Berhampur',
  'kiit.ac.in': 'KIIT University, Bhubaneswar',
  'iter.ac.in': 'ITER, Siksha O Anusandhan, Bhubaneswar',
  'soa.ac.in': 'ITER, Siksha O Anusandhan, Bhubaneswar',
  'outr.ac.in': 'Odisha University of Technology and Research (OUTR), Bhubaneswar',
  'cet.edu.in': 'Odisha University of Technology and Research (OUTR), Bhubaneswar',
  'vssut.ac.in': 'Veer Surendra Sai University of Technology (VSSUT), Burla',
  'nitrkl.ac.in': 'National Institute of Technology (NIT), Rourkela',
  'scbmch.in': 'SCB Medical College & Hospital, Cuttack',
  'iitbbs.ac.in': 'Indian Institute of Technology (IIT), Bhubaneswar',
  'aiimsbhubaneswar.edu.in': 'AIIMS Bhubaneswar',
  'ravenshawuniversity.ac.in': 'Ravenshaw University, Cuttack',
  'utkaluniversity.ac.in': 'Utkal University, Bhubaneswar',
  'silicon.ac.in': 'Silicon University, Bhubaneswar',
  'cgu-odisha.ac.in': 'C.V. Raman Global University, Bhubaneswar',
  'gita.edu.in': 'GITA Autonomous College, Bhubaneswar',
  'gcekjr.ac.in': 'Government College of Engineering, Keonjhar',
  'gcekbpatna.ac.in': 'Government College of Engineering, Kalahandi',
  'igitsarang.ac.in': 'Indira Gandhi Institute of Technology, Sarang',
  'iiit-bh.ac.in': 'IIIT Bhubaneswar',
  'driems.ac.in': 'DRIEMS University, Cuttack',
  'nist.edu': 'NIST University, Berhampur',
  'cutm.ac.in': 'Centurion University of Technology and Management',
  'xim.edu.in': 'XIM University, Bhubaneswar',
  'bgu.ac.in': 'Birla Global University, Bhubaneswar',
  'srisriuniversity.edu.in': 'Sri Sri University, Cuttack',
  'abit-edu.in': 'Ajay Binay Institute of Technology, Cuttack',
  'bietbhadrak.ac.in': 'Bhadrak Institute of Engineering and Technology',
  'trident.ac.in': 'Trident Academy of Technology, Bhubaneswar',
  'mkcgmch.org': 'MKCG Medical College and Hospital, Berhampur',
  'vimsar.ac.in': 'VIMSAR, Burla, Sambalpur',
  'nluo.ac.in': 'National Law University Odisha, Cuttack',
};

// 286 Deduplicated Colleges List
export const CAMPUS_INSTITUTIONS_LIST: string[] = ALL_COLLEGE_NAMES;
export { ALL_ODISHA_COLLEGES };

export const COLLEGE_DOMAIN_EXTENSIONS = [
  '.edu',
  '.ac.in',
  '.edu.in',
  '.college',
  '.university',
  '.school',
  '.institute',
  '.academy',
  '.res.in',
];

/**
 * Checks whether an email address belongs to an academic / college / educational domain.
 * Recognizes .edu, .ac.in, .edu.in, .college, .university, .school, .institute, .academy, and known campuses.
 */
export function isInstituteEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1].toLowerCase().trim();
  
  // Exclude common public non-educational email providers
  const publicProviders = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'proton.me',
    'protonmail.com',
    'zoho.com',
    'rediffmail.com',
    'aol.com',
    'mail.com',
    'ymail.com',
    'live.com',
  ];
  if (publicProviders.includes(domain)) return false;

  // Check known college domain mapping
  if (KNOWN_CAMPUS_DOMAINS[domain]) return true;

  // Check all standard and generic educational extensions
  for (const ext of COLLEGE_DOMAIN_EXTENSIONS) {
    if (domain.endsWith(ext) || domain.includes(`${ext}.`)) {
      return true;
    }
  }

  return false;
}

/**
 * Resolves college name from academic domain email:
 * 1. Checks KNOWN_CAMPUS_DOMAINS and registered domains
 * 2. Checks if a similar college name or acronym exists in the 286 colleges list
 * 3. If not listed and no similar college name found, adds/returns domain prefix uppercase (e.g. pmec.ac.in -> PMEC)
 */
export function detectCollegeFromEmail(email: string): string {
  if (!email || !email.includes('@')) return '';
  const domain = email.split('@')[1].toLowerCase().trim();
  const domainPrefix = domain.split('.')[0].trim().toLowerCase();
  
  if (KNOWN_CAMPUS_DOMAINS[domain]) {
    return KNOWN_CAMPUS_DOMAINS[domain];
  }

  // 1. Check in comprehensive Odisha colleges database direct domains
  const match = ALL_ODISHA_COLLEGES.find(c => c.domains && c.domains.some(d => d.toLowerCase() === domain));
  if (match) {
    return match.name;
  }

  // 2. Acronym and similar college name check against 286 colleges
  const KNOWN_ACRONYMS: Record<string, string> = {
    'pmec': 'Parala Maharaja Engineering College',
    'kiit': 'Kalinga Institute of Industrial Technology',
    'nitrkl': 'National Institute of Technology',
    'nit': 'National Institute of Technology',
    'iitbbs': 'Indian Institute of Technology',
    'iit': 'Indian Institute of Technology',
    'vssut': 'Veer Surendra Sai University of Technology',
    'outr': 'Odisha University of Technology and Research',
    'cet': 'Odisha University of Technology and Research',
    'igit': 'Indira Gandhi Institute of Technology',
    'igitsarang': 'Indira Gandhi Institute of Technology',
    'iiit-bh': 'International Institute of Information Technology',
    'iiit': 'International Institute of Information Technology',
    'soa': "Siksha 'O' Anusandhan",
    'iter': "Siksha 'O' Anusandhan",
    'cvrce': 'C. V. Raman Global University',
    'cgu': 'C. V. Raman Global University',
    'cvraman': 'C. V. Raman Global University',
    'silicon': 'Silicon University',
    'gita': 'Gandhi Institute for Technological Advancement',
    'gec': 'Gandhi Engineering College',
    'nist': 'NIST University',
    'giet': 'GIET University',
    'cutm': 'Centurion University of Technology and Management',
    'xim': 'XIM University',
    'bgu': 'Birla Global University',
    'srisriuniversity': 'Sri Sri University',
    'ravenshaw': 'Ravenshaw University',
    'ravenshawuniversity': 'Ravenshaw University',
    'utkal': 'Utkal University',
    'utkaluniversity': 'Utkal University',
    'rdwu': "Rama Devi Women's University",
    'rdwuniversity': "Rama Devi Women's University",
    'suniv': 'Sambalpur University',
    'buodisha': 'Berhampur University',
    'fmuniversity': 'Fakir Mohan Autonomous College',
    'fmu': 'Fakir Mohan Autonomous College',
    'gcekjr': 'Government College of Engineering, Keonjhar',
    'gcek': 'Government College of Engineering',
    'gcekbpatna': 'Government College of Engineering, Kalahandi',
    'aiimsbhubaneswar': 'All India Institute of Medical Sciences',
    'aiims': 'All India Institute of Medical Sciences',
    'scbmch': 'SCB Medical College and Hospital',
    'scb': 'SCB Medical College and Hospital',
    'mkcgmch': 'Maharaja Krishna Chandra Gajapati Medical College',
    'mkcg': 'Maharaja Krishna Chandra Gajapati Medical College',
    'vimsar': 'Veer Surendra Sai Institute of Medical Sciences',
    'nluo': 'National Law University Odisha',
    'ouat': 'Odisha University of Agriculture and Technology',
    'cipet': 'Central Institute of Petrochemicals Engineering and Technology',
    'trident': 'Trident Academy of Technology',
    'rec': 'Raajdhani Engineering College',
    'siet': 'Synergy Institute of Engineering and Technology',
    'kist': 'Konark Institute of Science and Technology',
    'abit': 'Ajay Binay Institute of Technology'
  };

  if (KNOWN_ACRONYMS[domainPrefix]) {
    const target = KNOWN_ACRONYMS[domainPrefix].toLowerCase();
    const found = ALL_ODISHA_COLLEGES.find(c => c.name.toLowerCase().includes(target) || c.shortName.toLowerCase().includes(target));
    if (found) return found.name;
  }

  // 3. ShortName match
  const byShortName = ALL_ODISHA_COLLEGES.find(c => {
    const sn = (c.shortName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return sn === domainPrefix;
  });
  if (byShortName) return byShortName.name;

  // 4. Computed Acronym
  for (const c of ALL_ODISHA_COLLEGES) {
    const words = c.name
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => !['of', 'and', 'the', 'in', 'at', 'for', 'to'].includes(w.toLowerCase()));
    const acronym = words.map(w => w[0]).join('').toLowerCase();
    if (acronym && acronym === domainPrefix) {
      return c.name;
    }
    if (domainPrefix.length > acronym.length && domainPrefix.startsWith(acronym)) {
      return c.name;
    }
  }

  // 5. Significant word containment (e.g. ravenshaw in Ravenshaw University)
  if (domainPrefix.length >= 4) {
    const byWord = ALL_ODISHA_COLLEGES.find(c => {
      const cleanName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanName.includes(domainPrefix) || domainPrefix.includes(cleanName);
    });
    if (byWord) return byWord.name;
  }

  // 6. IF NOT LISTED and no similar college found -> fallback to domain prefix uppercase (e.g. pmec.ac.in -> PMEC)
  return domainPrefix.toUpperCase();
}


export interface Listing {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone?: string;
  sellerVerificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  title: string;
  description: string;
  price: number;
  isNegotiable: boolean;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'FOR_PARTS';
  categoryId: string;
  categoryName: string;
  stateCode: string;
  district: string;
  city: string;
  institutionId?: string;
  institutionName?: string;
  meetingArea: string;
  status: 'ACTIVE' | 'PENDING_MODERATION' | 'RESERVED' | 'SOLD' | 'PAUSED' | 'REJECTED';
  images: { id: string; url: string; isPrimary: boolean; order: number }[];
  viewCount: number;
  isFavoritedByMe?: boolean;
  moderationNotes?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: { id: string; name: string; slug: string }[];
}

export interface District {
  id: string;
  name: string;
  headquarter: string;
  majorCities: string[];
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  district: string;
  city: string;
  type: string;
  address: string;
}

export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 'cat-books',
    name: 'Books & Notes',
    slug: 'books-notes',
    description: 'Engineering textbooks, semester notes, and reference guides',
    icon: 'BookOpen',
    subcategories: [
      { id: 'sub-engg', name: 'Engineering Textbooks', slug: 'engineering' },
      { id: 'sub-notes', name: 'Handwritten Notes', slug: 'notes' },
    ],
  },
  {
    id: 'cat-stationery',
    name: 'Calculators & Kits',
    slug: 'calculators-kits',
    description: 'Casio calculators, mini drafters, instruments and geometry kits',
    icon: 'Wrench',
    subcategories: [
      { id: 'sub-calc', name: 'Scientific Calculators', slug: 'calculators' },
      { id: 'sub-drafter', name: 'Mini Drafters', slug: 'mini-drafters' },
    ],
  },
  {
    id: 'cat-vehicles',
    name: 'Bicycles & Cycles',
    slug: 'bicycles-cycles',
    description: 'Campus commute bicycles, mountain bikes, and accessories',
    icon: 'Bike',
    subcategories: [
      { id: 'sub-gear', name: 'Gear Bicycles', slug: 'gear-cycles' },
      { id: 'sub-single', name: 'Standard Commuter', slug: 'commuter-cycles' },
    ],
  },
  {
    id: 'cat-electronics',
    name: 'Laptops & Gadgets',
    slug: 'laptops-electronics',
    description: 'Coding laptops, monitors, PC components, and study tablets',
    icon: 'Laptop',
    subcategories: [
      { id: 'sub-laptops', name: 'Laptops', slug: 'laptops' },
      { id: 'sub-monitors', name: 'Monitors & Screens', slug: 'monitors' },
    ],
  },
  {
    id: 'cat-hostel',
    name: 'Hostel & Living',
    slug: 'hostel-living',
    description: 'Room air coolers, electric kettles, extension boards, and study lamps',
    icon: 'Home',
    subcategories: [
      { id: 'sub-coolers', name: 'Room Air Coolers', slug: 'coolers' },
      { id: 'sub-kettles', name: 'Electric Kettles', slug: 'kettles' },
    ],
  },
  {
    id: 'cat-furniture',
    name: 'Study Furniture',
    slug: 'study-furniture',
    description: 'Ergonomic study chairs, foldable study tables, and book racks',
    icon: 'Armchair',
    subcategories: [
      { id: 'sub-chairs', name: 'Study Chairs', slug: 'chairs' },
      { id: 'sub-tables', name: 'Foldable Study Desks', slug: 'desks' },
    ],
  },
  {
    id: 'cat-medical',
    name: 'Medical & Lab Gear',
    slug: 'medical-lab',
    description: 'Stethoscopes, dissection boxes, lab coats, and bone sets',
    icon: 'FlaskConical',
    subcategories: [
      { id: 'sub-stetho', name: 'Stethoscopes', slug: 'stethoscopes' },
      { id: 'sub-apron', name: 'Lab Coats & Aprons', slug: 'aprons' },
    ],
  },
  {
    id: 'cat-gadgets',
    name: 'Audio & Peripherals',
    slug: 'audio-gadgets',
    description: 'Wireless headphones, Bluetooth speakers, keyboards, and mice',
    icon: 'Music',
    subcategories: [
      { id: 'sub-headphones', name: 'Headphones', slug: 'headphones' },
      { id: 'sub-keyboards', name: 'Keyboards & Mice', slug: 'keyboards' },
    ],
  },
];

export const FALLBACK_DISTRICTS: District[] = [
  { id: 'dist-khordha', name: 'Khordha', headquarter: 'Bhubaneswar', majorCities: ['Bhubaneswar', 'Jatni', 'Khurda'] },
  { id: 'dist-cuttack', name: 'Cuttack', headquarter: 'Cuttack', majorCities: ['Cuttack', 'Choudwar', 'Athagarh'] },
  { id: 'dist-sambalpur', name: 'Sambalpur', headquarter: 'Sambalpur', majorCities: ['Sambalpur', 'Burla', 'Hirakud'] },
  { id: 'dist-sundargarh', name: 'Sundargarh', headquarter: 'Sundargarh', majorCities: ['Rourkela', 'Sundargarh', 'Rajgangpur'] },
  { id: 'dist-ganjam', name: 'Ganjam', headquarter: 'Chhatrapur', majorCities: ['Berhampur', 'Gopalpur', 'Chhatrapur'] },
  { id: 'dist-puri', name: 'Puri', headquarter: 'Puri', majorCities: ['Puri', 'Konark', 'Pipili'] },
];

export const FALLBACK_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-kiit',
    name: 'KIIT University',
    shortName: 'KIIT Bhubaneswar',
    district: 'Khordha',
    city: 'Bhubaneswar',
    type: 'Deemed University',
    address: 'Patia, Bhubaneswar, Odisha 751024',
  },
  {
    id: 'inst-outr',
    name: 'Odisha University of Technology and Research (OUTR)',
    shortName: 'OUTR Bhubaneswar',
    district: 'Khordha',
    city: 'Bhubaneswar',
    type: 'State University',
    address: 'Ghatikia, Mahalaxmi Vihar, Bhubaneswar, Odisha 751029',
  },
  {
    id: 'inst-iter',
    name: 'ITER, Siksha O Anusandhan (SOA)',
    shortName: 'ITER / SOA Bhubaneswar',
    district: 'Khordha',
    city: 'Bhubaneswar',
    type: 'Deemed University',
    address: 'Jagamara, Khandagiri, Bhubaneswar, Odisha 751030',
  },
  {
    id: 'inst-vssut',
    name: 'Veer Surendra Sai University of Technology (VSSUT)',
    shortName: 'VSSUT Burla',
    district: 'Sambalpur',
    city: 'Burla',
    type: 'State University',
    address: 'Burla, Sambalpur, Odisha 768018',
  },
  {
    id: 'inst-iitbbs',
    name: 'Indian Institute of Technology (IIT) Bhubaneswar',
    shortName: 'IIT Bhubaneswar',
    district: 'Khordha',
    city: 'Jatni / Bhubaneswar',
    type: 'Institute of National Importance',
    address: 'Argul, Jatni, Odisha 752050',
  },
  {
    id: 'inst-nitr',
    name: 'National Institute of Technology (NIT) Rourkela',
    shortName: 'NIT Rourkela',
    district: 'Sundargarh',
    city: 'Rourkela',
    type: 'Institute of National Importance',
    address: 'Sector 1, Rourkela, Odisha 769008',
  },
  {
    id: 'inst-scb',
    name: 'SCB Medical College & Hospital',
    shortName: 'SCB Medical Cuttack',
    district: 'Cuttack',
    city: 'Cuttack',
    type: 'Government Medical College',
    address: 'Manglabag, Cuttack, Odisha 753007',
  },
  {
    id: 'inst-aiims',
    name: 'All India Institute of Medical Sciences (AIIMS) Bhubaneswar',
    shortName: 'AIIMS Bhubaneswar',
    district: 'Khordha',
    city: 'Bhubaneswar',
    type: 'Institute of National Importance',
    address: 'Sijua, Patrapada, Bhubaneswar, Odisha 751019',
  },
];

export const FALLBACK_LISTINGS: Listing[] = [
  {
    id: 'list-od-001',
    sellerId: 'user-student-odisha-003',
    sellerName: 'Rohan Patra',
    sellerEmail: 'student.odisha@kiit.ac.in',
    sellerPhone: '+919876543212',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Higher Engineering Mathematics — B.S. Grewal (44th Edition)',
    description: 'Standard textbook for 1st & 2nd year engineering mathematics at KIIT. In excellent condition, no torn pages or ink marks. Includes formula sheet.',
    price: 450,
    isNegotiable: true,
    condition: 'LIKE_NEW',
    categoryId: 'cat-books',
    categoryName: 'Books & Notes',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-kiit',
    institutionName: 'KIIT University',
    meetingArea: 'Campus 6 Food Court / Central Library Gate',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-001',
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 142,
    createdAt: '2026-10-26T10:15:00.000Z',
  },
  {
    id: 'list-od-002',
    sellerId: 'user-student-outr-004',
    sellerName: 'Priya Nayak',
    sellerEmail: 'student.new@outr.ac.in',
    sellerPhone: '+919876543213',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Casio FX-991EX ClassWiz Non-Programmable Scientific Calculator',
    description: 'Original genuine Casio FX-991EX calculator allowed in university semester exams. Matrix, calculus, complex numbers supported. New battery replaced.',
    price: 850,
    isNegotiable: false,
    condition: 'LIKE_NEW',
    categoryId: 'cat-stationery',
    categoryName: 'Calculators & Kits',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-outr',
    institutionName: 'OUTR (Formerly CET) Bhubaneswar',
    meetingArea: 'OUTR Main Auditorium Gate',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-002',
        url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 218,
    createdAt: '2026-10-26T11:30:00.000Z',
  },
  {
    id: 'list-od-003',
    sellerId: 'user-student-vssut-005',
    sellerName: 'Sourav Mohapatra',
    sellerEmail: 'sourav.vssut@gmail.com',
    sellerPhone: '+919876543214',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Omega Deluxe Mini Drafter + Engineering Drawing Board + Sheet Tube',
    description: 'Complete 1st year engineering graphics kit. Unbreakable scales, smooth rotating head, includes steel clamps and waterproof black carry sheet holder.',
    price: 550,
    isNegotiable: true,
    condition: 'GOOD',
    categoryId: 'cat-stationery',
    categoryName: 'Calculators & Kits',
    stateCode: 'OD',
    district: 'Sambalpur',
    city: 'Burla',
    institutionId: 'inst-vssut',
    institutionName: 'VSSUT Burla',
    meetingArea: 'Pulaha Hostel / Central Workshop',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-003',
        url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 165,
    createdAt: '2026-10-26T12:00:00.000Z',
  },
  {
    id: 'list-od-004',
    sellerId: 'user-student-iitbbs-006',
    sellerName: 'Ananya Senapati',
    sellerEmail: 'ananya.iitbbs@ac.in',
    sellerPhone: '+919876543215',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Hercules Roadeo 21-Speed Gear Bicycle (Campus Commute Ready)',
    description: 'Used for 1 year commuting between Brahmaputra Hostel and SES classrooms. Front suspension, disc brakes, brand new tires and bell. Free wire lock included.',
    price: 3200,
    isNegotiable: true,
    condition: 'GOOD',
    categoryId: 'cat-vehicles',
    categoryName: 'Bicycles & Cycles',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Jatni / Bhubaneswar',
    institutionId: 'inst-iitbbs',
    institutionName: 'IIT Bhubaneswar (Argul Campus)',
    meetingArea: 'Brahmaputra Hall of Residence Parking',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-004',
        url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 384,
    createdAt: '2026-10-26T09:00:00.000Z',
  },
  {
    id: 'list-od-005',
    sellerId: 'user-student-scb-007',
    sellerName: 'Dr. Bikash Das',
    sellerEmail: 'bikash.scb@gmail.com',
    sellerPhone: '+919876543216',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Pure Cotton Lab Coat (Medium) + Stainless Steel Dissection Box',
    description: 'Standard medical white apron for anatomy and pathology labs with SCB college crest. Dissection kit has all 14 instruments clean & sterilized.',
    price: 400,
    isNegotiable: false,
    condition: 'LIKE_NEW',
    categoryId: 'cat-medical',
    categoryName: 'Medical & Lab Gear',
    stateCode: 'OD',
    district: 'Cuttack',
    city: 'Cuttack',
    institutionId: 'inst-scb',
    institutionName: 'SCB Medical College & Hospital',
    meetingArea: 'UG Boys Hostel Common Room',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-005',
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 194,
    createdAt: '2026-10-26T14:20:00.000Z',
  },
  {
    id: 'list-od-006',
    sellerId: 'user-student-kiit-008',
    sellerName: 'Rohan Patra',
    sellerEmail: 'rohan.patra@kiit.ac.in',
    sellerPhone: '+919876543212',
    sellerVerificationStatus: 'VERIFIED',
    title: 'ASUS TUF Gaming F15 (16GB RAM, RTX 3050, 512GB NVMe SSD)',
    description: 'Intel i5 11th Gen, 144Hz IPS display, RGB keyboard. Excellent performance for machine learning projects, CAD modeling, and gaming. Comes with original 180W brick.',
    price: 38500,
    isNegotiable: true,
    condition: 'LIKE_NEW',
    categoryId: 'cat-electronics',
    categoryName: 'Laptops & Gadgets',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-kiit',
    institutionName: 'KIIT University',
    meetingArea: 'Campus 3 Computer Science Block Lobby',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-006',
        url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 412,
    createdAt: '2026-10-25T16:00:00.000Z',
  },
  {
    id: 'list-od-007',
    sellerId: 'user-student-iter-009',
    sellerName: 'Subhashree Sahu',
    sellerEmail: 'subhashree.iter@soa.ac.in',
    sellerPhone: '+919876543217',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Bajaj Arctic Personal Room Air Cooler (24L, Honeycomb Pads, 3-Speed)',
    description: 'Essential for hostel room summers in Bhubaneswar! Ice chamber, powerful air throw, low electricity consumption, runs smoothly on hostel inverter backup.',
    price: 2400,
    isNegotiable: true,
    condition: 'GOOD',
    categoryId: 'cat-hostel',
    categoryName: 'Hostel & Living',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-iter',
    institutionName: 'ITER, Siksha O Anusandhan (SOA)',
    meetingArea: 'ITER Campus 1 Boys Hostel Main Gate',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-007',
        url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 289,
    createdAt: '2026-10-25T14:10:00.000Z',
  },
  {
    id: 'list-od-008',
    sellerId: 'user-student-vssut-010',
    sellerName: 'Sourav Mohapatra',
    sellerEmail: 'sourav.vssut@gmail.com',
    sellerPhone: '+919876543214',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Havells Aqua Plus 1.5-Litre Stainless Steel Electric Kettle',
    description: 'Fast boiling in under 3 minutes. Perfect for late-night Maggi, coffee, and green tea in hostel. 304 food-grade stainless steel interior with auto cut-off.',
    price: 650,
    isNegotiable: false,
    condition: 'LIKE_NEW',
    categoryId: 'cat-hostel',
    categoryName: 'Hostel & Living',
    stateCode: 'OD',
    district: 'Sambalpur',
    city: 'Burla',
    institutionId: 'inst-vssut',
    institutionName: 'VSSUT Burla',
    meetingArea: 'Marichi Hall of Residence Reception',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-008',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 178,
    createdAt: '2026-10-25T11:45:00.000Z',
  },
  {
    id: 'list-od-009',
    sellerId: 'user-student-scb-011',
    sellerName: 'Dr. Bikash Das',
    sellerEmail: 'bikash.scb@gmail.com',
    sellerPhone: '+919876543216',
    sellerVerificationStatus: 'VERIFIED',
    title: '3M Littmann Classic III Stethoscope (Matte Black Edition)',
    description: 'High acoustic sensitivity for clinical examinations. Dual tunable diaphragms for adult and pediatric sides. 100% genuine with original box and spare ear tips.',
    price: 4200,
    isNegotiable: true,
    condition: 'LIKE_NEW',
    categoryId: 'cat-medical',
    categoryName: 'Medical & Lab Gear',
    stateCode: 'OD',
    district: 'Cuttack',
    city: 'Cuttack',
    institutionId: 'inst-scb',
    institutionName: 'SCB Medical College & Hospital',
    meetingArea: 'SCB Academic Block / Clinical OPD entrance',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-009',
        url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 320,
    createdAt: '2026-10-24T18:00:00.000Z',
  },
  {
    id: 'list-od-010',
    sellerId: 'user-student-outr-012',
    sellerName: 'Priya Nayak',
    sellerEmail: 'priya.outr@ac.in',
    sellerPhone: '+919876543213',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Firefox Target 29T Multi-Speed Mountain Bike (All-Terrain Disc Brakes)',
    description: 'Rugged alloy frame mountain bicycle with 21 Shimano gears, dual mechanical disc brakes, zoom front fork suspension. Flawless condition, ready to ride.',
    price: 5800,
    isNegotiable: true,
    condition: 'GOOD',
    categoryId: 'cat-vehicles',
    categoryName: 'Bicycles & Cycles',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-outr',
    institutionName: 'OUTR (Formerly CET) Bhubaneswar',
    meetingArea: 'OUTR Main Sports Ground Pavilion',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-010',
        url: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 275,
    createdAt: '2026-10-24T15:30:00.000Z',
  },
  {
    id: 'list-od-011',
    sellerId: 'user-student-iitbbs-013',
    sellerName: 'Ananya Senapati',
    sellerEmail: 'ananya.iitbbs@ac.in',
    sellerPhone: '+919876543215',
    sellerVerificationStatus: 'VERIFIED',
    title: 'BenQ 24-inch Eye-Care IPS Coding & Study Monitor (1080p, HDMI/VGA)',
    description: 'Flicker-free and Low Blue Light technology for long coding sessions and research paper reading. Includes HDMI cable and heavy-duty desk stand.',
    price: 5500,
    isNegotiable: true,
    condition: 'LIKE_NEW',
    categoryId: 'cat-electronics',
    categoryName: 'Laptops & Gadgets',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Jatni / Bhubaneswar',
    institutionId: 'inst-iitbbs',
    institutionName: 'IIT Bhubaneswar (Argul Campus)',
    meetingArea: 'Mahanadi Hall of Residence Common Room',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-011',
        url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 360,
    createdAt: '2026-10-24T13:20:00.000Z',
  },
  {
    id: 'list-od-012',
    sellerId: 'user-student-kiit-014',
    sellerName: 'Rohan Patra',
    sellerEmail: 'rohan.patra@kiit.ac.in',
    sellerPhone: '+919876543212',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Green Soul Ergonomic High-Back Study & Desk Mesh Chair',
    description: 'Breathable Korean mesh backrest, adjustable lumbar support, hydraulic height lift, and 360-degree castor wheels. Very comfortable for 8+ hour study sessions.',
    price: 2800,
    isNegotiable: true,
    condition: 'GOOD',
    categoryId: 'cat-furniture',
    categoryName: 'Study Furniture',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-kiit',
    institutionName: 'KIIT University',
    meetingArea: 'KP-7 International Boys Hostel Gate',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-012',
        url: 'https://images.unsplash.com/photo-1580481077190-736135889c88?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 198,
    createdAt: '2026-10-23T19:00:00.000Z',
  },
  {
    id: 'list-od-013',
    sellerId: 'user-student-iter-015',
    sellerName: 'Subhashree Sahu',
    sellerEmail: 'subhashree.iter@soa.ac.in',
    sellerPhone: '+919876543217',
    sellerVerificationStatus: 'VERIFIED',
    title: 'boAt Rockerz 550 Over-Ear Wireless Headphones (Active Bass, 20H Battery)',
    description: '50mm dynamic drivers with super extra bass, soft plush ear cushions for noise isolation. Can be used wired (AUX) or wireless via Bluetooth 5.0.',
    price: 1100,
    isNegotiable: true,
    condition: 'LIKE_NEW',
    categoryId: 'cat-gadgets',
    categoryName: 'Audio & Peripherals',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-iter',
    institutionName: 'ITER, Siksha O Anusandhan (SOA)',
    meetingArea: 'ITER Student Activity Center (SAC)',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-013',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 220,
    createdAt: '2026-10-23T16:40:00.000Z',
  },
  {
    id: 'list-od-014',
    sellerId: 'user-student-nitr-016',
    sellerName: 'Amitesh Mishra',
    sellerEmail: 'amitesh.nitr@nitrkl.ac.in',
    sellerPhone: '+919876543218',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Data Structures and Algorithms Made Easy — Narasimha Karumanchi',
    description: 'Must-have book for campus placements, coding rounds, and GATE CSE. Covers arrays, trees, dynamic programming, and system design basics with zero markings.',
    price: 380,
    isNegotiable: false,
    condition: 'GOOD',
    categoryId: 'cat-books',
    categoryName: 'Books & Notes',
    stateCode: 'OD',
    district: 'Sundargarh',
    city: 'Rourkela',
    institutionId: 'inst-nitr',
    institutionName: 'NIT Rourkela',
    meetingArea: 'Biju Patnaik Central Library Porch',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-014',
        url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 310,
    createdAt: '2026-10-23T11:00:00.000Z',
  },
  {
    id: 'list-od-015',
    sellerId: 'user-student-outr-017',
    sellerName: 'Priya Nayak',
    sellerEmail: 'priya.outr@ac.in',
    sellerPhone: '+919876543213',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Wipro Smart LED Desk Study Lamp (Touch Dimming, 3 Color Temperatures)',
    description: 'Rechargeable study lamp with 3 brightness modes (Warm, Day, Cool White). Flexible 360-degree goose neck with pen/phone holder base. Cable included.',
    price: 450,
    isNegotiable: false,
    condition: 'NEW',
    categoryId: 'cat-hostel',
    categoryName: 'Hostel & Living',
    stateCode: 'OD',
    district: 'Khordha',
    city: 'Bhubaneswar',
    institutionId: 'inst-outr',
    institutionName: 'OUTR (Formerly CET) Bhubaneswar',
    meetingArea: 'Kalinga Boys Hostel Gate',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-015',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 145,
    createdAt: '2026-10-22T17:15:00.000Z',
  },
  {
    id: 'list-od-016',
    sellerId: 'user-student-vssut-018',
    sellerName: 'Sourav Mohapatra',
    sellerEmail: 'sourav.vssut@gmail.com',
    sellerPhone: '+919876543214',
    sellerVerificationStatus: 'VERIFIED',
    title: 'Comprehensive Chemistry for Engineers + Semester Lab Practical Journal',
    description: 'BPUT/VSSUT 1st year syllabus covered. Includes thermodynamics, polymers, fuels, water treatment, and filled lab experiments with verified faculty signatures.',
    price: 320,
    isNegotiable: true,
    condition: 'LIKE_NEW',
    categoryId: 'cat-books',
    categoryName: 'Books & Notes',
    stateCode: 'OD',
    district: 'Sambalpur',
    city: 'Burla',
    institutionId: 'inst-vssut',
    institutionName: 'VSSUT Burla',
    meetingArea: 'VSSUT Main Gate Post Office',
    status: 'ACTIVE',
    images: [
      {
        id: 'img-016',
        url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
        order: 1,
      },
    ],
    viewCount: 160,
    createdAt: '2026-10-22T14:30:00.000Z',
  },
];

export function filterFallbackListings(
  listings: Listing[],
  params: Record<string, string | number | undefined> = {}
): Listing[] {
  let result = [...listings];

  // Search keyword (matches title, description, categoryName, or institutionName)
  if (params.search) {
    const q = String(params.search).toLowerCase().trim();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        (item.institutionName && item.institutionName.toLowerCase().includes(q))
    );
  }

  // Category
  if (params.categoryId) {
    const cat = String(params.categoryId).toLowerCase().trim();
    result = result.filter(
      (item) =>
        item.categoryId.toLowerCase() === cat ||
        item.categoryName.toLowerCase().includes(cat)
    );
  }

  // District
  if (params.district) {
    const dist = String(params.district).toLowerCase().trim();
    result = result.filter((item) => item.district.toLowerCase() === dist);
  }

  // Institution
  if (params.institutionId) {
    const inst = String(params.institutionId).toLowerCase().trim();
    result = result.filter(
      (item) =>
        item.institutionId?.toLowerCase() === inst ||
        item.institutionName?.toLowerCase().includes(inst)
    );
  }

  // Condition
  if (params.condition) {
    result = result.filter((item) => item.condition === params.condition);
  }

  // Min price
  if (params.minPrice !== undefined && params.minPrice !== '') {
    const min = Number(params.minPrice);
    if (!isNaN(min)) {
      result = result.filter((item) => item.price >= min);
    }
  }

  // Max price
  if (params.maxPrice !== undefined && params.maxPrice !== '') {
    const max = Number(params.maxPrice);
    if (!isNaN(max)) {
      result = result.filter((item) => item.price <= max);
    }
  }

  // Sort
  if (params.sortBy === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (params.sortBy === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  } else {
    // Newest first
    result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return result;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingImage?: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  lastMessageSnippet?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  sellerId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  productTitle?: string;
  productImage?: string;
  unitPrice?: number;
  totalPrice?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  totalAmount: number;
  paymentMethod: 'CASH_ON_DELIVERY' | 'UPI_ON_PICKUP' | 'ONLINE_UPI' | string;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED' | string;
  orderStatus: 'CONFIRMED' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED' | string;
  status?: string;
  pickupPoint: string;
  institutionName?: string;
  deliveryOtp?: string;
  deliveryType?: 'PICKUP' | 'STANDARD_DELIVERY' | 'SUPERFAST_DELIVERY' | string;
  deliveryFee?: number;
  platformFee?: number;
  partialAdvanceAmount?: number;
  remainingCashAmount?: number;
  estimatedDelivery?: string;
  deliveryAddress?: {
    recipientName?: string;
    streetAddress?: string;
    city?: string;
    stateCode?: string;
    pincode?: string;
    hostelOrRoom?: string;
  };
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// Token storage helpers
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('stwapy_token');
};

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('stwapy_token', token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('stwapy_token');
    localStorage.removeItem('stwapy_user');
  }
};

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('stwapy_user');
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('stwapy_user', JSON.stringify(user));
  }
};

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }

  const url = `${CENTRAL_API_BASE}${path}`;
  const res = await fetch(url, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

export const api = {
  // Auth
  async login(email: string, password: string) {
    const res: any = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.tokens?.accessToken) {
      setToken(res.data.tokens.accessToken);
      setStoredUser(res.data.user);
    }
    return res.data;
  },

  async register(data: { email: string; password: string; fullName: string; phone?: string; primaryState?: string }) {
    const res: any = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.data?.tokens?.accessToken) {
      setToken(res.data.tokens.accessToken);
      setStoredUser(res.data.user);
    }
    return res.data;
  },

  async syncFirebaseUser(firebaseData: {
    email: string;
    fullName?: string;
    avatarUrl?: string;
    firebaseUid: string;
    primaryState?: string;
  }) {
    const res: any = await apiFetch('/auth/firebase-sync', {
      method: 'POST',
      body: JSON.stringify(firebaseData),
    });
    if (res.data?.tokens?.accessToken) {
      setToken(res.data.tokens.accessToken);
      setStoredUser(res.data.user);
    }
    return res.data;
  },

  async getMe(): Promise<{ user: User; memberships: any[] }> {
    const res: any = await apiFetch('/auth/me');
    if (res.data?.user) {
      setStoredUser(res.data.user);
    }
    return res.data;
  },

  logout() {
    removeToken();
  },

  // State Registry
  async getStates() {
    const res: any = await apiFetch('/states');
    return res.data;
  },

  // Odisha Marketplace (routed via Central Gateway /api/v1/odisha/*)
  async getListings(params: Record<string, string | number | undefined> = {}): Promise<Listing[]> {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== '') query.append(key, String(val));
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      const res: any = await apiFetch(`/odisha/listings${qs}`);
      if (Array.isArray(res?.data) && res.data.length > 0) {
        return res.data;
      }
    } catch {
      // Backend offline or error -> fallback to rich demo catalog
    }
    return filterFallbackListings(FALLBACK_LISTINGS, params);
  },

  async getListingById(id: string): Promise<Listing & { sellerOtherListings: Listing[] }> {
    try {
      const res: any = await apiFetch(`/odisha/listings/${id}`);
      if (res?.data) return res.data;
    } catch {
      // fallback
    }
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('stwapy_custom_listings') || '[]');
        const foundStored = stored.find((l: any) => l.id === id);
        if (foundStored) {
          return { ...foundStored, sellerOtherListings: [] };
        }
      } catch {}
    }
    const found = FALLBACK_LISTINGS.find((l) => l.id === id) || FALLBACK_LISTINGS[0];
    const sellerOtherListings = FALLBACK_LISTINGS.filter(
      (l) => l.sellerId === found.sellerId && l.id !== found.id
    );
    return { ...found, sellerOtherListings };
  },

  async createListing(listingData: any): Promise<Listing> {
    try {
      const res: any = await apiFetch('/odisha/listings', {
        method: 'POST',
        body: JSON.stringify(listingData),
      });
      if (res?.data) {
        FALLBACK_LISTINGS.unshift(res.data);
        return res.data;
      }
    } catch (err) {
      console.warn('Backend API unavailable, saving listing to campus store', err);
    }

    const newId = 'list-user-' + Date.now();
    const newListing: any = {
      id: newId,
      sellerId: 'user-student-current',
      sellerName: 'Verified Student Seller',
      sellerEmail: 'student@stwapy.campus',
      sellerPhone: '+91 98765 43210',
      sellerVerificationStatus: 'VERIFIED',
      title: listingData.title,
      description: listingData.description,
      price: Number(listingData.price) || 0,
      isNegotiable: !!listingData.isNegotiable,
      condition: listingData.condition || 'GOOD',
      categoryId: listingData.categoryId,
      categoryName: listingData.categoryName || 'Campus Item',
      stateCode: 'OD',
      district: listingData.district || 'Khordha',
      city: listingData.city || 'Bhubaneswar',
      institutionId: listingData.institutionId,
      institutionName: listingData.institutionName || 'Campus Hub',
      meetingArea: listingData.meetingArea || 'College Campus',
      status: 'ACTIVE',
      images: Array.isArray(listingData.images)
        ? listingData.images.map((img: any, i: number) => ({
            id: `img-${Date.now()}-${i}`,
            url: typeof img === 'string' ? img : img.url,
            isPrimary: i === 0,
            order: i + 1,
          }))
        : [],
      viewCount: 1,
      createdAt: new Date().toISOString(),
      platformFeePaid: true,
      platformFeeAmount: listingData.platformFeeAmount || Math.round((Number(listingData.price) || 0) * 0.05),
    };

    FALLBACK_LISTINGS.unshift(newListing);
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('stwapy_custom_listings') || '[]');
        stored.unshift(newListing);
        localStorage.setItem('stwapy_custom_listings', JSON.stringify(stored));
      } catch {}
    }
    return newListing;
  },

  async updateListing(id: string, updates: any): Promise<Listing> {
    const res: any = await apiFetch(`/odisha/listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    return res.data;
  },

  async updateListingStatus(id: string, status: string): Promise<Listing> {
    const res: any = await apiFetch(`/odisha/listings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  async deleteListing(id: string) {
    return apiFetch(`/odisha/listings/${id}`, { method: 'DELETE' });
  },

  async getMyListings(): Promise<Listing[]> {
    try {
      const res: any = await apiFetch('/odisha/my-listings');
      if (Array.isArray(res?.data)) return res.data;
    } catch {}
    return FALLBACK_LISTINGS.slice(0, 2);
  },

  // Categories & Metadata
  async getCategories(): Promise<Category[]> {
    try {
      const res: any = await apiFetch('/odisha/categories');
      if (Array.isArray(res?.data) && res.data.length > 0) return res.data;
    } catch {}
    return FALLBACK_CATEGORIES;
  },

  // Locations & Colleges
  async getDistricts(): Promise<District[]> {
    try {
      const res: any = await apiFetch('/odisha/locations/districts');
      if (Array.isArray(res?.data) && res.data.length > 0) return res.data;
    } catch {}
    return FALLBACK_DISTRICTS;
  },

  async getInstitutions(district?: string): Promise<Institution[]> {
    try {
      const qs = district ? `?district=${encodeURIComponent(district)}` : '';
      const res: any = await apiFetch(`/odisha/locations/institutions${qs}`);
      if (Array.isArray(res?.data) && res.data.length > 0) return res.data;
    } catch {}
    if (district) {
      return FALLBACK_INSTITUTIONS.filter(
        (i) => i.district.toLowerCase() === district.toLowerCase()
      );
    }
    return FALLBACK_INSTITUTIONS;
  },

  // Favorites
  async getFavorites(): Promise<Listing[]> {
    const res: any = await apiFetch('/odisha/favorites');
    return res.data;
  },

  async toggleFavorite(listingId: string): Promise<{ isFavorited: boolean }> {
    const res: any = await apiFetch('/odisha/favorites', {
      method: 'POST',
      body: JSON.stringify({ listingId }),
    });
    return res.data;
  },

  // Buyer-Seller Messaging
  async getConversations(): Promise<Conversation[]> {
    const res: any = await apiFetch('/odisha/conversations');
    return res.data;
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const res: any = await apiFetch(`/odisha/conversations/${conversationId}/messages`);
    return res.data;
  },

  async sendMessage(data: { conversationId?: string; listingId?: string; content: string }) {
    const res: any = await apiFetch('/odisha/conversations/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  // Student Verification
  async getVerificationStatus() {
    const res: any = await apiFetch('/odisha/verification/status');
    return res.data;
  },

  async submitVerification(data: {
    institutionName: string;
    enrollmentNumber: string;
    idCardUrl: string;
    degree?: string;
    yearOfStudy?: number;
  }) {
    const res: any = await apiFetch('/odisha/verification/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  // Reports
  async submitReport(data: { targetType: string; targetId: string; reason: string; details?: string }) {
    return apiFetch('/odisha/reports', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Campus Shopping & Orders
  async createOrder(orderData: {
    items: OrderItem[];
    totalAmount: number;
    paymentMethod: string;
    pickupPoint: string;
    institutionName?: string;
    notes?: string;
    buyerPhone?: string;
    deliveryType?: 'PICKUP' | 'STANDARD_DELIVERY' | 'SUPERFAST_DELIVERY' | string;
    deliveryFee?: number;
    platformFee?: number;
    partialAdvanceAmount?: number;
    remainingCashAmount?: number;
    estimatedDelivery?: string;
    deliveryAddress?: {
      recipientName?: string;
      streetAddress?: string;
      city?: string;
      stateCode?: string;
      pincode?: string;
      hostelOrRoom?: string;
    };
  }): Promise<Order> {
    try {
      const res: any = await apiFetch('/odisha/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
      if (res?.data) return res.data;
    } catch {
      // Backend offline or mock mode -> return realistic generated order
    }

    const orderNumber = `STW-OD-${Math.floor(100000 + Math.random() * 900000)}`;
    const mockOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      buyerId: 'user-current',
      buyerName: orderData.deliveryAddress?.recipientName || 'Stwapy Student',
      buyerEmail: 'stwapysupport@gmail.com',
      buyerPhone: orderData.buyerPhone || '+91 98765 43210',
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'CASH_ON_DELIVERY_PARTIAL_ADVANCE' ? 'PARTIALLY_PAID_ADVANCE' : 'PAID',
      orderStatus: 'CONFIRMED',
      pickupPoint: orderData.pickupPoint,
      institutionName: orderData.institutionName || 'Campus Hub',
      deliveryType: orderData.deliveryType || 'PICKUP',
      deliveryFee: orderData.deliveryFee || 0,
      platformFee: orderData.platformFee || 0,
      partialAdvanceAmount: orderData.partialAdvanceAmount || 0,
      remainingCashAmount: orderData.remainingCashAmount || 0,
      estimatedDelivery: orderData.estimatedDelivery || '',
      deliveryAddress: orderData.deliveryAddress,
      deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      notes: orderData.notes,
      items: orderData.items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return mockOrder;
  },

  async getMyOrders(): Promise<Order[]> {
    const res: any = await apiFetch('/odisha/orders/my-orders');
    return res.data;
  },

  async getReceivedOrders(): Promise<Order[]> {
    const res: any = await apiFetch('/odisha/orders/received-orders');
    return res.data;
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const res: any = await apiFetch(`/odisha/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  // Odisha State Admin
  async getOdishaAdminAnalytics() {
    const res: any = await apiFetch('/odisha/admin/analytics');
    return res.data;
  },

  async getOdishaPendingListings(): Promise<Listing[]> {
    const res: any = await apiFetch('/odisha/admin/listings/pending');
    return res.data;
  },

  async moderateListing(id: string, status: 'ACTIVE' | 'REJECTED', notes?: string) {
    return apiFetch(`/odisha/admin/listings/${id}/moderate`, {
      method: 'PATCH',
      body: JSON.stringify({ status, moderationNotes: notes }),
    });
  },

  async getOdishaPendingVerifications() {
    const res: any = await apiFetch('/odisha/admin/verifications');
    return res.data;
  },

  async reviewVerification(id: string, status: 'VERIFIED' | 'REJECTED', notes?: string) {
    return apiFetch(`/odisha/admin/verifications/${id}/review`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reviewNotes: notes }),
    });
  },

  async getOdishaReports() {
    const res: any = await apiFetch('/odisha/admin/reports');
    return res.data;
  },

  async resolveReport(id: string, actionTaken: string) {
    return apiFetch(`/odisha/admin/reports/${id}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ actionTaken }),
    });
  },

  // Central Super-Admin
  async getCentralAnalytics() {
    const res: any = await apiFetch('/admin/analytics');
    return res.data;
  },

  async getCentralHealth() {
    const res: any = await apiFetch('/admin/health');
    return res.data;
  },

  async getCentralUsers(search?: string) {
    const qs = search ? `?search=${encodeURIComponent(search)}` : '';
    const res: any = await apiFetch(`/admin/users${qs}`);
    return res.data;
  },

  async updateUserRole(userId: string, role: string, stateCode?: string) {
    return apiFetch(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role, stateCode }),
    });
  },

  async updateUserStatus(userId: string, status: string) {
    return apiFetch(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async getColleges(query?: { search?: string; district?: string; type?: string; limit?: number }) {
    const params = new URLSearchParams();
    if (query?.search) params.append('search', query.search);
    if (query?.district) params.append('district', query.district);
    if (query?.type) params.append('type', query.type);
    if (query?.limit) params.append('limit', String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/colleges${qs}`);
  },

  async detectCollege(email: string) {
    return apiFetch('/colleges/detect', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async submitOtherCollege(data: {
    collegeName: string;
    collegeAddress: string;
    district?: string;
    registrationNo: string;
    idCardUrl: string;
    studentName?: string;
  }) {
    return apiFetch('/colleges/submit-other', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Strict Campus Negotiation Content Validator:
 * Prohibits sharing of Instagram handles, social media IDs, email addresses, phone numbers, or external contact details.
 * Discussions are strictly restricted to price negotiation.
 */
export function validateNegotiationMessage(content: string): { isValid: boolean; error?: string } {
  if (!content) return { isValid: true };
  const lower = content.toLowerCase();

  // Check email addresses & email keywords
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailKeywords = /\b(gmail|yahoo|outlook|hotmail|email|mail me|e-mail)\b/i;
  if (emailRegex.test(content) || emailKeywords.test(lower)) {
    return {
      isValid: false,
      error: 'Sharing email addresses is strictly prohibited. Keep discussions to price negotiation only.',
    };
  }

  // Check Instagram, Snapchat, Telegram, social media handles
  const socialRegex = /(?:instagram|insta(?:\s*id|\s*handle|\b)|ig(?:\s*:|\s+id|\s+handle|\b)|snapchat|snap\s*id|telegram|t\.me)/i;
  const handleRegex = /@[a-zA-Z0-9._]{3,}/;
  if (socialRegex.test(content) || handleRegex.test(content)) {
    return {
      isValid: false,
      error: 'Sharing Instagram, Snapchat, Telegram, or social media IDs is strictly prohibited. Keep discussions to price negotiation only.',
    };
  }

  // Check Phone numbers and WhatsApp
  const phoneRegex = /(?:\+?91[\s-]?)?[6-9]\d{9}|\b\d{5}[\s-]?\d{5}\b|\b\d{10}\b/;
  const contactKeywords = /\b(whatsapp|wa\.me|call me|phone number|mobile number|contact number|ph\s*no|contact me)\b/i;
  if (phoneRegex.test(content) || contactKeywords.test(lower)) {
    return {
      isValid: false,
      error: 'Sharing phone numbers or WhatsApp contacts is strictly prohibited. Keep discussions to price negotiation only.',
    };
  }

  return { isValid: true };
}

