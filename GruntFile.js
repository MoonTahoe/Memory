module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'production-client/js/memory-card-game.min.js': ['development-client/js/*.js'],
                    'production-client/js/memory-card-game-spec.min.js': ['development-client/js/*.js', '!development-client/js/main.js', 'development-client/test/*.js']
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('compress', ['uglify']);
    grunt.registerTask('travis', ['check', 'compress']);
    grunt.registerTask('default', 'travis');

};
