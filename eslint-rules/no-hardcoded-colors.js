/**
 * ESLint rule: no-hardcoded-colors
 *
 * Flags hex color literals (#rgb, #rrggbb, #rrggbbaa) in JSX/TS files
 * so developers use design-system tokens instead.
 *
 * Covers:
 *  - String literals:          '#3b82f6'
 *  - Template literal quasis:  `bg-[#3b82f6]`
 *  - JSX attribute values:     color="#3b82f6"
 *
 * Ignores:
 *  - Files outside src/components/ and src/app/
 *  - Comments
 *  - tokens.css / tokens.ts (token definitions themselves)
 */

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow hardcoded hex colors — use design-system tokens instead.',
    },
    messages: {
      noHardcodedColor:
        'Avoid hardcoded color "{{color}}". Use a CSS custom property from tokens.css or import from @/design-system.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename?.() ?? context.filename ?? '';
    const normalized = filename.replace(/\\/g, '/');

    // Only lint component / app files
    if (!normalized.includes('/src/components/') && !normalized.includes('/src/app/')) {
      return {};
    }
    // Don't lint token definitions
    if (normalized.includes('/design-system/')) {
      return {};
    }

    const HEX_PATTERN = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;

    function checkString(node, value) {
      if (typeof value !== 'string') return;
      let match;
      HEX_PATTERN.lastIndex = 0;
      while ((match = HEX_PATTERN.exec(value)) !== null) {
        context.report({
          node,
          messageId: 'noHardcodedColor',
          data: { color: match[0] },
        });
      }
    }

    return {
      Literal(node) {
        checkString(node, node.value);
      },
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          checkString(node, quasi.value.raw);
        }
      },
    };
  },
};

module.exports = rule;
