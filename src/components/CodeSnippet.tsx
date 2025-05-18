'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = 'jsx' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || '';
      navigator.clipboard.writeText(text);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="relative font-mono text-sm rounded-xl overflow-hidden bg-neutral-950 dark:bg-black">
      <div className="flex items-center justify-between bg-neutral-900 dark:bg-neutral-950 px-4 py-2 border-b border-neutral-800">
        <div className="text-neutral-400 font-medium">{language}</div>
        <button
          onClick={copyToClipboard}
          className={`copy-btn flex items-center space-x-1 px-2 py-1 rounded-md transition-all ${
            copied 
              ? 'bg-primary-500 dark:bg-primary-600 text-white' 
              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          <span className="copy-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </span>
          <span className="check-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      <pre ref={codeRef} className="p-4 overflow-x-auto text-neutral-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
