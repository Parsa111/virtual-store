'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Redirecting to admin login...</p>
      </div>
    </div>
  );
};

export default AdminPage;