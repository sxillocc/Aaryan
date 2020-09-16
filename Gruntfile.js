module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          name: false,
          rename: false,
          sizes: [{
              name: 'm',
              width: '1280px',
              suffix: '',
              quality: 50
            },
          ]
        },
        files: [{
          expand: true,
          src: ['*.{png,jpg}'],
          cwd: './assets',
          dest: './buffer'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};