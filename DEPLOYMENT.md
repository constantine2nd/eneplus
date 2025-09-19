# ENEPLUS Website Deployment Guide

## Overview

This document provides step-by-step instructions for deploying the ENEPLUS Jekyll website to GitHub Pages and configuring it for production use. The deployment uses Docker Jekyll for consistent builds between local development and CI/CD.

## Prerequisites

- GitHub account
- Git installed locally
- Docker (for local development and consistent builds)

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
3. Under **Source**, select **GitHub Actions**
4. The Docker-based workflow (`.github/workflows/jekyll.yml`) will automatically build and deploy your site

The website will be available at: `https://YOUR_USERNAME.github.io/eneplus`

## Local Development with Docker

### Using the Development Script

A Docker development script is provided for easy local testing:

```bash
# Start development server (with live reload)
./docker-dev.sh serve

# Build the site
./docker-dev.sh build

# Test build (same as CI/CD)
./docker-dev.sh test

# Install/update gems
./docker-dev.sh install

# Clean build files
./docker-dev.sh clean

# Get help
./docker-dev.sh help
```

### Manual Docker Commands

If you prefer manual Docker commands:

```bash
# Development server
docker run --rm -v $PWD:/srv/jekyll -v $PWD/vendor/bundle:/usr/local/bundle -p 4000:4000 jekyll/jekyll:3.9 jekyll serve --host 0.0.0.0 --livereload

# Build site
docker run --rm -v $PWD:/srv/jekyll -v $PWD/vendor/bundle:/usr/local/bundle jekyll/jekyll:3.9 jekyll build --trace

# Install gems
docker run --rm -v $PWD:/srv/jekyll -v $PWD/vendor/bundle:/usr/local/bundle jekyll/jekyll:3.9 bundle install
```

The development server will be available at `http://localhost:4000`

## Docker-based CI/CD Pipeline

The website uses a Docker-based GitHub Actions workflow for consistent builds:

### Workflow Features

- **Consistent Environment**: Same Jekyll Docker image (`jekyll/jekyll:3.9`) used locally and in CI/CD
- **Dependency Caching**: Ruby gems cached in `vendor/bundle` volume
- **Automatic Deployment**: Builds and deploys on every push to `main` branch
- **Build Tracing**: `--trace` flag enabled for better debugging

### Workflow Configuration

The workflow is defined in `.github/workflows/jekyll.yml`:

1. **Build Job**: Uses Docker to build the Jekyll site
2. **Deploy Job**: Deploys the built site to GitHub Pages
3. **Permissions**: Configured for GitHub Pages deployment

### Manual Workflow Trigger

You can manually trigger the workflow from the GitHub Actions tab if needed.

## Custom Domain Setup (Optional)

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
   # Using Docker
   ./docker-dev.sh update
   
   # Or manually
   docker run --rm -v $PWD:/srv/jekyll -v $PWD/vendor/bundle:/usr/local/bundle jekyll/jekyll:3.9 bundle update
   ```

2. Monitor for security vulnerabilities:
   ```bash
   # Using Docker
   docker run --rm -v $PWD:/srv/jekyll -v $PWD/vendor/bundle:/usr/local/bundle jekyll/jekyll:3.9 bundle audit
   ```

3. Update content regularly
4. Check broken links periodically
5. Review and update contact information

### Docker Maintenance

1. Periodically clean Docker volumes:
   ```bash
   ./docker-dev.sh clean --docker
   ```

2. Update Docker image:
   ```bash
   docker pull jekyll/jekyll:3.9
   ```

### Backup Strategy

- GitHub serves as primary backup
- Export important data regularly
- Document any custom configurations

## Troubleshooting

### Common Issues

#### Build Failures
Check GitHub Actions tab for build errors. With Docker builds, common causes:
- Syntax errors in YAML frontmatter
- Missing dependencies in Gemfile
- Incorrect liquid template syntax
- Docker image version mismatch
- Volume mount permission issues

#### Local Development Issues
- **Port 4000 in use**: Stop other Jekyll processes or use different port
- **Docker permission issues**: Ensure Docker is running and accessible
- **Gem installation fails**: Clear vendor/bundle and reinstall

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
- [ ] GitHub Actions workflow completes successfully
- [ ] Docker build works locally with `./docker-dev.sh test`

## Docker Development Quick Reference

```bash
# Essential commands
./docker-dev.sh serve    # Start dev server (http://localhost:4000)
./docker-dev.sh build    # Build site
./docker-dev.sh test     # Test build (CI/CD simulation)
./docker-dev.sh clean    # Clean build files

# Site will be built to _site/ directory
# Gems cached in vendor/bundle/ directory
# Docker image: jekyll/jekyll:3.9
```

## Support

For technical support regarding this deployment:
- Check the README.md for general information
- Review GitHub Issues for known problems
- Contact the development team

---

**Last Updated:** December 2024
**Version:** 1.0.0