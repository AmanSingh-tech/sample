'use client';

export default function Auth0Provider({ children }: { children: React.ReactNode }) {
  // For now, we'll create a simple wrapper
  // Auth0 v4 handles providers differently in Next.js 15
  return <>{children}</>;
}
