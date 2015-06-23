module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
    // configurable paths
    var config = {
        app: 'app',
        dist: 'build'
    };

     grunt.initConfig({
        projConfig : config,
        requirejs : {
            compile: {
                options: {
                  baseUrl: "<%= projConfig.app %>",
                  mainConfigFile: "<%= projConfig.app %>/main.js",
                  name: "main", // assumes a production build using almond
                  out: "<%= projConfig.dist %>/optimized.js"
                }
              }
        },
        cssmin: {
         target: {
             files: [{
               expand: true,
               cwd: './resources/css',
               src: ['*.css', '!*.min.css'],
               dest: './resources/css',
               ext: '.min.css'
             }]
           }
        },
        connect: {
            server: {
              options: {
                port: 8080,
                target: 'http:/localhost:8080/',
                base: 'almlite',
                livereload : LIVERELOAD_PORT,
                keepalive : true,
                middleware: function(connect, options, middlewares) {

                    middlewares.unshift(function(req, res, next) {
                        res.setHeader('Access-Control-Allow-Credentials', true);
                        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                        next();
                    });

                    return middlewares;
                }/*,
                middleware:  function(connect, options, middlewares) {

                                middlewares.unshift(function(req, res, next) {
                                    res.setHeader('Access-Control-Allow-Credentials', true);
                                    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                                    next();
                                });

                                return middlewares;
                            }*/
              }
            },
            livereload: {
                            options: {
                                middleware: function (connect) {
                                    return [
                                        lrSnippet,
                                       // mountFolder(connect, '.tmp'),
                                        mountFolder(connect, config.app)
                                    ];
                                }
                            }
                        }
          }
      });

/*
var connect = require('connect');
        grunt.registerTask('connect', 'Start a custom static web server.', function() {
          grunt.log.writeln('Starting static web server in "www-root" on port 9001.');
          connect(connect.static('/app')).listen(9001);
        });
*/

      grunt.registerTask('build',[/*'cssmin','requirejs',*/'connect']);
      grunt.registerTask('default',['build']);
 };
