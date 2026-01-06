'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { exportToWord, exportToPowerPoint, exportToPDF } from './exportUtils';

// Slide Components
const TitleSlide = () => (
  <div data-slide="1" className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-y-auto overflow-x-hidden px-4 sm:px-8 py-32 sm:py-40">
    {/* Floating Orbs */}
    <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
    <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-tr from-teal-200/40 to-cyan-200/40 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
    
    <div className="text-center space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-8 lg:px-16 z-10 max-w-7xl mx-auto">
      {/* Logo */}
      <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl shadow-2xl mb-4 sm:mb-6 lg:mb-8 transform hover:scale-105 transition-transform">
        <Image src="/logo/bh--logo.svg" alt="Buddy Healthcare" width={96} height={96} className="filter brightness-0 invert w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
      </div>
      
      {/* Title */}
      <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent tracking-tight leading-tight">
        Buddy Healthcare
      </h1>
      
      {/* Subtitle */}
      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extralight text-slate-600 tracking-wide max-w-4xl mx-auto">
        Product Owner Assignment
      </h2>
      
      {/* Presenter Name */}
      <p className="text-lg sm:text-xl lg:text-2xl text-slate-500 mt-4 sm:mt-6">
        Presented by <span className="font-semibold text-slate-700">Ali Al Zuhairi</span>
      </p>
      
      {/* Divider with dots */}
      <div className="flex items-center justify-center gap-3 my-8">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
      </div>
      
      {/* Description Box */}
      <div className="inline-block px-16 py-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-2xl max-w-3xl">
        <p className="text-3xl font-semibold text-slate-800 mb-3">Prioritization & Conflict Resolution</p>
        <p className="text-xl text-slate-500">Healthcare SaaS Excellence</p>
      </div>
    </div>
  </div>
);

