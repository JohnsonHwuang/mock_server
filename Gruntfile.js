'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    mock: {
        options:{
          host: require('ip').address(),
          port:'9040'
        },
        apis: {
            options: {
              debug: true
            },
            cwd: 'api',
            src: ['*.json']
        }
      }
  });
};
