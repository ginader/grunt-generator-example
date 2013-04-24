/*global module:false*/

function getHandlebarsHelpers(gruntConfig){
  return {
    'uppercase': function(options) {
      return options.fn(this).toUpperCase();
    },
    'versionnumber' : function(options) {
      return gruntConfig.meta.version;
    }
  };
}
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  var config = {
    meta: {
      version: '0.0.1',
      banner: '/*! Copyright (c) Charles Lavery */'
    },
    watch: {
      site: {
        files: ['templates/**/*', 'pages/**/*'],
        tasks: 'generator:build'
      }
    },
    connect: {
      dev: {
        options: {
          port: 8000,
          base: 'build/'
        }
      }
    }
  };
  config.generator = {
    dev: {
      files: [
        { cwd: 'pages', src: ['**/*'], dest: 'build', ext: '.html' }
      ],
      options: {
        templates: 'templates',
        development: true,
        handlebarsHelpers: getHandlebarsHelpers(config)
      }
    },
    prod: {
      options: {
        templates: 'templates',
        development: false,
        handlebarsHelpers: getHandlebarsHelpers(config)
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-generator' );

  grunt.registerTask('default', ['connect', 'generator:dev', 'watch']);
  grunt.registerTask('build', ['generator:prod']);
};
