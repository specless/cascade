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
        postcss: {
            options: {
                map: false, // inline sourcemaps
                processors: [
                    require('postcss-focus'),
                    require('autoprefixer')({browsers: 'last 3 versions'}) // add vendor prefixes
                ]
            },
            dist: {
                src: 'dist/*.css'
            }
        },
        express: {
            server: {
                options: {
                    port: 9000,
                    bases: "dist/../",
                    hostname: "localhost",
                    open: encodeURI('http://app.specless.io/preview?height=250&width=300&transition=300&mobile=false&ad=000000#{"components":[{"src":"http://localhost:9000/dist/loader.html"},{"src":"http://localhost:9000/dist/banner.html"},{"src":"http://localhost:9000/dist/panel.html"}],"unfriendlyCreative":true}')
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'postcss'],
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
            },
            inline: {
                files: {
                    'cascade/build/loader-inline.html': 'cascade/templates/loader-inline.kit'
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
        zip: {
            'package': {
                router: function (filepath) {
                  // Route each file to all/{{filename}}
                  // var filename = path.basename(filepath);
                  return 'specless-cascade-creative/' + filepath;
                },
                src: ['dist/*', 'assets/**', 'component_banner/*', 'component_panel/*', 'component_loader/*', 'Gruntfile.js', 'LICENSE', 'package.json', 'cascade/**'],
                dest: 'ingestion/cascade-ad-package.zip'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-zip');
    grunt.registerTask('default', ['express', 'watch']);
    grunt.registerTask('package', ['zip']);
};