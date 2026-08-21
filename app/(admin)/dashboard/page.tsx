// app/admin/dashboard/page.tsx
import { authorizeRole } from '@/lib/auth';
import Navbar from '@/src/components/layout/Navbar/Navbar';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  // const { authorized, reason } = await authorizeRole(['ADMIN']);

  // console.log('AUTHORIZED', authorized)
  // console.log('REASON', reason)

  // if (reason === 'unauthenticated') {
  //   redirect('/user/login');
  // }

  // if (!authorized) {
  //   redirect('/');
  // }

  return (
    <main className="min-h-screen">
      
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
    </main>
  );
}