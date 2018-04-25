/*!
 * dyScrollUpJS is a JavaScript plugin to create a button to scroll back
 * to the top of the page.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyScrollUpJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2015-03-21 Saturday
 */
module.exports = function(grunt) {

    // project configurations
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssmin : {
            target : {
                src : ["src/css/dyscrollup.css"],
                dest : "dist/css/dyscrollup.min.css"
            }
        },

        uglify: {
            distVersion: {
                options : {
                    banner : "/* dyScrollUpJS v<%= pkg.version %> | Yusuf Shakeel | https://github.com/yusufshakeel/dyScrollUpJS | MIT license Copyright (c) 2016 Yusuf Shakeel | Build: <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> */",
                    mangle: true
                },
                files: {
                    'dist/js/dyscrollup.min.js': [
                        'src/js/dyscrollup.js'
                    ]
                }
            }
        }

    });

    // load plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // create default task
    grunt.registerTask("default", ["cssmin", "uglify:distVersion"]);

};