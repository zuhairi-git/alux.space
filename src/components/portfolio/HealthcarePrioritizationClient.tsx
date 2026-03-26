'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { durationSeconds, delaySeconds, stagger, easing, transition as t } from '@/design-system';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

export default function HealthcarePrioritizationClient() {

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  const getColorStyles = (color: string) => {
    const styles: Record<string, {
      cardBg: string;
      iconText: string;
      titleText: string;
      iconBg: string;
      takeawayBg: string;
      takeawayIconBg: string;
      borderColor: string;
    }> = {
      blue: {
        cardBg: isColorful ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30' : '',
        iconText: isColorful ? 'text-blue-400' : isLight ? 'text-blue-600' : 'text-blue-400',
        titleText: isColorful ? 'text-blue-300' : '',
        iconBg: isColorful ? 'bg-blue-500/20' : isLight ? 'bg-blue-100' : 'bg-blue-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-blue-500/20 text-blue-300' : '',
        borderColor: isColorful ? 'border-blue-500/30' : ''
      },
      purple: {
        cardBg: isColorful ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30' : '',
        iconText: isColorful ? 'text-purple-400' : isLight ? 'text-purple-600' : 'text-purple-400',
        titleText: isColorful ? 'text-purple-300' : '',
        iconBg: isColorful ? 'bg-purple-500/20' : isLight ? 'bg-purple-100' : 'bg-purple-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-purple-500/20 text-purple-300' : '',
        borderColor: isColorful ? 'border-purple-500/30' : ''
      },
      green: {
        cardBg: isColorful ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30' : '',
        iconText: isColorful ? 'text-green-400' : isLight ? 'text-green-600' : 'text-green-400',
        titleText: isColorful ? 'text-green-300' : '',
        iconBg: isColorful ? 'bg-green-500/20' : isLight ? 'bg-green-100' : 'bg-green-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-green-500/20 text-green-300' : '',
        borderColor: isColorful ? 'border-green-500/30' : ''
      },
      orange: {
        cardBg: isColorful ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-400/30' : '',
        iconText: isColorful ? 'text-orange-400' : isLight ? 'text-orange-600' : 'text-orange-400',
        titleText: isColorful ? 'text-orange-300' : '',
        iconBg: isColorful ? 'bg-orange-500/20' : isLight ? 'bg-orange-100' : 'bg-orange-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-orange-500/20 text-orange-300' : '',
        borderColor: isColorful ? 'border-orange-500/30' : ''
      },
      red: {
        cardBg: isColorful ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30' : '',
        iconText: isColorful ? 'text-red-400' : isLight ? 'text-red-600' : 'text-red-400',
        titleText: isColorful ? 'text-red-300' : '',
        iconBg: isColorful ? 'bg-red-500/20' : isLight ? 'bg-red-100' : 'bg-red-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-red-500/20 text-red-300' : '',
        borderColor: isColorful ? 'border-red-500/30' : ''
      },
      yellow: {
        cardBg: isColorful ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30' : '',
        iconText: isColorful ? 'text-yellow-400' : isLight ? 'text-yellow-600' : 'text-yellow-400',
        titleText: isColorful ? 'text-yellow-300' : '',
        iconBg: isColorful ? 'bg-yellow-500/20' : isLight ? 'bg-yellow-100' : 'bg-yellow-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-yellow-500/20 text-yellow-300' : '',
        borderColor: isColorful ? 'border-yellow-500/30' : ''
      },
      teal: {
        cardBg: isColorful ? 'bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-400/30' : '',
        iconText: isColorful ? 'text-teal-400' : isLight ? 'text-teal-600' : 'text-teal-400',
        titleText: isColorful ? 'text-teal-300' : '',
        iconBg: isColorful ? 'bg-teal-500/20' : isLight ? 'bg-teal-100' : 'bg-teal-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-teal-900/30 to-teal-800/30 border border-teal-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-teal-500/20 text-teal-300' : '',
        borderColor: isColorful ? 'border-teal-500/30' : ''
      },
      gray: {
        cardBg: isColorful ? 'bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-400/30' : '',
        iconText: isColorful ? 'text-gray-400' : isLight ? 'text-gray-600' : 'text-gray-400',
        titleText: isColorful ? 'text-gray-300' : '',
        iconBg: isColorful ? 'bg-gray-500/20' : isLight ? 'bg-gray-100' : 'bg-gray-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-gray-900/30 to-gray-800/30 border border-gray-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-gray-500/20 text-gray-300' : '',
        borderColor: isColorful ? 'border-gray-500/30' : ''
      }
    };
    return styles[color] || styles.blue;
  };

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "Healthcare Product Prioritization",
        subtitle: "Strategic Conflict Resolution in SaaS",
        intro: "Navigating the complex balance between strict regulatory compliance and agile product delivery. A case study on prioritization, stakeholder management, and process optimization.",
        projectType: "Project Type",
        projectTypeValues: "Product Management Case Study",
        timeline: "Timeline",
        timelineValue: "2 Week Sprint Cycle",
        tools: "Tools & Methodologies",
        toolsValue: "Agile, Jira, Risk Matrix, Stakeholder Mapping",
        standards: "Compliance",
        standardsValue: "HIPAA, Medical Device Regulations",
        roles: "My Role",
        rolesValue: "Product Owner",

        // Navigation tabs
        overviewTab: "Overview",
        processTab: "Resolution Process",
        impactTab: "Outcomes & Learnings",

        // Overview section
        contextTitle: "The Contest",
        contextDesc: "In a healthcare SaaS platform supporting nurses and doctors, prioritization isn't just about business valueÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âit's about patient safety. We faced a critical backlog containing a mix of safety issues, UX improvements, and strategic integrations.",
        conflictTitle: "The Conflict",
        conflictDesc: "A critical release standoff occurred: QA demanded a delay due to incomplete verification documentation, while the CTO pushed for release to maintain schedule commitments.",

        // Priorities
        prioritiesTitle: "Strategic Prioritization",
        priority1: "Patient Safety (Critical)",
        priority1Desc: "Fixing data-sync failures impacting 2% of appointments. Non-negotiable.",
        priority2: "Nurse UX (Critical)",
        priority2Desc: "Improving alert visibility to ensure clinical awareness.",
        priority3: "Strategic Growth (Medium)",
        priority3Desc: "HL7/FHIR export featuresÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âvaluable but scoped for dedicated capacity.",
        priority4: "Marketing Analytics (Low)",
        priority4Desc: "Push notification statsÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âvaluable for growth, but safe to defer.",
        priority5: "Automated Urgent Messages (Rejected)",
        priority5Desc: "High clinical risk and lack of medical oversight.",

        // Decision Making
        decisionTitle: "Decision Framework",
        decisionDesc: "Using a risk-based approach to filter requests. Example: We rejected a request for 'automated urgent messages based on form answers' due to high clinical risk and lack of medical oversight/regulatory guardrails.",

        // Resolution Process
        resolutionTitle: "Conflict Resolution",
        resolutionStep1: "Alignment Reached",
        resolutionStep1Desc: "Acknowledged that regulatory compliance and safety are non-negotiable, but delivery momentum is also critical.",
        resolutionStep2: "Key Outcome",
        resolutionStep2Desc: "Foster collaboration rather than compromise. Maintain delivery discipline while respecting standards.",

        // Agreed Actions
        actionsTitle: "Agreed Actions",
        action1: "QA identifies minimum critical documentation required for compliance.",
        action2: "Development continues in parallel on non-risk areas.",
        action3: "Final readiness checkpoint established for QA sign-off.",

        // Prevention
        preventionTitle: "Prevention Strategy",
        preventionDesc: "To permanently resolve the friction between speed and safety, we re-engineered our delivery process.",
        preventionStep1: "Shift-Left Compliance",
        preventionStep1Desc: "Integrated QA verification requirements into the user story 'Definition of Ready'. We moved compliance checks to the grooming phase, preventing documentation debt from accumulating.",
        shiftLeftInfo: "Shift-Left Concept: Moving critical testing and compliance activities earlier in the development lifecycle (to the 'left') rather than waiting for the final validation phase.",
        preventionStep2: "Unified Release Protocol",
        preventionStep2Desc: "Established a formal 'Go/No-Go' council where Product, Engineering, and QA leads must unanimously review evidence 48h before release.",

        // Outcomes
        takeawaysTitle: "Key Takeaways",
        takeaway1: "Impact-Driven",
        takeaway1Desc: "Patient safety and reliability always come first.",
        takeaway2: "Risk-Aware",
        takeaway2Desc: "Balancing speed with strict compliance requirements.",
        takeaway3: "Collaborative",
        takeaway3Desc: "Fostering alignment over authority.",

        summaryTitle: "Product Owner Excellence",
        summaryDesc: "Success means balancing stakeholder needs, technical constraints, and business value while maintaining focus on user outcomes and team collaboration."
      },
      fi: {
        title: "Terveydenhuollon tuotepriorisointi",
        subtitle: "Strateginen konfliktinratkaisu SaaS-palvelussa",
        intro: "Tasapainoilu tiukan sÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ntelyn noudattamisen ja ketterÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤n tuotekehityksen vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤lillÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤. Tapaustutkimus priorisoinnista, sidosryhmien hallinnasta ja prosessien optimoinnista.",
        projectType: "Projektityyppi",
        projectTypeValues: "Tuotehallinnan tapaustutkimus",
        timeline: "Aikataulu",
        timelineValue: "2 viikon sprinttisykli",
        tools: "TyÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶kalut & MenetelmÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤t",
        toolsValue: "Agile, Jira, Riskimatriisi, SidosryhmÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤kartta",
        standards: "Vaatimustenmukaisuus",
        standardsValue: "HIPAA, LÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤kinnÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤llisten laitteiden sÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤dÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶kset",
        roles: "Roolini",
        rolesValue: "Tuoteomistaja (Product Owner)",

        // Navigation tabs
        overviewTab: "Yleiskatsaus",
        processTab: "Ratkaisuprosessi",
        impactTab: "Tulokset & Oppiminen",

        // Overview section
        contextTitle: "Konteksti",
        contextDesc: "Sairaanhoitajia ja lÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤kÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤reitÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ tukevassa terveydenhuollon SaaS-alustassa priorisointi ei ole vain liiketoiminta-arvoa ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ kyse on potilasturvallisuudesta. Kohtasimme kriittisen kehitysjonon, jossa oli sekoitus turvallisuusongelmia, UX-parannuksia ja strategisia integraatioita.",
        conflictTitle: "Konflikti",
        conflictDesc: "Syntyi kriittinen julkaisuristiriita: QA vaati viivÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤stystÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ puutteellisen dokumentaation vuoksi, kun taas teknologiajohtaja vaati julkaisua aikataulussa pysymiseksi.",

        // Priorities
        prioritiesTitle: "Strateginen priorisointi",
        priority1: "Potilasturvallisuus (Kriittinen)",
        priority1Desc: "Tietojen synkronointivirheiden korjaaminen, jotka vaikuttavat 2%:iin tapaamisista. Ei neuvoteltavissa.",
        priority2: "Hoitaja-UX (Kriittinen)",
        priority2Desc: "HÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤lytysten nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤kyvyyden parantaminen kliinisen tietoisuuden varmistamiseksi.",
        priority3: "Strateginen kasvu (Keskitaso)",
        priority3Desc: "HL7/FHIR-vientitoiminnot ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ arvokkaita, mutta vaativat oman resursoinnin.",
        priority4: "Markkinointianalytiikka (Matala)",
        priority4Desc: "Push-ilmoitustilastot ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ arvokkaita kasvulle, mutta voidaan lykÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤.",
        priority5: "Automaattiset viestit (HylÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tty)",
        priority5Desc: "Korkea kliininen riski ja valvonnan puute.",

        // Decision Making
        decisionTitle: "PÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ksentekokehys",
        decisionDesc: "KÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ytimme riskiperusteista lÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤hestymistapaa pyyntÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶jen suodattamiseen. Esimerkki: HylkÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤simme pyynnÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶n 'automaattisista kiireellisistÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ viesteistÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ lomakevastausten perusteella' korkean kliinisen riskin ja lÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ketieteellisen valvonnan puutteen vuoksi.",

        // Resolution Process
        resolutionTitle: "Konfliktinratkaisu",
        resolutionStep1: "YhteisymmÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤rrys saavutettu",
        resolutionStep1Desc: "Tunnustettiin, ettÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ sÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ntelyn noudattaminen ja turvallisuus eivÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤t ole neuvoteltavissa, mutta toimitusvarmuus on myÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶s kriittinen.",
        resolutionStep2: "Keskeinen tulos",
        resolutionStep2Desc: "EdistetÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤n yhteistyÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶tÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ kompromissien sijaan. YllÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤pidetÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤n toimituskuria standardeja kunnioittaen.",

        // Agreed Actions
        actionsTitle: "Sovitut toimenpiteet",
        action1: "QA mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤rittÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ vaatimustenmukaisuuden edellyttÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤n kriittisen minimidokumentaation.",
        action2: "Kehitys jatkuu rinnakkain ei-riskialttiilla alueilla.",
        action3: "Lopullinen valmiustarkistus QA:n hyvÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ksyntÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ varten.",

        // Prevention
        preventionTitle: "EnnaltaehkÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤isystrategia",
        preventionDesc: "Ratkaistaksemme pysyvÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤sti nopeuden ja turvallisuuden vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤lisen ristiriidan, suunnittelimme toimitusprosessimme uudelleen.",
        preventionStep1: "Laadunvarmistuksen aikaistaminen",
        preventionStep1Desc: "Integroimme QA-vaatimukset kÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤yttÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤jÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tarinoiden 'Definition of Ready' -mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ritelmÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤n. Siirsimme tarkistukset grooming-vaiheeseen, estÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤en dokumentaatiovelan kertymisen.",
        shiftLeftInfo: "Shift-Left -kÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤site: Kriittisten testaus- ja vaatimustenmukaisuustoimien siirtÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤minen kehityskaaren aikaisempaan vaiheeseen ('vasemmalle') sen sijaan, ettÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ odotettaisiin lopputarkistuksia.",
        preventionStep2: "YhtenÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤istetty julkaisukÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ytÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ntÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶",
        preventionStep2Desc: "Perustimme virallisen 'Go/No-Go' -neuvoston, jossa Tuote-, Tekniikka- ja QA-johdon on hyvÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ksyttÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ julkaisu 48h etukÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤teen.",

        // Outcomes
        takeawaysTitle: "Keskeiset oivallukset",
        takeaway1: "VaikutuslÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤htÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶inen",
        takeaway1Desc: "Potilasturvallisuus ja luotettavuus tulevat aina ensin.",
        takeaway2: "Riskitietoinen",
        takeaway2Desc: "Tasapaino nopeuden ja tiukkojen vaatimusten vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤lillÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤.",
        takeaway3: "YhteistyÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶keskeinen",
        takeaway3Desc: "EdistetÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤n linjakkuutta auktoriteetin sijaan.",

        summaryTitle: "Tuoteomistajan erinomaisuus",
        summaryDesc: "Menestys tarkoittaa sidosryhmien tarpeiden, teknisten rajoitteiden ja liiketoiminta-arvon tasapainottamista keskittyen samalla kÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤yttÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤jÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tuloksiin ja tiimiyhteistyÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶hÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶n."
      }
    };
    return content[locale as keyof typeof content] || content.en;
  };

  const content = getLocalizedContent();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isColorful
        ? 'bg-[var(--color-colorful-bg)]'
        : isLight
          ? 'bg-gradient-to-br from-slate-50 to-gray-100'
          : 'bg-gradient-to-br from-gray-900 to-black'
      }`}>
      <Navigation />
      <CaseStudyProgress />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <CaseStudyHero
            title={content.title}
            subtitle={content.subtitle}
            image="/images/portfolio/healthcare/healthcare.jpg"
            tags={[content.rolesValue]}
            actions={[
              {
                label: locale === 'fi' ? 'Tarkastele suunnittelujÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤rjestelmÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤' : 'Design System',
                icon: 'design_services',
                href: 'https://ds.alux.space/',
                variant: 'secondary',
              },
            ]}
            meta={[
              { label: content.projectType, value: content.projectTypeValues, icon: 'assignment' },
              { label: content.timeline, value: content.timelineValue, icon: 'schedule' },
              { label: content.tools, value: content.toolsValue, icon: 'build' },
              { label: content.standards, value: content.standardsValue, icon: 'gavel' },
            ]}
          />

          {/* Intro Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enterSlow, delay: delaySeconds.md }}
          >
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>
              {content.intro}
            </p>
          </motion.div>

          {/* Case Study Sections */}
          <CaseStudySection title={content.overviewTab} icon="visibility" accent="blue" number={1}>
                {/* Context & Conflict Row */}
                <div className="grid md:grid-cols-2 gap-8 mb-14">
                  {[
                    { title: content.contextTitle, desc: content.contextDesc, colorful: 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-400/20', light: 'bg-white shadow-sm', dark: 'bg-gray-800/60 border border-gray-700/30', titleColor: isColorful ? 'text-blue-300' : isLight ? 'text-gray-900' : 'text-white', extra: null },
                    { title: content.conflictTitle, desc: content.conflictDesc, colorful: 'bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-400/20', light: 'bg-white shadow-sm', dark: 'bg-gray-800/60 border border-gray-700/30', titleColor: isColorful ? 'text-red-300' : isLight ? 'text-gray-900' : 'text-white', extra: 'conflict' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ ...t.enter, delay: i * stagger.relaxed }}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl transition-shadow duration-300 ${isColorful ? card.colorful : isLight ? card.light : card.dark}`}
                    >
                      <h3 className={`text-xl font-semibold mb-3 ${card.titleColor}`}>{card.title}</h3>
                      {card.extra === 'conflict' && (
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`px-4 py-2 rounded-lg font-bold ${isLight ? 'bg-red-100 text-red-700' : 'bg-red-900/40 text-red-300'}`}>QA Team</div>
                          <span className="font-bold text-xl">VS</span>
                          <div className={`px-4 py-2 rounded-lg font-bold ${isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/40 text-blue-300'}`}>CTO</div>
                        </div>
                      )}
                      <p className={`leading-relaxed ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'}`}>{card.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Priorities Section */}
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.enterSlow, delay: delaySeconds.md }}
                >
                  <h2 className={`text-xl font-semibold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.prioritiesTitle}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        id: "HC-134",
                        title: content.priority1,
                        desc: content.priority1Desc,
                        priorityIcon: "keyboard_double_arrow_up",
                        typeIcon: "bug_report",
                        color: "red",
                        status: "Active"
                      },
                      {
                        id: "HC-142",
                        title: content.priority2,
                        desc: content.priority2Desc,
                        priorityIcon: "keyboard_double_arrow_up",
                        typeIcon: "check_box",
                        color: "red",
                        status: "Active"
                      },
                      {
                        id: "HC-156",
                        title: content.priority3,
                        desc: content.priority3Desc,
                        priorityIcon: "drag_handle",
                        typeIcon: "bookmark",
                        color: "yellow",
                        status: "Backlog"
                      },
                      {
                        id: "HC-161",
                        title: content.priority4,
                        desc: content.priority4Desc,
                        priorityIcon: "keyboard_arrow_down",
                        typeIcon: "bookmark",
                        color: "blue",
                        status: "Backlog"
                      },
                      {
                        id: "HC-168",
                        title: content.priority5,
                        desc: content.priority5Desc,
                        priorityIcon: "block",
                        typeIcon: "dangerous",
                        color: "gray",
                        status: "Rejected"
                      },
                    ].map((item, index) => {
                      const styles = getColorStyles(item.color);
                      // Extract just the color part for border-l (e.g., border-red-500)
                      // A bit hacky but works given the consistent naming in getColorStyles if we look at iconText 'text-red-400' etc.
                      // Better to hardcode the border-l class based on color prop since dynamic literals don't work well
                      const borderLeftClass = {
                        red: 'border-l-red-500',
                        orange: 'border-l-orange-500',
                        yellow: 'border-l-yellow-500',
                        blue: 'border-l-blue-500',
                        gray: 'border-l-gray-500',
                        purple: 'border-l-purple-500',
                        green: 'border-l-green-500',
                        teal: 'border-l-teal-500'
                      }[item.color] || 'border-l-gray-500';

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: durationSeconds.ease, delay: index * stagger.normal, ease: easing.out.array }}
                          whileHover={{ y: -3 }}
                          className={`p-4 rounded-lg flex flex-col gap-3 border-l-4 transition-shadow duration-300 hover:shadow-md ${borderLeftClass
                          } ${isColorful
                            ? 'bg-gray-800/80 backdrop-blur-sm border-y border-r border-white/10'
                            : isLight ? 'bg-white border-y border-r border-gray-100 shadow-sm' : 'bg-gray-800 border-y border-r border-gray-700'
                          }`}>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className={`material-symbols text-lg ${styles.iconText}`}>{item.typeIcon}</span>
                              <span className={`text-xs font-mono font-medium ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{item.id}</span>
                            </div>
                            <div className={`flex items-center justify-center w-6 h-6 rounded ${isLight ? 'bg-gray-100' : 'bg-gray-700'}`}>
                              <span className={`material-symbols text-lg ${styles.iconText}`}>{item.priorityIcon}</span>
                            </div>
                          </div>

                          <div>
                            <h4 className={`text-sm font-bold mb-1 leading-tight ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h4>
                            <p className={`text-xs ${isColorful ? 'text-gray-400' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{item.desc}</p>
                          </div>

                          <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-500/10">
                            <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${item.status === 'Rejected'
                                ? (isLight ? 'bg-gray-100 text-gray-600' : 'bg-gray-700 text-gray-300')
                                : item.status === 'Backlog'
                                  ? (isLight ? 'bg-amber-50 text-amber-600' : 'bg-amber-900/20 text-amber-300')
                                  : (isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/20 text-blue-300')
                              }`}>
                              {item.status}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>

                {/* Decision Framework / Rejection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={t.enter}
                  className={`p-6 rounded-2xl ${isColorful
                    ? 'bg-gradient-to-br from-purple-900/15 to-pink-900/15 border border-purple-400/15'
                    : isLight ? 'bg-gray-50/80 border border-gray-200/60' : 'bg-gray-800/40 border border-gray-700/30'
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className={`material-symbols text-2xl ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>filter_alt_off</span>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.decisionTitle}</h3>
                      <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{content.decisionDesc}</p>
                    </div>
                  </div>
                </motion.div>
          </CaseStudySection>

          {/* Resolution Process Section */}
          <CaseStudySection title={content.processTab} icon="handshake" accent="green" number={2}>
                {/* Resolution Process */}
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.enterSlow, delay: delaySeconds.md }}
                >
                  <h2 className={`text-xl font-semibold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.resolutionTitle}</h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {[
                      { icon: 'handshake', color: isColorful ? 'bg-green-500/15 text-green-400' : isLight ? 'bg-green-50 text-green-500' : 'bg-green-900/30 text-green-400', title: content.resolutionStep1, desc: content.resolutionStep1Desc },
                      { icon: 'lightbulb', color: isColorful ? 'bg-blue-500/15 text-blue-400' : isLight ? 'bg-blue-50 text-blue-500' : 'bg-blue-900/30 text-blue-400', title: content.resolutionStep2, desc: content.resolutionStep2Desc },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ ...t.enter, delay: i * stagger.relaxed }}
                        className="flex items-start gap-4"
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.color}`}>
                          <span className="material-symbols text-lg">{step.icon}</span>
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{step.title}</h3>
                          <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className={`p-6 rounded-2xl ${isColorful
                      ? 'bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-400/15'
                      : isLight ? 'bg-blue-50/60' : 'bg-blue-900/8'
                    }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>{content.actionsTitle}</h3>
                    <div className="space-y-4">
                      {[content.action1, content.action2, content.action3].map((action, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: durationSeconds.ease, delay: i * stagger.normal, ease: easing.out.array }}
                          className="flex items-start gap-3"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">{i + 1}</span>
                          <p className={`${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{action}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Prevention Strategy */}
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.enterSlow, delay: delaySeconds.lg }}
                >
                  <h2 className={`text-xl font-semibold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.preventionTitle}</h2>
                  <p className={`text-base mb-10 max-w-3xl ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{content.preventionDesc}</p>

                  <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Connecting Arrow for Desktop */}
                    <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-10 ${isColorful ? 'bg-purple-500/15 text-purple-300' : isLight ? 'bg-white shadow-sm text-gray-400' : 'bg-gray-700/80 text-gray-300'
                      }`}>
                      <span className="material-symbols text-lg">arrow_forward</span>
                    </div>

                    {/* Step 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={t.enter}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl relative border transition-shadow duration-300 ${isColorful
                        ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-400/20'
                        : isLight ? 'bg-white shadow-sm hover:shadow-md border-gray-100' : 'bg-gray-800/60 border-gray-700/30'
                      }`}>
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 text-xl ${isColorful ? 'bg-indigo-500/20 text-indigo-300' : isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-900/40 text-indigo-300'
                        }`}>
                        <span className="material-symbols">fact_check</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`text-lg font-semibold ${isColorful ? 'text-indigo-200' : isLight ? 'text-gray-900' : 'text-white'}`}>
                          {content.preventionStep1}
                        </h4>
                        <div className="relative group/info">
                          <span className={`material-symbols text-lg cursor-help transition-colors ${isColorful ? 'text-indigo-400 hover:text-indigo-300' : isLight ? 'text-indigo-400 hover:text-indigo-600' : 'text-indigo-400 hover:text-indigo-300'
                            }`}>info</span>

                          {/* Tooltip */}
                          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 rounded-lg text-xs shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-50 ${isColorful ? 'bg-indigo-950 text-indigo-100 border border-indigo-500/30' : isLight ? 'bg-gray-900 text-white' : 'bg-gray-700 text-gray-100'
                            }`}>
                            {content.shiftLeftInfo}
                            {/* Arrow */}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent ${isColorful ? 'border-t-indigo-950' : isLight ? 'border-t-gray-900' : 'border-t-gray-700'
                              }`}></div>
                          </div>
                        </div>
                      </div>

                      <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{content.preventionStep1Desc}</p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ ...t.enter, delay: stagger.relaxed }}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl relative border transition-shadow duration-300 ${isColorful
                        ? 'bg-gradient-to-br from-pink-900/20 to-rose-900/20 border-pink-400/20'
                        : isLight ? 'bg-white shadow-sm hover:shadow-md border-gray-100' : 'bg-gray-800/60 border-gray-700/30'
                      }`}>
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 text-xl ${isColorful ? 'bg-pink-500/20 text-pink-300' : isLight ? 'bg-pink-50 text-pink-600' : 'bg-pink-900/40 text-pink-300'
                        }`}>
                        <span className="material-symbols">gavel</span>
                      </div>
                      <h4 className={`text-lg font-semibold mb-2 ${isColorful ? 'text-pink-200' : isLight ? 'text-gray-900' : 'text-white'}`}>{content.preventionStep2}</h4>
                      <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{content.preventionStep2Desc}</p>
                    </motion.div>
                  </div>
                </motion.section>
            </CaseStudySection>

          {/* Outcomes Section */}
          <CaseStudySection title={content.impactTab} icon="lightbulb" accent="teal" number={3}>
                {/* Takeaways */}
                <div className="grid md:grid-cols-3 gap-8 mb-14">
                  {[
                    { title: content.takeaway1, desc: content.takeaway1Desc, icon: "ads_click", color: "blue" },
                    { title: content.takeaway2, desc: content.takeaway2Desc, icon: "balance", color: "purple" },
                    { title: content.takeaway3, desc: content.takeaway3Desc, icon: "groups", color: "teal" },
                  ].map((item, index) => {
                    const styles = getColorStyles(item.color);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ ...t.enter, delay: index * stagger.slow }}
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-2xl text-center transition-shadow duration-300 ${isColorful
                          ? styles.takeawayBg
                          : isLight ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-800/60 border border-gray-700/30'
                        }`}
                      >
                        <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${isColorful ? styles.takeawayIconBg : isLight ? `${styles.iconBg} ${styles.iconText}` : `${styles.iconBg} ${styles.iconText}`
                          }`}>
                          <span className="material-symbols text-xl">{item.icon}</span>
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                        <p className={`${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{item.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={t.enterSlow}
                  className="text-center max-w-2xl mx-auto pt-10"
                >
                  <div className={`mx-auto w-px h-12 mb-8 ${isColorful ? 'bg-gradient-to-b from-transparent via-purple-400/40 to-transparent' : isLight ? 'bg-gray-200' : 'bg-gray-700/60'}`} />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...t.enter, delay: delaySeconds.sm }}
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-5 ${isColorful ? 'bg-purple-500/15 text-purple-300' : isLight ? 'bg-blue-50 text-blue-500' : 'bg-blue-900/20 text-blue-400'}`}
                  >
                    <span className="material-symbols text-xl">star</span>
                  </motion.div>
                  <h2 className={`text-xl font-semibold mb-3 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-teal-300' : isLight ? 'text-gray-900' : 'text-white'}`}>{content.summaryTitle}</h2>
                  <p className={`text-lg leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-500' : 'text-gray-400'}`}>{content.summaryDesc}</p>
                </motion.div>
              </CaseStudySection>
        </div>
      </main>
    </div>
  );
}
