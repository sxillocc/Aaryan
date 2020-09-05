module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
              name: 'l',
              width: '400px',
              suffix: '-400',
              quality: 50
            },
            {
              name: 'm',
              width: '600px',
              suffix: '-600',
              quality: 50
            },
          ]
        },
        files: [{
          expand: true,
          src: ['**.{jpeg,jpg}'],
          cwd: './images',
          dest: './modified_images'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};