#!/usr/bin/env node

/**
 * SEO Development Scripts
 * Tools for SEO monitoring and optimization during development
 */

const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');

class SEODevTools {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  async runDevAudit() {
    console.log('🔍 Running SEO development audit...\n');

    try {
      const results = {
        timestamp: new Date().toISOString(),
        baseUrl: this.baseUrl,
        checks: []
      };

      // 1. Check if development server is running
      const serverRunning = await this.checkServer();
      results.checks.push({
        name: 'Development Server',
        status: serverRunning ? 'pass' : 'fail',
        message: serverRunning ? 'Server is running' : 'Server is not accessible'
      });

      if (serverRunning) {
        // 2. Check meta tags
        await this.checkMetaTags(results);

        // 3. Check structured data
        await this.checkStructuredData(results);

        // 4. Check robots.txt
        await this.checkRobotsTxt(results);

        // 5. Check sitemap
        await this.checkSitemap(results);

        // 6. Check performance
        await this.checkPagePerformance(results);
      }

      // 7. Check file structure
      await this.checkFileStructure(results);

      this.displayResults(results);
      return results;

    } catch (error) {
      console.error('❌ Development audit failed:', error.message);
      throw error;
    }
  }

  async checkServer() {
    return new Promise((resolve) => {
      const url = new URL(this.baseUrl);
      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: '/',
        method: 'HEAD',
        timeout: 5000
      };

      const req = http.request(options, (res) => {
        resolve(res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302);
      });

      req.on('error', () => resolve(false));
      req.on('timeout', () => resolve(false));
      req.end();
    });
  }

  async checkMetaTags(results) {
    try {
      const response = await fetch(this.baseUrl);
      const html = await response.text();

      const checks = [
        { name: 'Title Tag', regex: /<title[^>]*>([^<]+)<\/title>/i },
        { name: 'Meta Description', regex: /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i },
        { name: 'Open Graph Title', regex: /<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i },
        { name: 'Open Graph Description', regex: /<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/i },
        { name: 'Canonical URL', regex: /<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i },
        { name: 'Viewport Meta', regex: /<meta[^>]*name="viewport"[^>]*>/i }
      ];

      checks.forEach(check => {
        const match = html.match(check.regex);
        results.checks.push({
          name: check.name,
          status: match ? 'pass' : 'fail',
          message: match ? `Found: ${match[1] || 'Present'}` : 'Missing',
          value: match ? match[1] : null
        });
      });

    } catch (error) {
      results.checks.push({
        name: 'Meta Tags Check',
        status: 'error',
        message: `Failed to check meta tags: ${error.message}`
      });
    }
  }

  async checkStructuredData(results) {
    try {
      const response = await fetch(this.baseUrl);
      const html = await response.text();

      const jsonLdMatches = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis);
      
      if (jsonLdMatches && jsonLdMatches.length > 0) {
        const structuredDataCount = jsonLdMatches.length;
        let validSchemas = 0;

        jsonLdMatches.forEach((match, index) => {
          try {
            const jsonContent = match.replace(/<script[^>]*>|<\/script>/gi, '').trim();
            JSON.parse(jsonContent);
            validSchemas++;
          } catch (e) {
            results.checks.push({
              name: `Structured Data Schema ${index + 1}`,
              status: 'fail',
              message: 'Invalid JSON-LD syntax'
            });
          }
        });

        results.checks.push({
          name: 'Structured Data',
          status: validSchemas === structuredDataCount ? 'pass' : 'warning',
          message: `Found ${validSchemas}/${structuredDataCount} valid schemas`
        });
      } else {
        results.checks.push({
          name: 'Structured Data',
          status: 'fail',
          message: 'No JSON-LD structured data found'
        });
      }

    } catch (error) {
      results.checks.push({
        name: 'Structured Data Check',
        status: 'error',
        message: `Failed to check structured data: ${error.message}`
      });
    }
  }

  async checkRobotsTxt(results) {
    try {
      const response = await fetch(`${this.baseUrl}/robots.txt`);
      
      if (response.ok) {
        const content = await response.text();
        const hasUserAgent = /user-agent:/i.test(content);
        const hasSitemap = /sitemap:/i.test(content);

        results.checks.push({
          name: 'robots.txt',
          status: hasUserAgent && hasSitemap ? 'pass' : 'warning',
          message: `${hasUserAgent ? '✓' : '✗'} User-agent, ${hasSitemap ? '✓' : '✗'} Sitemap`
        });
      } else {
        results.checks.push({
          name: 'robots.txt',
          status: 'fail',
          message: 'robots.txt not accessible'
        });
      }
    } catch (error) {
      results.checks.push({
        name: 'robots.txt',
        status: 'error',
        message: `Failed to check robots.txt: ${error.message}`
      });
    }
  }

  async checkSitemap(results) {
    try {
      const response = await fetch(`${this.baseUrl}/sitemap.xml`);
      
      if (response.ok) {
        const content = await response.text();
        const urlCount = (content.match(/<url>/g) || []).length;

        results.checks.push({
          name: 'sitemap.xml',
          status: urlCount > 0 ? 'pass' : 'warning',
          message: `Found ${urlCount} URLs`
        });
      } else {
        results.checks.push({
          name: 'sitemap.xml',
          status: 'fail',
          message: 'sitemap.xml not accessible'
        });
      }
    } catch (error) {
      results.checks.push({
        name: 'sitemap.xml',
        status: 'error',
        message: `Failed to check sitemap: ${error.message}`
      });
    }
  }

  async checkPagePerformance(results) {
    try {
      const start = Date.now();
      const response = await fetch(this.baseUrl);
      const loadTime = Date.now() - start;

      const contentLength = response.headers.get('content-length');
      const gzipEncoding = response.headers.get('content-encoding') === 'gzip';

      results.checks.push({
        name: 'Page Load Time',
        status: loadTime < 2000 ? 'pass' : loadTime < 5000 ? 'warning' : 'fail',
        message: `${loadTime}ms`
      });

      if (contentLength) {
        const sizeKB = Math.round(parseInt(contentLength) / 1024);
        results.checks.push({
          name: 'Page Size',
          status: sizeKB < 500 ? 'pass' : sizeKB < 1000 ? 'warning' : 'fail',
          message: `${sizeKB}KB${gzipEncoding ? ' (gzipped)' : ''}`
        });
      }

    } catch (error) {
      results.checks.push({
        name: 'Performance Check',
        status: 'error',
        message: `Failed to check performance: ${error.message}`
      });
    }
  }

  async checkFileStructure(results) {
    const requiredFiles = [
      { path: 'public/favicon.ico', name: 'Favicon' },
      { path: 'public/robots.txt', name: 'Robots.txt in Public' },
      { path: 'seo/config.ts', name: 'SEO Config' },
      { path: 'seo/analytics.ts', name: 'Analytics Setup' },
      { path: 'seo/structured-data.ts', name: 'Structured Data' }
    ];

    for (const file of requiredFiles) {
      try {
        await fs.access(path.join(process.cwd(), file.path));
        results.checks.push({
          name: file.name,
          status: 'pass',
          message: 'File exists'
        });
      } catch (error) {
        results.checks.push({
          name: file.name,
          status: 'fail',
          message: 'File not found'
        });
      }
    }
  }

  displayResults(results) {
    console.log('\n📊 SEO Development Audit Results');
    console.log('=' .repeat(50));

    const statusSymbols = {
      pass: '✅',
      warning: '⚠️ ',
      fail: '❌',
      error: '🚨'
    };

    results.checks.forEach(check => {
      const symbol = statusSymbols[check.status] || '❓';
      console.log(`${symbol} ${check.name}: ${check.message}`);
    });

    const passCount = results.checks.filter(c => c.status === 'pass').length;
    const totalCount = results.checks.length;
    const score = Math.round((passCount / totalCount) * 100);

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Overall Score: ${score}% (${passCount}/${totalCount} checks passed)`);

    if (score < 80) {
      console.log('\n💡 Recommendations:');
      results.checks.filter(c => c.status !== 'pass').forEach(check => {
        console.log(`   • Fix: ${check.name} - ${check.message}`);
      });
    }

    console.log('\n');
  }

  async generateReport() {
    const results = await this.runDevAudit();
    
    // Save detailed report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(process.cwd(), 'seo', 'reports', `dev-audit-${timestamp}.json`);
    
    try {
      await fs.mkdir(path.dirname(reportPath), { recursive: true });
      await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
      console.log(`📄 Detailed report saved: ${reportPath}`);
    } catch (error) {
      console.error('Failed to save report:', error.message);
    }

    return results;
  }

  async watchMode() {
    console.log('👁️  Starting SEO watch mode...');
    console.log('   Monitoring for changes and running quick audits');
    console.log('   Press Ctrl+C to stop\n');

    let lastAudit = 0;
    const auditInterval = 30000; // 30 seconds

    const runPeriodicAudit = async () => {
      const now = Date.now();
      if (now - lastAudit > auditInterval) {
        lastAudit = now;
        console.log(`\n⏰ Running periodic SEO check... (${new Date().toLocaleTimeString()})`);
        
        try {
          await this.runDevAudit();
        } catch (error) {
          console.error('Periodic audit failed:', error.message);
        }
      }
    };

    // Run initial audit
    await runPeriodicAudit();

    // Set up periodic audits
    const interval = setInterval(runPeriodicAudit, 10000);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      clearInterval(interval);
      console.log('\n👋 SEO watch mode stopped');
      process.exit(0);
    });
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'audit';

  const seoTools = new SEODevTools();

  try {
    switch (command) {
      case 'audit':
        await seoTools.runDevAudit();
        break;
      
      case 'report':
        await seoTools.generateReport();
        break;
      
      case 'watch':
        await seoTools.watchMode();
        break;
      
      default:
        console.log('Usage: node scripts/seo-dev.js [audit|report|watch]');
        console.log('');
        console.log('Commands:');
        console.log('  audit  - Run SEO audit (default)');
        console.log('  report - Generate detailed report');
        console.log('  watch  - Monitor and run periodic audits');
        break;
    }
  } catch (error) {
    console.error('❌ Command failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = SEODevTools;
