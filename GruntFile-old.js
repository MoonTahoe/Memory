module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jasmine: {
            src: ["public/js/*.js", "!public/js/main.js"],
            options: {
                specs: "public/test/*-spec.js"
            }
        },
        mochacli: {
            options: {
                reporter: "nyan",
                ui: "tdd"
            },
            all: ["test/*-spec.js"]
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'client/js/<%= pkg.name %>.min.js': ['client-source/js/*.js']
                }
            }
        },
        jshint: {
            all: [
                "Gruntfile.js",
                "public/js/*.js",
                "public/test/*.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.registerTask("test", ["mochacli", "jasmine"]);
    grunt.registerTask("default", ["test"]);

};