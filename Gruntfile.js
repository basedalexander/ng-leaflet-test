module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('tdd', [
    'eslint',
    'karma',
    'watch'
  ]);

  grunt.registerTask('serve', ['connect']);

  grunt.initConfig({
    srcFiles: {
      js: 'src/app/**/*.js',
      spec: 'test/unit/**/*.spec.js'
    },

    eslint: {
      options: {
          config: '.eslintrc.js',
          reset: true
      },
      target: [
      '<%= srcFiles.js %>',
      '<%= srcFiles.spec %>'
      ]
    },

    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          singleRun: false,
          autoWatch: true,
          browsers: ['PhantomJS'],
          files: [
            'vendor/angular/angular.min.js',
            'node_modules/leaflet/dist/leaflet.js',
            'node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.js',
            'vendor/angular-mocks/angular-mocks.js',
            '<%= srcFiles.js %>',
            '<%= srcFiles.spec %>'
          ]
        }
      }
    },

    watch: {
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true
        }
      },
      all: {
        files: [
          '<%= srcFiles.js %>',
          '<%= srcFiles.spec %>'
        ],
        tasks: ['eslint', 'karma']
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.',
          keepalive: true
        }
      }
    }
  });
}
