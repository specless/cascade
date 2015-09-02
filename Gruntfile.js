module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'dist/banner.css': 'component_banner/index.scss',
					'dist/panel.css': 'component_panel/index.scss',
					'dist/loader.css': 'component_loader/index.scss'
				}
			}
		},
		express: {
			server: {
				options: {
					port: 9000,
					bases: "dist/../",
					hostname: "localhost",
					open: 'http://specless.io/view.html?ad=000000&banSrc=http://<%= express.server.options.hostname %>:<%= express.server.options.port %>/dist/banner.html&panSrc=http://<%= express.server.options.hostname %>:<%= express.server.options.port %>/dist/panel.html&ldrSrc=http://<%= express.server.options.hostname %>:<%= express.server.options.port %>/dist/loader.html'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'autoprefixer:banner', 'autoprefixer:panel', 'autoprefixer:loader'],
				options: {
					livereload: true
				}
			},
			banner: {
				files: 'component_banner/index.html',
				tasks: ['codekit:banner'],
				options: {
					livereload: true
				}
			},
			bannerJs: {
				files: 'component_banner/index.js',
				tasks: ['concat:banner'],
				options: {
					livereload: true
				}
			},
			panel: {
				files: 'component_panel/index.html',
				tasks: ['codekit:panel'],
				options: {
					livereload: true
				}
			},
			panelJs: {
				files: 'component_panel/index.js',
				tasks: ['concat:panel'],
				options: {
					livereload: true
				}
			},
			loader: {
				files: 'component_loader/index.html',
				tasks: ['codekit:loader'],
				options: {
					livereload: true
				}
			},
			loaderJs: {
				files: 'component_loader/index.js',
				tasks: ['concat:loader'],
				options: {
					livereload: true
				}
			},
			kit: {
				files: '**/*.kit',
				tasks: ['codekit'],
				options: {
					livereload: true
				}
			}
		},
		codekit: {
			banner: {
				files: {
					'dist/banner.html': 'cascade/templates/banner.kit'
				}
			},
			panel: {
				files: {
					'dist/panel.html': 'cascade/templates/panel.kit'
				}
			},
			loader: {
				files: {
					'dist/loader.html': 'cascade/templates/loader.kit'
				}
			}
		},

		concat: {
			banner: {
				src: ['cascade/js/_top.js', 'component_banner/index.js', 'cascade/js/_bottom.js'],
				dest: 'dist/banner.js'
			},
			panel: {
				src: ['cascade/js/_top.js', 'component_panel/index.js', 'cascade/js/_bottom.js'],
				dest: 'dist/panel.js'
			},
			loader: {
				src: ['cascade/js/_top.js', 'component_loader/index.js', 'cascade/js/_bottom.js'],
				dest: 'dist/loader.js'
			}
		},
		autoprefixer: {
		    banner: {
		        src: 'dist/banner.css'
		    },
		    panel: {
		        src: 'dist/panel.css'
		    },
		    loader: {
		        src: 'dist/loader.css'
		    }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-codekit');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['express', 'watch']);
};