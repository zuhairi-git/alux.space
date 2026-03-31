'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootAdminRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/en/portfolio/workflow/admin');
    }, [router]);

    return (
        <div className="min-h-screen bg-ds-gray-950 flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-ds-gray-400 font-medium">Redirecting to Portal...</p>
            </div>
        </div>
    );
}
