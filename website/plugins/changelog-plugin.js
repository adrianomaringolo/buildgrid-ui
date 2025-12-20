const { copyChangelog } = require('../scripts/copy-changelog')

/**
 * Plugin do Docusaurus para copiar automaticamente o CHANGELOG.md
 * Executa durante o processo de build do Docusaurus
 */
module.exports = function changelogPlugin(context, options) {
	return {
		name: 'changelog-plugin',

		async loadContent() {
			// Copiar o changelog antes de carregar o conteúdo
			try {
				copyChangelog()
			} catch (error) {
				console.error('Erro no plugin changelog:', error)
			}
		},

		configureWebpack(config, isServer, utils) {
			// Não precisamos modificar a configuração do webpack
			return {}
		},
	}
}
