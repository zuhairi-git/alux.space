'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { durationSeconds, delaySeconds, transition as t, Button, Icon } from '@/design-system';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

interface HeroAction {
  label: string;
  icon: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'cosmic' | 'prototype';
}

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  image: string;
  tags?: string[];
  actions?: HeroAction[];
  meta?: { label: string; value: string; icon: string }[];
}

export default function CaseStudyHero({
  title,
  subtitle,
  image,
  tags,
  actions = [],
  meta = [],
}: CaseStudyHeroProps) {
  const { locale } = useLanguage();

  return (
    <>
      {/* Back navigation */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: durationSeconds.ease }}
        className="mb-8"
      >
        <Link
          href={`/${locale}/portfolio`}
          className="group inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors duration-200 rounded-sm px-1 py-1"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 ease-out group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{locale === 'fi' ? 'Takaisin portfolioon' : 'Back to portfolio'}</span>
        </Link>
      </motion.nav>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative h-[50vh] max-h-[520px] overflow-hidden rounded-3xl mb-12"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t.enter, delay: delaySeconds.lg }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {tags.map((tag, i) => (
                <Badge key={i} variant="glass">{tag}</Badge>
              ))}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enterSlow, delay: delaySeconds.sm }}
            className="text-4xl md:text-5xl font-bold text-on-dark mb-3"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enter, delay: delaySeconds.lg }}
            className="text-lg md:text-xl text-on-dark/80 max-w-2xl mb-6"
          >
            {subtitle}
          </motion.p>

          {/* Actions */}
          {actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t.enter, delay: delaySeconds.xl }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {actions.map((action, i) => {
                // All hero buttons are on images — prototype/highlight CTAs share the tokenized cosmic DS treatment,
                // glass (primary-tinted + white text) for primary actions, overlay (dark frosted) for secondary.
                const variant = action.variant === 'cosmic' || action.variant === 'prototype' ? 'cosmic' as const
                  : action.variant === 'secondary' ? 'overlay' as const
                  : 'glass' as const;
                const icon = <Icon name={action.icon} />;

                if (action.href) {
                  if (action.href.startsWith('/')) {
                    return (
                      <Link
                        key={i}
                        href={action.href}
                        className="w-full sm:w-auto"
                      >
                        <Button variant={variant} leftIcon={icon} className="w-full">
                          {action.label}
                        </Button>
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={i}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant={variant} leftIcon={icon} className="w-full">
                        {action.label}
                      </Button>
                    </a>
                  );
                }
                return (
                  <Button
                    key={i}
                    variant={variant}
                    leftIcon={icon}
                    onClick={action.onClick}
                    className="w-full sm:w-auto"
                  >
                    {action.label}
                  </Button>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Meta info strip */}
      {meta.length > 0 && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-14 px-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t.enter, delay: delaySeconds.lg }}
        >
          {meta.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durationSeconds.ease, delay: 0.35 + i * 0.07 }}
            >
              <MaterialSymbol className="text-lg mt-0.5 flex-shrink-0 text-primary/50">
                {item.icon}
              </MaterialSymbol>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/40">
                  {item.label}
                </span>
                <p className="text-sm font-medium mt-0.5 leading-snug text-foreground">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
