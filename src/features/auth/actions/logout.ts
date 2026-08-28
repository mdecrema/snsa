'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();
  
  // Clear auth cookie
  cookieStore.delete('auth_token');

  // Redirect to home page
  redirect('/');
}