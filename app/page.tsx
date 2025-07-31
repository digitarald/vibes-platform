import Link from 'next/link';
import { SubdomainForm } from './subdomain-form';
import { rootDomain } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Users, Zap, Shield, Settings, Rocket } from 'lucide-react';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Header */}
      <div className="absolute top-4 right-4 z-10">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Admin
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Multi-Tenant
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Made Simple</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Build powerful SaaS applications with isolated tenant environments, custom subdomains, and seamless scaling. 
            Each tenant gets their own branded space while sharing your robust infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Next.js 15 + App Router
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Redis-Powered
            </span>
            <span className="flex items-center gap-1">
              <Rocket className="w-4 h-4" />
              Production Ready
            </span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Globe className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Custom Subdomains</CardTitle>
              <CardDescription>
                Each tenant gets their own subdomain (tenant.yourdomain.com) with automatic routing and SSL.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Tenant Isolation</CardTitle>
              <CardDescription>
                Complete data and UI isolation between tenants while sharing the same codebase and infrastructure.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Settings className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Easy Management</CardTitle>
              <CardDescription>
                Admin dashboard to manage all tenants, monitor usage, and configure settings from one place.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Key Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Multi-Tenant Architecture?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">For SaaS Builders</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Faster Time to Market:</strong> Launch with tenant infrastructure ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Cost Efficient:</strong> Share resources across all tenants</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Easy Scaling:</strong> Add new tenants without infrastructure changes</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">For Your Customers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Branded Experience:</strong> Custom subdomains and personalization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Data Privacy:</strong> Complete isolation from other tenants</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Professional Feel:</strong> Dedicated domain shows commitment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Try It Out Section */}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Try It Out</h2>
            <p className="text-gray-600">Create your own tenant subdomain in seconds</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <SubdomainForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-500 text-sm">
        <p>Built with Next.js 15, Redis, and deployed on Vercel</p>
        <p className="mt-1">Perfect for SaaS platforms, customer portals, and multi-brand applications</p>
      </div>
    </div>
  );
}
