module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
              name: 'm',
              width: '992px',
              suffix: '_w992',
              quality: 40
            },
            {
              name: 'l',
              width: '1280px',
              suffix: '_w1280',
              quality: 40
            },
          ]
        },
        files: [{
          expand: true,
          src: ['*.{png,jpg}'],
          cwd: './images',
          dest: './modified-images'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};