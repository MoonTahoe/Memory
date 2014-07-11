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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('travis', ['uglify']);
    grunt.registerTask('default', 'travis');

};
