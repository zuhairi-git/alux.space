# 🚀 Deployment & Testing Guide

## Pre-Deployment Verification ✅

### 1. Build Status
- **Static Pages**: 45/45 ✅
- **Generated Files**: 482 files ✅
- **Build Time**: ~4 seconds ✅
- **Bundle Size**: 101kB shared JS ✅

### 2. SEO Assets Verification
```powershell
# Verify sitemap
Get-Content public\sitemap.xml | Select-String "alux.space" | Measure-Object
# Should show 26 URLs with correct domain

# Verify robots.txt
Get-Content public\robots.txt | Select-String "Sitemap:"
# Should show sitemap directive

# Check structured data
Get-Content public\structured-data.json | ConvertFrom-Json
# Should show valid Person schema
```

### 3. Analytics Implementation Test
```powershell
# Run analytics audit
node scripts\seo-build.js
# Should show: "Analytics implementation tested (3/3 functions found)"
```

## 🌐 Deployment Options

### Option 1: Static Hosting (Recommended)
**Best for**: Netlify, Vercel, GitHub Pages, AWS S3

```powershell
# Deploy the out/ directory contents
# Files are already optimized and ready
```

**Deployment checklist**:
- ✅ Upload `out/` directory contents to your hosting provider
- ✅ Configure custom domain to point to hosting
- ✅ Set up HTTPS (usually automatic)
- ✅ Configure redirects if needed

### Option 2: CDN Deployment
**Best for**: Cloudflare Pages, Azure Static Web Apps

```powershell
# Connect your GitHub repo
# Set build command: npm run build
# Set publish directory: out
```

### Option 3: Traditional Web Server
**Best for**: Apache, Nginx, IIS

```powershell
# Copy out/ contents to web server document root
# Configure server for SPA routing if needed
```

## 🧪 Post-Deployment Testing

### 1. Core Functionality Tests
```javascript
// Test URLs to verify:
const testUrls = [
  'https://alux.space/',
  'https://alux.space/en',
  'https://alux.space/fi', 
  'https://alux.space/en/portfolio',
  'https://alux.space/en/blog',
  'https://alux.space/sitemap.xml',
  'https://alux.space/robots.txt'
];
```

### 2. SEO Verification
- **Google Search Console**: Submit sitemap
- **Sitemap validation**: Use online XML validators
- **Structured data**: Test with Google's Rich Results Tool
- **Mobile-friendly**: Use Google's Mobile-Friendly Test

### 3. Analytics Testing
Open browser console and test:
```javascript
// Should be available after page load
window.gtag('event', 'test_event', {
  event_category: 'Testing',
  event_label: 'Deployment Test'
});
```

### 4. Performance Testing
- **PageSpeed Insights**: Test Core Web Vitals
- **GTmetrix**: Performance analysis  
- **Lighthouse**: Comprehensive audit

## 📊 Google Analytics Setup

### 1. Verify Tracking ID
```typescript
// In your deployed site, check:
// GA_MEASUREMENT_ID should be: G-Q4W5CMHWD6
```

### 2. Test Events
Click through these elements to verify tracking:
- ✅ Hero CTA buttons
- ✅ Portfolio project cards  
- ✅ Blog post cards
- ✅ Navigation links

### 3. Monitor Real-Time Data
- Go to Google Analytics → Reports → Realtime
- Should see traffic and events as you test

## 🔍 SEO Monitoring Setup

### 1. Google Search Console
1. Add property: `https://alux.space`
2. Verify ownership via HTML file or DNS
3. Submit sitemap: `https://alux.space/sitemap.xml`

### 2. Site Health Monitoring
```powershell
# Schedule regular SEO audits
node scripts\seo-build.js
```

### 3. Content Performance
Monitor these key pages:
- Homepage (`/en`, `/fi`)
- Portfolio pages (`/en/portfolio/*`)
- Blog posts (`/en/blog/*`)

## 🐛 Troubleshooting

### Issue: Analytics not working
**Solution**: Check browser console for errors
```javascript
// Debug command:
console.log('Analytics loaded:', typeof window.gtag !== 'undefined');
```

### Issue: Sitemap not updating
**Solution**: Regenerate and redeploy
```powershell
npm run build
# Check public\sitemap.xml for latest timestamp
```

### Issue: Provider context errors
**Solution**: Clear browser cache and test
```powershell
# If issues persist, check console for hydration errors
```

## 📈 Performance Benchmarks

### Expected Lighthouse Scores
- **Performance**: 85-95/100
- **Accessibility**: 90-100/100  
- **Best Practices**: 90-100/100
- **SEO**: 95-100/100

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **INP**: < 200ms
- **CLS**: < 0.1

## 🔄 Maintenance

### Weekly Tasks
```powershell
# Check for build issues
npm run build

# Run SEO audit  
node scripts\seo-build.js

# Update dependencies
npm audit
```

### Monthly Tasks
- Review Google Analytics data
- Check Search Console performance
- Update content as needed
- Monitor Core Web Vitals

## 📞 Support Contacts

### Development Issues
- Check GitHub Issues
- Review build logs
- Test locally with `npm run dev`

### SEO/Analytics Issues  
- Google Search Console help
- Google Analytics documentation
- Schema.org validation tools

---

## 🎉 Deployment Commands

### Final deployment preparation:
```powershell
# 1. Final build
npm run build

# 2. Verify output
Get-ChildItem out -Recurse | Measure-Object

# 3. Test SEO
node scripts\seo-build.js

# 4. Deploy out/ directory contents to your hosting provider
```

**Your site is ready for production! 🚀**

All systems are go for deployment. The static site has been generated successfully with full SEO optimization and analytics tracking.
