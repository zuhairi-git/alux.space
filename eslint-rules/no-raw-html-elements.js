/**
 * ESLint rule: no-raw-html-elements
 *
 * Flags raw HTML interactive elements (<button>, <input>, <select>)
 * in component/app files and suggests using the design-system
 * components instead.
 *
 * Ignored:
 *  - Files inside src/design-system/ (component implementations)
 *  - Files inside src/components/ui/ (the DS component sources themselves)
 *  - Files inside src/app/mobile/ and src/components/mobile/ (prototype mockups)
 *  - Design page showcase (src/app/design/)
 */

/** @type {Record<string, string>} */
const ELEMENT_MAP = {
  button: 'Button (@/components/ui/Button)',
  input: 'Input (@/components/ui/Input)',
  select: 'Select (@/components/ui/Select)',
};

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow raw HTML interactive elements — use design-system components instead.',
    },
    messages: {
      noRawElement:
        'Avoid raw <{{element}}> — use the design-system component: {{replacement}}.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename?.() ?? context.filename ?? '';
    const normalized = filename.replace(/\\/g, '/');

    // Only lint component / app files
    if (
      !normalized.includes('/src/components/') &&
      !normalized.includes('/src/app/')
    ) {
      return {};
    }

    // Exclude: DS source files, mobile prototypes, design showcase
    const excludePaths = [
      '/src/design-system/',
      '/src/components/ui/',
      '/src/app/mobile/',
      '/src/components/mobile/',
      '/src/app/design/',
    ];
    if (excludePaths.some((p) => normalized.includes(p))) {
      return {};
    }

    return {
      JSXOpeningElement(node) {
        const name =
          node.name && node.name.type === 'JSXIdentifier'
            ? node.name.name
            : null;

        if (name && ELEMENT_MAP[name]) {
          context.report({
            node,
            messageId: 'noRawElement',
            data: {
              element: name,
              replacement: ELEMENT_MAP[name],
            },
          });
        }
      },
    };
  },
};

module.exports = rule;
