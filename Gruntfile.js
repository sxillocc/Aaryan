module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          name: false,
          rename: false,
          sizes: [{
            name: '',
            width: '850px',
            suffix: '_l',
            quality: 50
          },
          {
            name: '',
            width: '350px',
            suffix: '_m',
            quality: 50
          }
        ]
        },
        files: [{
          expand: true,
          src: ['*.jpg'],
          cwd: './buffer/x',
          dest: './buffer'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};