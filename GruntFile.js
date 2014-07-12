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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('compress', ['uglify']);
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('travis', ['check', 'compress', 'test']);
    grunt.registerTask('default', 'travis');

};
