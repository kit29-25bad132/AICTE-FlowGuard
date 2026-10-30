import type { Metadata } from 'next';
import React from 'react';
import AuthShell from '@/components/marketing/AuthShell';
import SignInForm from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Demo Login — AICTE FlowGuard',
  description: 'Select a demonstration position to explore the role-scoped AICTE FlowGuard workspace.',
};

export default function SignInPage() {
  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  );
}
