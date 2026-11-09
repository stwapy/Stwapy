import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import OnboardingModal from '@/components/auth/OnboardingModal';

export const metadata: Metadata = {
  title: 'Stwapy — Student Marketplace & Campus Shopping',
  description:
    'Buy, sell, exchange and discover second-hand engineering books, drafters, calculators, laptops, bicycles, and hostel room essentials across colleges and universities.',
  keywords: [
    'Stwapy',
    'student marketplace',
    'campus shopping platform',
    'buy sell textbooks',
    'engineering drafter',
    'scientific calculator',
  ],
  authors: [{ name: 'Stwapy Technologies Pvt LTD' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <OnboardingModal />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
