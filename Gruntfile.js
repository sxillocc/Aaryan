module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
              name: 'x',
              width: '20px',
              suffix: 'small',
              quality: 100
            },
          ]
        },
        files: [{
          expand: true,
          src: ['*.{png,jpg}'],
          cwd: './images',
          dest: './modified_images'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};