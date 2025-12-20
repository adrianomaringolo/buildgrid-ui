#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Script para copiar o CHANGELOG.md da raiz do projeto para website/static/
 * Executa automaticamente antes do build do Docusaurus
 */

const rootDir = path.resolve(__dirname, '../..')
const websiteDir = path.resolve(__dirname, '..')

const sourceFile = path.join(rootDir, 'CHANGELOG.md')
const targetFile = path.join(websiteDir, 'static', 'CHANGELOG.md')

function copyChangelog() {
	try {
		// Verificar se o arquivo fonte existe
		if (!fs.existsSync(sourceFile)) {
			console.error('❌ CHANGELOG.md não encontrado na raiz do projeto:', sourceFile)
			process.exit(1)
		}

		// Criar diretório static se não existir
		const staticDir = path.dirname(targetFile)
		if (!fs.existsSync(staticDir)) {
			fs.mkdirSync(staticDir, { recursive: true })
			console.log('📁 Diretório static criado:', staticDir)
		}

		// Copiar o arquivo
		fs.copyFileSync(sourceFile, targetFile)

		// Verificar se a cópia foi bem-sucedida
		const sourceStats = fs.statSync(sourceFile)
		const targetStats = fs.statSync(targetFile)

		if (sourceStats.size === targetStats.size) {
			console.log('✅ CHANGELOG.md copiado com sucesso!')
			console.log(`   Fonte: ${sourceFile}`)
			console.log(`   Destino: ${targetFile}`)
			console.log(`   Tamanho: ${sourceStats.size} bytes`)
		} else {
			console.error('❌ Erro na cópia: tamanhos diferentes')
			process.exit(1)
		}
	} catch (error) {
		console.error('❌ Erro ao copiar CHANGELOG.md:', error.message)
		process.exit(1)
	}
}

// Executar apenas se chamado diretamente
if (require.main === module) {
	console.log('🔄 Copiando CHANGELOG.md...')
	copyChangelog()
}

module.exports = { copyChangelog }
