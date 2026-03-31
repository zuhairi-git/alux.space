"use client";

import Image from "next/image";
import Link from "next/link";
import { exportToWord, exportToPowerPoint, exportToPDF, exportToGoogleSlides } from "./presentation/exportUtils";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-primary-50 p-4 sm:p-6">
      <main className="w-full max-w-3xl">
        <div className="relative rounded-2xl sm:rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200 p-6 sm:p-8 lg:p-10 text-gray-900">
          {/* Icon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-xl sm:rounded-2xl bg-blue-600/10 shadow-xl flex items-center justify-center">
              <Image src="/logo/bh--logo.svg" alt="Buddy Healthcare" width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
            </div>
          </div>

          {/* Title / Subtitle */}
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 sm:mb-3 text-gray-900">Buddy Healthcare</h1>
          <p className="text-center text-lg sm:text-xl lg:text-2xl font-light mb-6 sm:mb-8 text-gray-600">Product Owner Assignment</p>

          {/* Presenter Name */}
          <p className="text-center text-sm sm:text-base lg:text-lg text-gray-500 mb-6 sm:mb-8">Presented by <span className="font-semibold text-gray-700">Ali Al Zuhairi</span></p>

          {/* Pill */}
          <div className="mx-auto max-w-xl">
            <div className="rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 text-center shadow-sm">
              <p className="text-base sm:text-lg font-semibold text-gray-800">Prioritization & Conflict Resolution</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Healthcare SaaS Excellence</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/presentation"
              className="inline-flex items-center gap-2 rounded-lg sm:rounded-xl bg-blue-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all w-full sm:w-auto justify-center"
            >
              <Image src="/dt-icons/play.svg" alt="View" width={18} height={18} className="filter brightness-0 invert w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span>View Presentation</span>
            </Link>
            
            <button
              onClick={exportToGoogleSlides}
              className="inline-flex items-center gap-2 rounded-lg sm:rounded-xl bg-ds-success text-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all w-full sm:w-auto justify-center"
              style={{ display: 'none' }}
            >
              <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.727 6.727H14V3.273c0-.187.08-.352.207-.473.126-.12.296-.186.476-.186h8.727c.18 0 .35.066.477.186.126.121.206.286.206.473v17.454c0 .187-.08.352-.206.473a.66.66 0 01-.477.186h-8.727a.66.66 0 01-.476-.186.646.646 0 01-.207-.473v-3.454h.727v3.09h8.09V3.636h-8.09v3.09zm-10.454 0h6.363v2.182H4.273V6.727zm0 4.364h6.363v2.181H4.273v-2.181zm0 4.363h6.363v2.182H4.273v-2.182z"/>
              </svg>
              <span>Export to Google Slides</span>
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Export options: <button onClick={exportToPowerPoint} className="text-blue-600 hover:underline">PowerPoint</button> • <button onClick={exportToPDF} className="text-blue-600 hover:underline">PDF</button> • <button onClick={exportToWord} className="text-blue-600 hover:underline">Word</button></p>
          </div>
        </div>
      </main>
    </div>
  );
}
