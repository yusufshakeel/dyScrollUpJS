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
                src : ["css/dyscrollup.css"],
                dest : "css/dyscrollup.min.css"
            }
        },

        uglify: {
            distVersion: {
                options : {
                    banner : "/*!\n" +
                    " * dyScrollUpJS is a JavaScript plugin to create a button to scroll back\n" +
                    " * to the top of the page.\n" +
                    " *\n" +
                    " * Author: Yusuf Shakeel\n" +
                    " * https://github.com/yusufshakeel\n" +
                    " *\n" +
                    " * GitHub Link: https://github.com/yusufshakeel/dyScrollUpJS\n" +
                    " *\n" +
                    " * MIT license\n" +
                    " * Copyright (c) 2016 Yusuf Shakeel\n" +
                    " *\n" +
                    " * Date: 2015-03-21 Saturday\n" +
                    " * Build: <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> \n" +
                    " */",
                    mangle: true
                },
                files: {
                    'js/dyscrollup.min.js': [
                        'js/dyscrollup.js'
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