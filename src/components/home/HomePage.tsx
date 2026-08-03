'use client';

import React, { useEffect, useState } from 'react';
import HomeClassic from './HomeClassic';
import HomeModern from './HomeModern';
import HomeDesignSwitch, { HomeDesign } from './HomeDesignSwitch';

const STORAGE_KEY = 'home-design';

/**
 * Homepage entry point. Two coexisting designs:
 *   - modern  — profile-first, minimal-motion redesign (default, matches SSG output)
 *   - classic — the original animated homepage
 *
 * The visitor's choice is kept in localStorage and applied after
 * hydration, so the server-rendered markup always matches the first
 * client render.
 */
export default function HomePage() {
  const [design, setDesign] = useState<HomeDesign>('modern');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'modern' || stored === 'classic') {
        setDesign(stored);
      }
    } catch {
      // localStorage unavailable (private mode) — keep the default
    }
  }, []);

  const handleChange = (next: HomeDesign) => {
    setDesign(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the choice simply won't persist
    }
  };

  return (
    <>
      {design === 'modern' ? <HomeModern /> : <HomeClassic />}
      <HomeDesignSwitch design={design} onChange={handleChange} />
    </>
  );
}
