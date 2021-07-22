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
            width: '1080px',
            suffix: '_m',
            quality: 50
          }
        ]
        },
        files: [{
          expand: true,
          src: ['*.jpeg'],
          cwd: './buffer/x',
          dest: './buffer'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};