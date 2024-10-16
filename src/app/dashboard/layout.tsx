'use client';
import { AppBar } from '@/components/appbar';
import { signOut } from 'next-auth/react';
import router from 'next/router';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  const handleSignOut = () => {
    // Call the provided SignOut function
    signOut({ callbackUrl: '/signin' });
  }
  return (
    <div>
      <AppBar userEmail="email@gmail.com" SignOut={handleSignOut} />
      {children}
    </div>
  );
}
