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
            suffix: '_50w400',
            quality: 50
          },
          {
            name: '',
            width: '650px',
            suffix: '_50w650',
            quality: 50
          },
          {
            name: '',
            width: '840px',
            suffix: '_50w840',
            quality: 50
          }
        ]
        },
        files: [{
          expand: true,
          src: ['kids.jpg'],
          cwd: './buffer',
          dest: './'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('default', ['responsive_images']);

};