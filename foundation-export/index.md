# 🎨 Design System Foundation Export

This folder contains everything you need to share your design system foundation with other Next.js projects.

## 📁 What's Inside

| File | Description | Usage |
|------|-------------|--------|
| `README.md` | Complete setup guide and documentation | Read first for setup instructions |
| `tailwind.config.js` | Tailwind CSS configuration with all design tokens | Copy to your project root |
| `globals.css` | Global styles with utility classes | Copy content to your globals.css |
| `design-tokens.js` | JavaScript object with all design tokens | Optional - for programmatic access |
| `package.json` | Package configuration for npm publishing | For creating an npm package |
| `setup-foundation.js` | Automated setup script | Run in target project to auto-setup |

## 🚀 Quick Setup (2 methods)

### Method 1: Manual Copy (Recommended)
1. Copy files to your other Next.js project
2. Follow the instructions in `README.md`
3. Install dependencies and you're ready!

### Method 2: Automated Script
1. Copy the entire `foundation-export` folder to your target project
2. Run: `node setup-foundation.js`
3. Follow the printed instructions

## 📦 Package Distribution (Optional)

To share as an npm package:
1. Update `package.json` with your details
2. Run `npm publish` (requires npm account)
3. Install in other projects with `npm install @yourname/design-system-foundation`

## 🎯 What You Get

- **Complete color system** (Primary, Accent, Neutral, Semantic colors)
- **Typography scale** with responsive font sizes
- **Spacing system** for consistent layouts
- **Component patterns** for buttons, cards, etc.
- **Dark mode support** out of the box
- **Animations** and micro-interactions
- **Accessibility features** built-in
- **Responsive design** utilities

## 💡 Benefits

✅ **Consistent design** across all your projects  
✅ **Quick setup** - ready in under 5 minutes  
✅ **Future-proof** - easy to update and maintain  
✅ **Flexible** - use as much or as little as needed  
✅ **Well-documented** - comprehensive usage guide  

---

Start with the `README.md` file for complete setup instructions and examples!
