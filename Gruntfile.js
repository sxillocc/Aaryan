module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          name: false,
          rename: false,
          sizes: [{
            name: 's',
            width: '600px',
            suffix: '_w600',
            quality: 70
          },
          {
            name: 'xs',
            width: '400px',
            suffix: '_w400',
            quality: 70
          },
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