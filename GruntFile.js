module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'production-client/js/assets.min.js': ['development-client/js/*.js', '!development-client/js/main.js'],
                    'production-client/js/main.min.js': ['development-client/js/main.js'],
                    'production-client/js/spec.min.js': ['development-client/test/*.js']
                }
            }
        },
        jshint: {
            all: [
                "Gruntfile.js",
                "development-client/js/*.js",
                "development-client/test/*.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        jasmine: {
            src: "production-client/js/assets.min.js",
            options: {
                specs: "production-client/js/spec.min.js"
            }
        },
        less: {
            production: {
                options: {
                    paths: ["development-client/css"],
                    cleancss: true
                    /*
                    , modifyVars: {
                        imgPath: '"http://memory-card-game.herokuapp.com/img"',
                        bgColor: '$000066'
                    }
                    */
                },
                files: {
                    "production-client/css/style.css": "development-client/css/style.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('compress', ['uglify', 'less']);
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('travis', ['check', 'compress', 'test']);
    grunt.registerTask('default', 'travis');

};
