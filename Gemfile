source "https://rubygems.org"

# Core Jekyll for GitHub Pages compatibility
gem "jekyll", "~> 3.9.5"

# Jekyll plugins
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-seo-tag", "~> 2.6"

# Theme compatible with GitHub Pages
gem "minima", "~> 2.1"

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# HTTP parser gem for JRuby
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Development dependencies
group :development do
  gem "webrick", "~> 1.7"
end
