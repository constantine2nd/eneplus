source "https://rubygems.org"

# Core Jekyll
gem "jekyll", "~> 3.9.0"

# Essential plugins
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-seo-tag", "~> 2.6"

# Required parsers and converters
gem "kramdown-parser-gfm", "~> 1.1"
gem "kramdown", "~> 2.3"

# Theme
gem "minima", "~> 2.5"

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb gem to v0.6.x on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Development dependencies
group :development do
  gem "webrick", "~> 1.7"
end