const AgendaSlide = () => (
  <div data-slide="2" className="flex flex-col h-full bg-gradient-to-br from-white via-slate-50 to-blue-50/30 p-6 sm:p-12 lg:p-20 pb-40 sm:pb-28 lg:pb-32 relative overflow-y-auto overflow-x-hidden">
    {/* Floating Orbs */}
    <div className="absolute top-32 right-20 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
    
    <div className="max-w-6xl w-full mx-auto z-10">
      {/* Header */}
      <div className="mb-10 sm:mb-16 lg:mb-20">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6">Agenda</h2>
        <div className="flex items-center gap-2">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Agenda Items */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {[
          { number: '01', title: 'Backlog Prioritization', desc: 'Strategic approach to healthcare SaaS priorities', color: 'from-teal-500 to-cyan-600', icon: '/dt-icons/list-timeline.svg' },
          { number: '02', title: 'QA vs. CTO Conflict', desc: 'Facilitating release readiness alignment', color: 'from-pink-500 to-rose-600', icon: '/dt-icons/users.svg' },
          { number: '03', title: 'How to Avoid Conflicts', desc: 'Proactive prevention strategies', color: 'from-blue-500 to-cyan-600', icon: '/dt-icons/shield-check.svg' },
          { number: '04', title: 'Reflection', desc: 'Key insights and learnings', color: 'from-purple-500 to-pink-600', icon: '/dt-icons/lightbulb.svg' }
        ].map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            style={{
              animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`
            }}
          >
            <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
              <Image src={item.icon} alt={item.title} width={44} height={44} className="filter brightness-0 invert w-6 h-6 sm:w-8 sm:h-8 lg:w-11 lg:h-11" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 sm:gap-4 lg:gap-5 mb-2 sm:mb-3">
                <span className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.number}</span>
                <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base lg:text-xl leading-relaxed sm:pl-12 lg:pl-16">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BacklogContextSlide = ({ onShowRejectionModal }: { onShowRejectionModal?: () => void }) => (
  <div data-slide="3" className="flex flex-col h-full bg-gradient-to-br from-white via-slate-50 to-teal-50/30 p-6 sm:p-12 lg:p-20 pb-40 sm:pb-28 lg:pb-32 overflow-y-auto overflow-x-hidden relative">
    {/* Floating Orbs */}
    <div className="absolute bottom-32 left-32 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
    
    <div className="max-w-7xl w-full mx-auto z-10">
      {/* Header */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-5 lg:mb-6">Backlog Prioritization</h2>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600">Strategic approach to healthcare SaaS priorities</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
        {/* Context Card */}
        <div className="col-span-1 lg:col-span-2 group relative" style={{ animation: 'slideIn 0.5s ease-out 0.1s both' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 border border-blue-200/50 hover:border-blue-400/70 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Image src="/dt-icons/hospital-user.svg" alt="Healthcare" width={32} height={32} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Context</h3>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Buddy Healthcare is a <span className="font-bold text-blue-600">healthcare SaaS platform</span> supporting nurses and doctors with digital care pathways.
            </p>
          </div>
        </div>

        {/* Key Priorities Card */}
        <div className="col-span-1 lg:col-span-3" style={{ animation: 'slideIn 0.5s ease-out 0.2s both' }}>
          <div className="relative h-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-200 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Image src="/dt-icons/star.svg" alt="Priority" width={32} height={32} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Key Priorities</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3">
              {[
                { icon: '/dt-icons/shield-heart.svg', label: 'Patient Safety', priority: 'Critical', badgeBg: 'bg-red-600' },
                { icon: '/dt-icons/hdd.svg', label: 'Data Reliability', priority: 'High', badgeBg: 'bg-orange-600' },
                { icon: '/dt-icons/wand-magic-sparkles.svg', label: 'Usability', priority: 'High', badgeBg: 'bg-orange-600' },
                { icon: '/dt-icons/rocket.svg', label: 'Scalability', priority: 'Medium', badgeBg: 'bg-amber-600' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Image src={item.icon} alt={item.label} width={16} height={16} />
                  </div>
                  <span className="font-medium text-slate-900 text-sm">{item.label}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.badgeBg} text-white ml-auto`}>
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Items */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Priority Ranking</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <PriorityItem
            rank={1}
            iconPath="/dt-icons/arrows-rotate.svg"
            color="red"
            title="Internal bug: failed API sync for 2% of appointments"
            reasoning="Data-loss/sync failures cause missed appointments. High risk to safety and SLAs. Fix now with immediate rollback/monitoring."
          />
          <PriorityItem
            rank={2}
            iconPath="/dt-icons/bell-ring.svg"
            color="orange"
            title="Nurse feedback: alert visibility is too subtle"
            reasoning="UX issue affecting clinical awareness. Quick wins to improve safety and satisfaction. Plan small iteration this sprint."
          />
          <PriorityItem
            rank={3}
            iconPath="/dt-icons/plug-circle-check.svg"
            color="yellow"
            title="New hospital requests: HL7/FHIR export"
            reasoning="Strategic for sales and integrations but larger scope. Include only with dedicated capacity—otherwise break into discovery tasks."
          />
          <PriorityItem
            rank={4}
            iconPath="/dt-icons/chart-line.svg"
            color="blue"
            title="Marketing wants push notification analytics"
            reasoning="Valuable for growth but non-critical to safety. Defer or schedule as low-priority item if capacity allows."
          />
        </div>
        
        {/* Rejected Items */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 mt-6">Rejected Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="group relative opacity-60">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/40 to-gray-300/40 rounded-3xl blur-xl"></div>
            <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-red-300 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shadow-lg">
                    <Image src="/dt-icons/siren.svg" alt="Rejected" width={20} height={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-500">BHC-200</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-700 border border-red-300">REJECTED</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug line-through">
                Customer request: automated urgent message to patients based on form answers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Safety-critical with legal/regulatory implications. <strong>REJECTED</strong> due to high risk and insufficient guardrails for automated urgent medical messaging. Requires extensive regulatory review and liability assessment before consideration.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">Story</span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200">N/A</span>
                </div>
                {onShowRejectionModal && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onShowRejectionModal();
                    }}
                    className="w-6 h-6 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
                    title="View rejection reasons"
                  >
                    <Image src="/dt-icons/circle-info.svg" alt="Info" width={14} height={14} className="text-blue-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PriorityItem = ({ rank, title, reasoning, color, iconPath }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const priorityConfig: any = {
    red: { 
      label: 'Highest',
      iconBg: 'bg-red-200',
      priorityBadgeBg: 'from-red-600 to-red-700',
      badge: 'bg-red-100 text-red-800 border-red-300',
      priorityIcon: '/dt-icons/angles-up.svg',
      type: 'Bug',
      glowColor: 'from-red-300/50 to-red-400/50'
    },
    orange: { 
      label: 'High',
      iconBg: 'bg-orange-200',
      priorityBadgeBg: 'from-orange-600 to-orange-700',
      badge: 'bg-orange-100 text-orange-800 border-orange-300',
      priorityIcon: '/dt-icons/arrow-up.svg',
      type: 'Story',
      glowColor: 'from-orange-300/50 to-orange-400/50'
    },
    yellow: { 
      label: 'Medium',
      iconBg: 'bg-amber-200',
      priorityBadgeBg: 'from-amber-600 to-amber-700',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      priorityIcon: '/dt-icons/minus.svg',
      type: 'Task',
      glowColor: 'from-amber-300/50 to-amber-400/50'
    },
    blue: { 
      label: 'Low',
      iconBg: 'bg-blue-200',
      priorityBadgeBg: 'from-blue-600 to-blue-700',
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      priorityIcon: '/dt-icons/arrow-down.svg',
      type: 'Story',
      glowColor: 'from-blue-300/50 to-blue-400/50'
    },
    purple: { 
      label: 'Lowest',
      iconBg: 'bg-purple-200',
      priorityBadgeBg: 'from-purple-600 to-purple-700',
      badge: 'bg-purple-100 text-purple-800 border-purple-300',
      priorityIcon: '/dt-icons/angles-down.svg',
      type: 'Task',
      glowColor: 'from-purple-300/50 to-purple-400/50'
    }
  };
  
  const config = priorityConfig[color] || priorityConfig.blue;
  const issueKey = `BHC-${rank * 100}`;
  
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${config.glowColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all`}></div>
      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 hover:border-slate-400/70 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
        {/* Issue Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            {/* Issue Type Icon */}
            <div className={`w-10 h-10 ${config.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
              <Image src={iconPath} alt="Issue type" width={24} height={24} />
            </div>
            {/* Issue Key */}
            <span className="text-sm font-medium text-slate-500">
              {issueKey}
            </span>
          </div>
          {/* Priority Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={`w-7 h-7 bg-gradient-to-br ${config.priorityBadgeBg} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md`}>
              <Image src={config.priorityIcon} alt={config.label} width={16} height={16} className="filter brightness-0 invert" />
            </div>
            <span className="text-sm font-semibold text-slate-700">{config.label}</span>
          </div>
        </div>
        
        {/* Issue Title */}
        <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
          {title}
        </h3>
        
        {/* Issue Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {reasoning}
        </p>
        
        {/* Issue Footer - Labels and Type */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${config.badge}`}>
            {config.type}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Sprint {Math.ceil(rank / 2)}
          </span>
          {rank === 1 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
              Critical
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ConflictScenarioSlide = () => (
  <div data-slide="5" className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-pink-50/30 p-6 sm:p-12 lg:p-20 pb-40 sm:pb-28 lg:pb-32 relative overflow-y-auto overflow-x-hidden">
    {/* Floating Orbs */}
    <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-bl from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-red-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
    
    <div className="max-w-7xl w-full mx-auto z-10">
      {/* Title */}
      <div className="mb-6 sm:mb-10 lg:mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6">Conflict Scenario</h2>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600">QA vs. CTO Release Decision</p>
      </div>

      {/* VS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
        {/* QA Side */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
              <Image src="/dt-icons/clipboard-check.svg" alt="QA" width={36} height={36} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">QA Team</h3>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 border-l-4 border-red-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
            <p className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">Position:</p>
            <p className="text-slate-800 leading-relaxed text-sm sm:text-base lg:text-lg">
              &quot;Delay the release due to incomplete verification documentation&quot;
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-red-200 shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Image src="/dt-icons/exclamation-triangle.svg" alt="" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-slate-700 font-semibold text-sm sm:text-base lg:text-lg">Compliance risk</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-red-200 shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Image src="/dt-icons/file-exclamation.svg" alt="" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-slate-700 font-semibold text-sm sm:text-base lg:text-lg">Documentation gaps</span>
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex justify-center my-4 lg:my-0">
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl sm:rounded-3xl w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black">VS</span>
          </div>
        </div>

        {/* CTO Side */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
              <Image src="/dt-icons/rocket.svg" alt="CTO" width={36} height={36} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">CTO</h3>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-blue-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
            <p className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">Position:</p>
            <p className="text-slate-800 leading-relaxed text-sm sm:text-base lg:text-lg">
              &quot;Release on schedule to maintain momentum and commitments&quot;
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-blue-200 shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Image src="/dt-icons/calendar-clock.svg" alt="" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-slate-700 font-semibold text-sm sm:text-base lg:text-lg">Timeline pressure</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-blue-200 shadow-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Image src="/dt-icons/users-gear.svg" alt="" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-slate-700 font-semibold text-sm sm:text-base lg:text-lg">Stakeholder expectations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-full text-base sm:text-lg lg:text-xl font-bold shadow-2xl">
          <Image src="/dt-icons/question-circle.svg" alt="Question" width={28} height={28} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7" />
          <span>How should we resolve this conflict?</span>
        </div>
      </div>
    </div>
  </div>
);

const ResolutionSlide = () => (
  <div data-slide="6" className="flex flex-col h-full bg-gradient-to-br from-white via-slate-50 to-teal-50/30 p-6 sm:p-12 lg:p-20 pb-40 sm:pb-28 lg:pb-32 overflow-y-auto overflow-x-hidden relative">
    {/* Animated Background Elements */}
    <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-200/30 via-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-tr from-purple-200/20 via-pink-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
    
    <div className="max-w-7xl w-full mx-auto z-10 relative">
      {/* Header Section */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6">Resolution</h2>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600">Finding Common Ground Through Structured Facilitation</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 mb-8 sm:mb-9 lg:mb-10">
        {/* Left Column - Alignment */}
        <div className="group relative" style={{ animation: 'slideIn 0.5s ease-out 0.1s both' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-200/50 to-cyan-200/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-teal-200/50 hover:border-teal-400/70 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Image src="/dt-icons/bullseye.svg" alt="" width={32} height={32} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Alignment Reached</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Regulatory compliance and product safety are <span className="font-bold text-teal-700 px-2 py-1 bg-teal-100 rounded">non-negotiable</span> priorities.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                We also acknowledged the critical importance of maintaining delivery predictability and development momentum.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Key Outcome */}
        <div className="group relative" style={{ animation: 'slideIn 0.5s ease-out 0.2s both' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-blue-200/50 hover:border-blue-400/70 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Image src="/dt-icons/lightbulb.svg" alt="" width={32} height={32} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Key Outcome</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                This approach maintains <span className="font-bold text-blue-700">delivery discipline</span> while ensuring quality and regulatory standards are respected.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                It fosters <span className="font-bold text-teal-700 px-2 py-1 bg-teal-100 rounded">collaboration rather than compromise</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agreed Actions - Full Width */}
      <div className="group relative" style={{ animation: 'slideIn 0.5s ease-out 0.3s both' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-200/50 to-blue-200/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/50 hover:border-teal-300/70 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7 lg:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Image src="/dt-icons/list-check.svg" alt="" width={32} height={32} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Agreed Actions</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {[
              {
                num: 1,
                text: "QA will identify the minimum critical documentation required for release compliance.",
                color: "from-teal-500 to-teal-600",
                bgColor: "from-teal-50 to-teal-100/50"
              },
              {
                num: 2,
                text: "Development continues in parallel to avoid blocking non-risk areas.",
                color: "from-teal-500 to-teal-600",
                bgColor: "from-teal-50 to-teal-100/50"
              },
              {
                num: 3,
                text: "A final readiness checkpoint will occur before release for QA sign-off on key verification items.",
                color: "from-teal-500 to-teal-600",
                bgColor: "from-teal-50 to-teal-100/50"
              }
            ].map((action) => (
              <div 
                key={action.num} 
                className="group/card relative"
                style={{ animation: `slideIn 0.5s ease-out ${0.4 + action.num * 0.1}s both` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-2xl blur group-hover/card:blur-md transition-all"></div>
                <div className={`relative bg-gradient-to-br ${action.bgColor} backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br ${action.color} text-white rounded-lg sm:rounded-xl flex items-center justify-center font-black text-lg sm:text-xl mb-3 sm:mb-4 shadow-md`}>
                    {action.num}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base flex-1">
                    {action.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PreventionSlide = () => (
  <div data-slide="7" className="flex flex-col h-full bg-gradient-to-br from-white via-slate-50 to-blue-50/30 p-6 sm:p-12 lg:p-20 pb-40 sm:pb-28 lg:pb-32 relative overflow-y-auto overflow-x-hidden">
    {/* Floating Orbs */}
    <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-bl from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
    
    <div className="max-w-6xl w-full mx-auto z-10">
      {/* Title */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6">To Avoid Such Conflicts</h2>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600">Proactive Conflict Prevention Strategy</p>
      </div>

      {/* Main Content */}
      <div className="space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Introduction */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
          <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
            <Image src="/dt-icons/shield-heart.svg" alt="" width={36} height={36} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 lg:mb-5">Proactive Coordination Approach</h3>
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed">
              A <span className="font-bold text-blue-700">mini-team meeting</span> first allows QA, Dev, and Product to identify risks, blockers, and documentation gaps early. 
              Then, an <span className="font-bold text-blue-700">advance alignment meeting</span> with leadership ensures everyone sees the same information before a formal release decision.
            </p>
          </div>
        </div>

        {/* Two-Phase Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-12 lg:mt-16">
          {/* Phase 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-blue-500 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg">
                1
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Mini-Team Meeting</h4>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg">
              QA, Development, and Product teams collaborate to identify potential issues early.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">Identify risks & blockers</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">Surface documentation gaps</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">Align on technical readiness</span>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-l-4 border-purple-500 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg">
                2
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Leadership Alignment</h4>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg">
              Present unified information to leadership before formal release decisions.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">Shared context for all stakeholders</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">Informed decision-making</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">Clear accountability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReflectionSlide = () => (
  <div data-slide="8" className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-6 sm:p-12 lg:p-20 pb-40 sm:pb-28 lg:pb-32 relative overflow-y-auto overflow-x-hidden">
    {/* Floating Orbs */}
    <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
    <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
    
    <div className="max-w-6xl w-full mx-auto z-10">
      {/* Title */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6">Key Takeaways</h2>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600">Product Owner Excellence in Action</p>
      </div>

      {/* Main Insight */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
          <Image src="/dt-icons/lightbulb.svg" alt="" width={36} height={36} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Core Approach</h3>
          <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed">
            This approach demonstrates <span className="font-bold text-purple-700">prioritization based on impact, risk, and value</span>, 
            while facilitating team alignment through structured reasoning and transparent communication — 
            key traits of an effective Product Owner.
          </p>
        </div>
      </div>

      {/* Three Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12 lg:mb-16">
        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl sm:rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300" style={{ animation: 'slideIn 0.5s ease-out 0.2s both' }}>
          <div className="flex justify-center mb-4 sm:mb-5 lg:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Image src="/dt-icons/bullseye.svg" alt="" width={36} height={36} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            </div>
          </div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 text-center">Impact-Driven</h4>
          <p className="text-slate-700 leading-relaxed text-center text-sm sm:text-base lg:text-lg">Patient safety and data reliability first</p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl sm:rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300" style={{ animation: 'slideIn 0.5s ease-out 0.3s both' }}>
          <div className="flex justify-center mb-4 sm:mb-5 lg:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Image src="/dt-icons/balance-scale.svg" alt="" width={36} height={36} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            </div>
          </div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 text-center">Risk-Aware</h4>
          <p className="text-slate-700 leading-relaxed text-center text-sm sm:text-base lg:text-lg">Balance speed with compliance</p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl sm:rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300" style={{ animation: 'slideIn 0.5s ease-out 0.4s both' }}>
          <div className="flex justify-center mb-4 sm:mb-5 lg:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Image src="/dt-icons/handshake.svg" alt="" width={36} height={36} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            </div>
          </div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 text-center">Collaborative</h4>
          <p className="text-slate-700 leading-relaxed text-center text-sm sm:text-base lg:text-lg">Foster alignment over authority</p>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-white" style={{ animation: 'slideIn 0.5s ease-out 0.5s both' }}>
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-3 sm:mb-4">
          <Image src="/dt-icons/star.svg" alt="" width={32} height={32} className="filter brightness-0 invert w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
          <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold">Product Owner Excellence</h4>
        </div>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed opacity-95">
          Balancing stakeholder needs, technical constraints, and business value while maintaining focus on user outcomes and team collaboration.
        </p>
      </div>
    </div>
  </div>
);

const ThankYouSlide = () => (
  <div data-slide="9" className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-y-auto overflow-x-hidden pb-40 sm:pb-24">
    {/* Floating Orbs */}
    <div className="absolute top-20 right-32 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl"></div>
    <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-tr from-blue-300/40 to-cyan-300/40 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
    
    <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16 z-10 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-full shadow-2xl mb-4 sm:mb-6 lg:mb-8 animate-pulse">
        <Image src="/dt-icons/heart.svg" alt="Thank You" width={80} height={80} className="filter brightness-0 invert w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
      </div>
      
      {/* Title */}
      <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black bg-gradient-to-r from-slate-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
        Thank You!
      </h1>
      
      {/* Subtitle */}
      <p className="text-2xl sm:text-3xl lg:text-5xl font-extralight text-slate-700 tracking-wide">Questions & Discussion</p>
      
      {/* Divider with dots */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 my-6 sm:my-8 lg:my-12">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></div>
        <div className="w-16 sm:w-20 lg:w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-pink-500 rounded-full"></div>
        <div className="w-16 sm:w-20 lg:w-24 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
      </div>
      
      {/* Meta Info */}
      <div className="mt-10 sm:mt-14 lg:mt-20 space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-base sm:text-lg lg:text-2xl text-slate-700">
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
            <Image src="/dt-icons/presentation.svg" alt="Presentation" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="font-semibold">Buddy Healthcare Product Owner Assignment</span>
        </div>
      </div>
    </div>
  </div>
);

// Main Presentation Component
export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('currentSlide');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  // Save current slide to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('currentSlide', currentSlide.toString());
  }, [currentSlide]);

  // Scroll to top whenever slide changes
  useEffect(() => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      const slideWrapper = document.querySelector(`[data-slide-wrapper][data-index="${currentSlide}"]`);
      if (slideWrapper) {
        slideWrapper.scrollTop = 0;
      }
    }, 10);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        // Toggle fullscreen
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // Auto-export when opened with a query like ?export=pdf|ppt|doc
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const exp = params.get('export');
    if (!exp) return;
    const run = async () => {
      // Give React a tick to render all slides below
      await new Promise((r) => setTimeout(r, 100));
      if (exp === 'pdf') {
        await exportToPDF();
      } else if (exp === 'ppt' || exp === 'pptx' || exp === 'powerpoint') {
        exportToPowerPoint();
      } else if (exp === 'doc' || exp === 'docx' || exp === 'word') {
        exportToWord();
      }
      // Try closing if in a popup/tab
      try { window.close(); } catch {}
    };
    run();
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isClient = typeof window !== 'undefined';
  const printMode = isClient && new URLSearchParams(window.location.search).has('print');

  const slides = [
    <TitleSlide key="title" />,
    <AgendaSlide key="agenda" />,
    <BacklogContextSlide
      key="context"
      onShowRejectionModal={!printMode ? () => setShowRejectionModal(true) : undefined}
    />,
    <ConflictScenarioSlide key="conflict" />,
    <ResolutionSlide key="resolution" />,
    <PreventionSlide key="prevention" />,
    <ReflectionSlide key="reflection" />,
    <ThankYouSlide key="thankyou" />
  ];

  useEffect(() => {
    if (!printMode) return;
    const waitForAssets = async () => {
      const root = document.getElementById('presentation-root');
      if (!root) return;
      const imgs = Array.from(root.querySelectorAll('img')) as HTMLImageElement[];
      await Promise.all(
        imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map(
            (img) =>
              new Promise<void>((res) => {
                img.addEventListener('load', () => res(), { once: true });
                img.addEventListener('error', () => res(), { once: true });
              })
          )
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document as any).fonts?.ready) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (document as any).fonts.ready;
        } catch {}
      }
    };
    (async () => {
      await waitForAssets();
      setTimeout(() => {
        window.print();
      }, 300);
    })();
  }, [printMode]);

  return (
    <>
    <div id="presentation-root" className={printMode ? 'relative w-screen min-h-screen bg-white' : 'fixed inset-0 w-screen h-screen overflow-hidden bg-gray-100'}>
      {printMode && (
        <style>{`
          @page { size: A4 landscape; margin: 0; }
          @media print {
            html, body { background: #ffffff !important; }
            #presentation-root { background: #ffffff !important; }
            .print-page { page-break-after: always; width: 297mm; height: 210mm; overflow: hidden; }
          }
        `}</style>
      )}
      {/* Slides Container - render all (hidden except current) for exporting */}
      <div className={printMode ? 'w-full' : 'w-full h-full'}>
        {slides.map((slideEl, idx) => (
          <div
            key={idx}
            data-slide-wrapper
            data-index={idx}
            className={printMode ? 'print-page' : idx === currentSlide ? 'block h-full overflow-y-auto animate-fadeIn' : 'hidden h-full overflow-y-auto'}
            style={{
              animation: !printMode && idx === currentSlide ? 'slideIn 0.4s ease-out' : undefined
            }}
          >
            {slideEl}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {!printMode && (
        <div className="fixed bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:gap-3 lg:gap-4 z-50 bg-white/95 backdrop-blur-sm px-4 sm:px-4 py-3 sm:py-3 rounded-full shadow-xl border border-gray-200">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl shadow-md transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Progress Indicator */}
          <div className="flex gap-1.5 sm:gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all ${
                  idx === currentSlide 
                    ? 'w-8 sm:w-10 bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-3 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl shadow-md transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      )}

      {/* Slide Counter */}
      {!printMode && (
        <div className="fixed top-6 sm:top-6 lg:top-8 right-6 sm:right-6 lg:right-8 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-800 px-4 sm:px-4 lg:px-5 py-2 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-sm font-semibold shadow-lg z-50">
          {currentSlide + 1} / {slides.length}
        </div>
      )}

      {/* Keyboard Hints - Hidden on mobile, shown on larger screens */}
      {!printMode && (
        <div className="hidden lg:flex fixed bottom-8 lg:bottom-10 left-6 lg:left-8 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-700 px-4 lg:px-4 py-2 rounded-lg lg:rounded-xl text-xs items-center gap-3 lg:gap-3 shadow-lg z-50">
          <span className="text-gray-500">Navigation:</span>
          <span className="bg-gray-100 px-2 py-1 rounded border border-gray-300">←</span>
          <span className="bg-gray-100 px-2 py-1 rounded border border-gray-300">→</span>
          <span className="bg-gray-100 px-2 lg:px-3 py-1 rounded border border-gray-300">Space</span>
          <span className="text-gray-300">|</span>
          <span className="bg-gray-100 px-2 py-1 rounded border border-gray-300">F</span>
          <span className="text-gray-500 text-[10px]">Fullscreen</span>
        </div>
      )}

      {/* Export Buttons moved to homepage card */}
    </div>

    {/* Rejection Reasons Modal */}
    {showRejectionModal && !printMode && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={() => setShowRejectionModal(false)}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                  <Image src="/dt-icons/circle-info.svg" alt="Info" width={20} height={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Rejection Reasons</h3>
                  <p className="text-sm text-slate-500">BHC-200: Automated urgent message to patients</p>
                </div>
              </div>
              <button
                onClick={() => setShowRejectionModal(false)}
                className="w-8 h-8 bg-white hover:bg-slate-50 rounded-lg flex items-center justify-center transition-colors border border-slate-200 text-slate-500"
              >
                <span className="text-2xl font-light">×</span>
              </button>
            </div>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="space-y-4">
              {[
                {
                  title: "Patient Safety Risk",
                  description: "Automated urgent messages based on form answers could deliver incorrect or premature medical advice without clinical review, potentially causing patient harm.",
                  icon: "/dt-icons/shield-heart.svg",
                  color: "red"
                },
                {
                  title: "Medical Liability",
                  description: "The system could be held liable for automated medical communications that prove inaccurate or lead to adverse outcomes.",
                  icon: "/dt-icons/balance-scale.svg",
                  color: "orange"
                },
                {
                  title: "Regulatory Compliance",
                  description: "Healthcare communications, especially 'urgent' messages, typically require HIPAA compliance, FDA approval (if considered a medical device decision-support feature), and adherence to medical practice standards.",
                  icon: "/dt-icons/file-exclamation.svg",
                  color: "amber"
                },
                {
                  title: "Clinical Validation Required",
                  description: "Form answers may not provide sufficient context for urgent medical decisions - they need clinical interpretation by qualified healthcare professionals.",
                  icon: "/dt-icons/clipboard-check.svg",
                  color: "yellow"
                },
                {
                  title: "False Positives/Negatives",
                  description: "Algorithmic triggers could miss critical nuances or create unnecessary panic, undermining trust in the platform.",
                  icon: "/dt-icons/exclamation-triangle.svg",
                  color: "orange"
                },
                {
                  title: "Scope Creep",
                  description: "This shifts the platform from a care pathway tool to making autonomous clinical decisions, which is a fundamental change in the product's role and risk profile.",
                  icon: "/dt-icons/rocket.svg",
                  color: "purple"
                },
                {
                  title: "Insufficient Guardrails",
                  description: "Without extensive medical oversight, approval workflows, and fail-safes, the risk outweighs the benefit.",
                  icon: "/dt-icons/shield-check.svg",
                  color: "red"
                }
              ].map((reason, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-${reason.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Image src={reason.icon} alt={reason.title} width={20} height={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-red-700">Summary:</strong> This feature requires extensive regulatory review, legal assessment, clinical validation, and infrastructure for medical oversight before it can be safely considered for implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
