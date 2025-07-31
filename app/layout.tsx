import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Multi-Tenant Made Simple | Next.js Platform',
  description: 'Build powerful SaaS applications with isolated tenant environments, custom subdomains, and seamless scaling.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
