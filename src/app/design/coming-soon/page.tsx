'use client';

import React from 'react';

export default function ComingSoonDesignPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Coming Soon Page</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          A responsive and animated &ldquo;Coming Soon&rdquo; page with theme support (light, dark, colorful).
        </p>
      </div>
      
      <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
        <iframe className="w-full" style={{ height: '600px', border: 'none' }} src="/coming-soon" title="Coming Soon Page Preview"></iframe>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Features</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Responsive design that works on all device sizes</li>
          <li>Theme support (light, dark, and colorful)</li>
          <li>Animated elements using Framer Motion</li>
          <li>Countdown timer to launch date</li>
          <li>Email notification form</li>
          <li>Material Symbols icons integration</li>
          <li>Floating background elements</li>
        </ul>
      </div>
    </div>
  );
}
