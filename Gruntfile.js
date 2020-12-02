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
            width: '400px',
            suffix: '_w400',
            quality: 50
          },
          {
            name: '',
            width: '650px',
            suffix: '_w650',
            quality: 50
          },
          {
            name: '',
            width: '840px',
            suffix: '_w840',
            quality: 50
          }
        ]
        },
        files: [{
          expand: true,
          src: ['*.{png,jpg}'],
          cwd: './original-images',
          dest: './buffer'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};