import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Seed initial KYC verifications
const INITIAL_KYC = [
  {
    id: 'ver_001',
    studentName: 'Sourav Panda',
    college: 'KIIT University, Bhubaneswar',
    enrollmentNumber: '21051892',
    course: 'B.Tech Computer Science & Engg',
    yearOfStudy: '3rd Year (6th Sem)',
    email: 'sourav.panda.kiit@gmail.com',
    phone: '+91 82491 55219',
    state: 'Odisha',
    address: 'Campus 6 Boys Hostel, Room 302, Patia, Bhubaneswar',
    idCardImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    status: 'PENDING',
    submittedAt: '2026-10-24T14:32:00Z',
  },
  {
    id: 'ver_002',
    studentName: 'Subhashree Nayak',
    college: 'ITER, Siksha O Anusandhan, Bhubaneswar',
    enrollmentNumber: 'SOA22ECE041',
    course: 'B.Tech Electronics & Comm.',
    yearOfStudy: '2nd Year (4th Sem)',
    email: 'subhashree.nayak@iter.ac.in',
    phone: '+91 93378 44102',
    state: 'Odisha',
    address: 'Girls Hostel 2, Jagamara, Khandagiri, Bhubaneswar',
    idCardImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    status: 'PENDING',
    submittedAt: '2026-10-24T15:10:00Z',
  },
  {
    id: 'ver_003',
    studentName: 'Ankit Tripathy',
    college: 'Odisha University of Technology and Research (OUTR)',
    enrollmentNumber: '20OUTRMECH108',
    course: 'B.Tech Mechanical Engg',
    yearOfStudy: '4th Year (Final Sem)',
    email: 'ankit.outr@gmail.com',
    phone: '+91 79782 99014',
    state: 'Odisha',
    address: 'Ghatikia, Khandagiri, Bhubaneswar',
    idCardImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    status: 'PENDING',
    submittedAt: '2026-10-24T16:05:00Z',
  },
  {
    id: 'ver_004',
    studentName: 'Smruti Rekha Behera',
    college: 'SCB Medical College & Hospital, Cuttack',
    enrollmentNumber: 'SCB23MBBS089',
    course: 'MBBS - Medical Sciences',
    yearOfStudy: '2nd Professional Year',
    email: 'smruti.scb@gmail.com',
    phone: '+91 88950 12345',
    state: 'Odisha',
    address: 'Doctors Hostel Block B, Mangalabag, Cuttack',
    idCardImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    status: 'VERIFIED',
    submittedAt: '2026-10-23T11:20:00Z',
    reviewedAt: '2026-10-23T14:00:00Z',
    reviewedBy: 'Indrajit308',
  },
  {
    id: 'ver_005',
    studentName: 'Biswajit Mohanty',
    college: 'Veer Surendra Sai University of Technology (VSSUT), Burla',
    enrollmentNumber: 'VSSUT21CIVIL33',
    course: 'B.Tech Civil Engineering',
    yearOfStudy: '3rd Year (5th Sem)',
    email: 'biswajit.vssut@gmail.com',
    phone: '+91 94390 66781',
    state: 'Odisha',
    address: 'Hall of Residence 4, VSSUT Campus, Burla, Sambalpur',
    idCardImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    status: 'PENDING',
    submittedAt: '2026-10-24T17:15:00Z',
  },
];

// Helper to get cache file path
function getStorageFile() {
  const dir = path.join(process.cwd(), '.stwapy_cache');
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {}
  }
  return path.join(dir, 'verifications.json');
}

function loadVerifications(): any[] {
  try {
    const file = getStorageFile();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading verification store:', e);
  }
  return [...INITIAL_KYC];
}

function saveVerifications(data: any[]) {
  try {
    const file = getStorageFile();
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed writing verification store:', e);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const list = loadVerifications();

  if (email) {
    const cleanEmail = email.toLowerCase().trim();
    const found = list.find((v) => v.email.toLowerCase() === cleanEmail);
    return NextResponse.json({
      success: true,
      data: found || null,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }

  return NextResponse.json({
    success: true,
    data: list,
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const list = loadVerifications();

    if (action === 'SUBMIT_KYC') {
      const {
        studentName,
        email,
        phone,
        alternatePhone,
        address,
        college,
        enrollmentNumber,
        idCardImageUrl,
        course,
        yearOfStudy,
      } = payload;

      const cleanEmail = (email || '').toLowerCase().trim();
      const existingIdx = list.findIndex((v) => v.email.toLowerCase() === cleanEmail);

      const entry = {
        id: existingIdx >= 0 ? list[existingIdx].id : `ver_${Date.now()}`,
        studentName: studentName || 'Student',
        email: cleanEmail,
        phone: phone || '',
        alternatePhone: alternatePhone || '',
        address: address || '',
        college: college || 'College Campus',
        enrollmentNumber: enrollmentNumber || '',
        idCardImageUrl: idCardImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
        course: course || 'Degree Student',
        yearOfStudy: yearOfStudy || 'Enrolled',
        state: 'Odisha',
        status: 'PENDING',
        isCustomCollege: payload.isCustomCollege || false,
        collegeAddress: payload.collegeAddress || '',
        district: payload.district || 'Odisha',
        submittedAt: new Date().toISOString(),
      };

      if (existingIdx >= 0) {
        list[existingIdx] = entry;
      } else {
        list.unshift(entry);
      }

      saveVerifications(list);
      return NextResponse.json({ success: true, data: entry }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    if (action === 'APPROVE_KYC') {
      const { id, email, reviewedBy } = payload;
      const found = list.find((v) => (id && v.id === id) || (email && v.email.toLowerCase() === email.toLowerCase()));

      if (found) {
        found.status = 'VERIFIED';
        found.reviewedAt = new Date().toISOString();
        found.reviewedBy = reviewedBy || 'Admin';
        saveVerifications(list);
        return NextResponse.json({ success: true, data: found }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        });
      }
      return NextResponse.json({ success: false, error: 'Verification record not found' }, { status: 404 });
    }

    if (action === 'REJECT_KYC') {
      const { id, email, reason, reviewedBy } = payload;
      const found = list.find((v) => (id && v.id === id) || (email && v.email.toLowerCase() === email.toLowerCase()));

      if (found) {
        found.status = 'REJECTED';
        found.reviewedAt = new Date().toISOString();
        found.rejectionReason = reason || 'Unreadable ID card photo or invalid credentials.';
        found.reviewedBy = reviewedBy || 'Admin';
        saveVerifications(list);
        return NextResponse.json({ success: true, data: found }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        });
      }
      return NextResponse.json({ success: false, error: 'Verification record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
