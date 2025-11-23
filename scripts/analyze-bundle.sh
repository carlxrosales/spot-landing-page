#!/bin/bash

# Bundle Analysis Script
# Run this to analyze your Next.js bundle size

echo "🔍 Starting bundle analysis..."
echo ""

# Check if ANALYZE is set
if [ "$ANALYZE" != "true" ]; then
  echo "⚠️  Setting ANALYZE=true for this run..."
  export ANALYZE=true
fi

# Build with analyzer
echo "📦 Building application with bundle analyzer..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "📊 Bundle analysis reports generated in:"
echo "   - .next/analyze/client.html"
echo "   - .next/analyze/server.html"
echo ""
echo "🌐 Opening reports in browser..."
echo ""

# Try to open the reports (works on macOS and Linux with xdg-open)
if command -v open &> /dev/null; then
  open .next/analyze/client.html 2>/dev/null || true
elif command -v xdg-open &> /dev/null; then
  xdg-open .next/analyze/client.html 2>/dev/null || true
fi

echo "💡 Tips for interpreting results:"
echo "   1. Look for large chunks (especially mapbox-*.js)"
echo "   2. Check for duplicate dependencies"
echo "   3. Identify opportunities for code splitting"
echo "   4. Review vendor chunks for optimization"
echo ""

