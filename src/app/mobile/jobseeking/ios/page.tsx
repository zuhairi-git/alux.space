'use client';

import { JobSeekingApp } from '@/components/mobile/jobseeking';
import { iosTheme } from '@/app/mobile/themes';

export default function JobSeekingIOSApp() {
    return <JobSeekingApp theme={iosTheme} />;
}
