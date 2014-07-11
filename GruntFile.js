module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'client/js/memory-card-game.min.js': ['client-source/js/*.js'],
                    'client/js/memory-card-game-spec.min.js': ['client-source/js/*.js', '!client-source/js/main.js', 'client-source/test/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);

};
