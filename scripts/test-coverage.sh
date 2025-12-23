#!/bin/bash

# Script para executar testes com cobertura e abrir relatório

echo "🧪 Executando testes com cobertura..."
npm run test:coverage

echo "📊 Abrindo relatório de cobertura..."
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
    echo "Relatório de cobertura disponível em: coverage/index.html"
fi