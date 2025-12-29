#!/bin/bash

# Script to run tests with coverage and open report

echo "🧪 Running tests with coverage..."
npm run test:coverage

echo "📊 Opening coverage report..."
if command -v open &> /dev/null; then
    # macOS
    open coverage/index.html
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open coverage/index.html
elif command -v start &> /dev/null; then
    # Windows
    start coverage/index.html
else
    echo "Coverage report available at: coverage/index.html"
fi