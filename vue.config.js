const path = require('path')

module.exports = {
	pages: {
		index: {
			entry: 'test/main.js',
			template: 'test/public/index.html',
			filename: 'index.html'
		}
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('@', path.resolve('src'))
			.set('#', path.resolve('src/utils'))
			.set('@test', path.resolve('test'))
		config.module
			.rule('js')
			.include.add('/packages')
			.end()
			.use('babel')
			.loader('babel-loader')
	},
	configureWebpack: {
		output: {
			libraryExport: 'default'
		}
	},
	css: {
		extract: false
	}
}
