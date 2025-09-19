#!/bin/bash

# Docker Development Script for Jekyll
# This script runs Jekyll in Docker with the same configuration as CI/CD

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not in PATH"
    exit 1
fi

if ! docker info &> /dev/null; then
    print_error "Docker is not running"
    exit 1
fi

# Default command
COMMAND="${1:-serve}"

# Docker image
DOCKER_IMAGE="jekyll/jekyll:4"

# Common Docker run options
DOCKER_OPTS=(
    --rm
    -v "$PWD:/srv/jekyll"
    -v "$PWD/vendor/bundle:/usr/local/bundle"
)

# Base URL and environment for CI/CD parity
BASEURL="/eneplus"
JEKYLL_ENV="development"

case "$COMMAND" in
    "serve"|"s")
        print_info "Starting Jekyll development server..."
        print_info "Site will be available at http://localhost:4000"
        print_info "Press Ctrl+C to stop"

        docker run \
            "${DOCKER_OPTS[@]}" \
            -p 4000:4000 \
            -it \
            "$DOCKER_IMAGE" \
            jekyll serve --host 0.0.0.0 --livereload --incremental --baseurl "$BASEURL" --trace
        ;;

    "build"|"b")
        print_info "Building Jekyll site..."

        docker run \
            -e JEKYLL_ENV="$JEKYLL_ENV" \
            "${DOCKER_OPTS[@]}" \
            "$DOCKER_IMAGE" \
            jekyll build --baseurl "$BASEURL" --trace

        if [ -d "_site" ]; then
            print_info "Build completed successfully! Site is in _site/ directory"
        else
            print_error "Build failed - no _site directory found"
            exit 1
        fi
        ;;

    "clean"|"c")
        print_info "Cleaning Jekyll cache and build files..."

        # Remove Jekyll generated files
        rm -rf _site .sass-cache .jekyll-cache .jekyll-metadata

        # Clean Docker volumes (optional)
        if [ "$2" = "--docker" ]; then
            print_info "Cleaning Docker volumes..."
            rm -rf vendor/bundle
        fi

        print_info "Clean completed"
        ;;

    "install"|"i")
        print_info "Installing/updating gems..."

        docker run \
            "${DOCKER_OPTS[@]}" \
            "$DOCKER_IMAGE" \
            bundle install

        print_info "Gems installed successfully"
        ;;

    "shell"|"sh")
        print_info "Starting interactive shell in Jekyll container..."

        docker run \
            "${DOCKER_OPTS[@]}" \
            -it \
            "$DOCKER_IMAGE" \
            /bin/bash
        ;;

    "update"|"u")
        print_info "Updating gems..."

        docker run \
            "${DOCKER_OPTS[@]}" \
            "$DOCKER_IMAGE" \
            bundle update

        print_info "Gems updated successfully"
        ;;

    "test"|"t")
        print_info "Testing Jekyll build (same as CI/CD)..."

        # Clean first
        rm -rf _site

        # Build with same parameters as CI/CD
        docker run \
            -e JEKYLL_ENV="$JEKYLL_ENV" \
            "${DOCKER_OPTS[@]}" \
            "$DOCKER_IMAGE" \
            jekyll build --baseurl "$BASEURL" --trace

        if [ -d "_site" ] && [ "$(ls -A _site)" ]; then
            print_info "✅ Test build successful - site would deploy correctly"
        else
            print_error "❌ Test build failed - check for errors above"
            exit 1
        fi
        ;;

    "help"|"h"|*)
        echo "Jekyll Docker Development Helper"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  serve, s      Start development server with live reload (default)"
        echo "  build, b      Build the site (matches GitHub Pages CI/CD)"
        echo "  clean, c      Clean build files and cache"
        echo "                Add --docker to also clean Docker volumes"
        echo "  install, i    Install/update gems"
        echo "  shell, sh     Start interactive shell in container"
        echo "  update, u     Update all gems"
        echo "  test, t       Test build like CI/CD pipeline"
        echo "  help, h       Show this help"
        echo ""
        echo "Examples:"
        echo "  $0 serve              # Start development server"
        echo "  $0 build              # Build site exactly like GitHub Pages"
        echo "  $0 clean --docker     # Clean everything including Docker volumes"
        echo "  $0 test               # Test build like CI/CD"
        echo ""
        echo "The development server will be available at:"
        echo "  http://localhost:4000"
        echo ""
        echo "Docker image used: $DOCKER_IMAGE"
        ;;
esac
