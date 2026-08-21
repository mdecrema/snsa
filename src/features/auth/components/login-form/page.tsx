'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { login } from '../../actions/login';

export function LoginForm() {
  // useActionState handles server action form responses & pending states
  const [state, formAction, isPending] = useActionState(login, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      console.log("REDIRECT TO ---> ", state?.redirectTo)
      router.push(state.redirectTo);
      router.refresh(); // Refresh layout to update user session state in UI
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
        <p className="text-sm text-gray-500">Welcome back! Please enter your details.</p>
      </div>

      <form action={formAction} className="space-y-4">
        {/* Error Feedback */}
        {state?.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {state.error}
          </div>
        )}

        {/* Success Feedback */}
        {state?.success && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
            Signed in successfully!
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}