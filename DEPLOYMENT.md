# ENEPLUS Website Deployment Guide

## Overview

This document provides step-by-step instructions for deploying the ENEPLUS Jekyll website to GitHub Pages and configuring it for production use.

## Prerequisites

- GitHub account
- Git installed locally
- Ruby 2.7+ and Bundler (for local development)

## Quick Setup

### 1. Repository Setup

1. Create a new GitHub repository named `eneplus`
2. Clone the repository locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/eneplus.git
   cd eneplus
   ```

3. Copy all project files to the repository
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial commit: ENEPLUS Jekyll website"
   git push origin main
   ```

### 2. GitHub Pages Configuration

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

The website will be available at: `https://YOUR_USERNAME.github.io/eneplus`

### 3. Custom Domain Setup (Optional)

If you want to use `www.eneplus.rs`:

1. Add a CNAME file to the root of your repository:
   ```bash
   echo "www.eneplus.rs" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. In GitHub Settings → Pages, add your custom domain
3. Configure DNS with your domain provider:
   - Add CNAME record: `www` → `YOUR_USERNAME.github.io`
   - Add A records for apex domain to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

## Configuration Updates

### Update Site URL

Edit `_config.yml`:
```yaml
url: "https://YOUR_USERNAME.github.io/eneplus"
# or for custom domain:
url: "https://www.eneplus.rs"
```

### Contact Form Setup

The contact form needs a backend service. Choose one:

#### Option 1: Netlify Forms (Recommended if hosting on Netlify)
```html
<form name="contact" method="POST" data-netlify="true">
```

#### Option 2: Formspree (GitHub Pages compatible)
1. Sign up at [Formspree](https://formspree.io)
2. Update form action in `kontakt.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### Option 3: EmailJS (Client-side)
1. Sign up at [EmailJS](https://www.emailjs.com)
2. Add EmailJS script and configuration to contact page

### Google Analytics (Optional)

Add to `_config.yml`:
```yaml
google_analytics: GA_MEASUREMENT_ID
```

## Production Optimizations

### 1. Image Optimization

Add optimized images to `assets/images/`:
- `hero-image.jpg` (1200x800px, optimized)
- `about-image.jpg` (800x600px, optimized)
- `favicon.ico` (32x32px)
- Team photos in `assets/images/team/`
- PWA icons (72x72 to 512x512px)

### 2. SEO Enhancements

Update `_config.yml` with real information:
```yaml
title: "ENEPLUS - Energetska efikasnost i menadžment"
description: "Your actual company description"
url: "https://www.eneplus.rs"
```

### 3. Performance

The website is already optimized with:
- ✅ Minified CSS in production
- ✅ Responsive images
- ✅ Lazy loading
- ✅ Service worker for offline functionality
- ✅ Critical CSS inlined

## Security Considerations

### 1. HTTPS

GitHub Pages provides HTTPS automatically. For custom domains:
- Enable "Enforce HTTPS" in GitHub Pages settings
- Ensure your DNS provider supports HTTPS

### 2. Content Security Policy

Add CSP headers via `_headers` file (for Netlify) or configure at server level.

### 3. Contact Form Security

- Use CSRF protection
- Implement rate limiting
- Validate all inputs server-side
- Use CAPTCHA for spam protection

## Monitoring & Analytics

### 1. Google Search Console

1. Add your website to [Google Search Console](https://search.google.com/search-console)
2. Submit sitemap: `https://your-domain.com/sitemap.xml`
3. Monitor crawl errors and search performance

### 2. Performance Monitoring

Use tools like:
- Google PageSpeed Insights
- GTmetrix
- Lighthouse (built into Chrome DevTools)

### 3. Uptime Monitoring

Set up monitoring with services like:
- UptimeRobot
- Pingdom
- StatusCake

## Maintenance

### Regular Updates

1. Keep Jekyll and gems updated:
   ```bash
   bundle update
   ```

2. Monitor for security vulnerabilities:
   ```bash
   bundle audit
   ```

3. Update content regularly
4. Check broken links periodically
5. Review and update contact information

### Backup Strategy

- GitHub serves as primary backup
- Export important data regularly
- Document any custom configurations

## Troubleshooting

### Common Issues

#### Build Failures
Check GitHub Actions tab for build errors. Common causes:
- Syntax errors in YAML frontmatter
- Missing dependencies in Gemfile
- Incorrect liquid template syntax

#### Images Not Loading
- Check file paths are correct
- Ensure images are committed to repository
- Verify image file sizes aren't too large

#### Contact Form Not Working
- Verify form action URL
- Check for JavaScript errors in browser console
- Ensure form service is properly configured

#### CSS/JS Not Loading
- Clear browser cache
- Check file paths in `_includes` and `_layouts`
- Verify Jekyll build completed successfully

### Getting Help

1. Check Jekyll documentation: https://jekyllrb.com/docs/
2. GitHub Pages documentation: https://docs.github.com/en/pages
3. Contact the development team for custom issues

## Post-Deployment Checklist

- [ ] Website loads correctly on desktop and mobile
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Images display properly
- [ ] Site appears in search results (may take time)
- [ ] Analytics tracking works (if configured)
- [ ] HTTPS certificate is valid
- [ ] 404 page displays correctly
- [ ] Sitemap is accessible at /sitemap.xml
- [ ] robots.txt is accessible
- [ ] PWA features work (offline page, installability)

## Support

For technical support regarding this deployment:
- Check the README.md for general information
- Review GitHub Issues for known problems
- Contact the development team

---

**Last Updated:** December 2024
**Version:** 1.0.0