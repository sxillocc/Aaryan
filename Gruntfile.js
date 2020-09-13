module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          name: false,
          rename: false,
          sizes: [{
              width: '640px',
              suffix: '',
              quality: 20
            },
          ]
        },
        files: [{
          expand: true,
          src: ['*.{png,jpg}'],
          cwd: './images',
          dest: './new-images'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};