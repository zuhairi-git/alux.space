'use client'

interface SkipLinksProps {
  links?: Array<{
    href: string
    label: string
  }>
}

const defaultLinks = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' }
]

export default function SkipLinks({ links = defaultLinks }: SkipLinksProps) {
  return (
    <nav aria-label="Skip navigation links" className="sr-only focus-within:not-sr-only">
      <ul className="fixed top-0 left-0 z-50 flex flex-col gap-2 p-4 bg-background shadow-lg">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="inline-block px-4 py-2 text-sm font-medium text-primary bg-background border border-primary rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onFocus={(e) => {
                // Ensure the skip link is visible when focused
                e.currentTarget.scrollIntoView({ block: 'nearest' })
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
