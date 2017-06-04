/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	var root = grunt.option('root') || '.';

	if (!Array.isArray(root)) root = [root];

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2017 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		sass: {
			'css/djs.css': 'css/src/djs.scss'
		},

		pug: {
			compile: {
				files: {
					'index.html': ['slides.pug']
				}
			}
		},

		connect: {
			server: {
				options: {
					port: port,
					base: root,
					livereload: true,
					open: true
				}
			},

		},

		watch: {
			theme: {
				files: [
					'css/src/*.sass',
					'css/src/*.scss',
				],
				tasks: 'css'
			},
			slides: {
				files: [
					'*.pug',
				],
				tasks: 'pug:compile'
			},
			html: {
				files: root.map(path => path + '/*.html')
			},
			js: {
				files: root.map(path => path + '/js/*.js')
			},
			markdown: {
				files: root.map(path => path + '/*.md')
			},
			options: {
				livereload: true
			}
		},

	});

	// Dependencies
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-sass');

	// Default task
	grunt.registerTask('default', ['css', 'html']);

	// Theme CSS
	grunt.registerTask('css', ['sass']);

	// Slideshow HTML
	grunt.registerTask('html', ['pug:compile']);

	// Serve presentation locally
	grunt.registerTask('serve', ['connect', 'watch']);

};
