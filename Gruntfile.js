module.exports = function(grunt){
    
    var setting = require('./setting');
    // 项目配置
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: ["build"], //清理空间，为build作准备
      useminPrepare: {
        html: ['build/index.html'],  //要处理的文件，我是将原始文件复制到build/index.html的，千万不要对原始文件直接作处理。
        options: {
          dest: "build/"  //build的文件夹
        }
      },
      usemin: { 
        html: ['build/*.html'], //将HTML中的静态资源进行文件名替换
        css: ['build/static/*.css'],//将CSS中的静态资源进行文件名替换，如果需要替换JS，可以在下面加一条。
        options: {
           assetsDirs: ['build', 'build/images', 'static', 'images'],//告诉usemin去哪里找filerev处理过的静态文件
        }
      },
      copy: {
        build: {
          files: [
            {
              expand: true,
              cwd: 'html',
              src: '**',
              dest: 'build/',
              flatten: true,
              filter: 'isFile'
            },
            {
             expand: true,
              cwd: 'static/css',
              src: '**',
              dest: 'build/css',
              flatten: true,
              filter: 'isFile'
             },
            {
             expand: true,
              cwd: 'static/js/lib/',
              src: '*',
              dest: 'build/js/lib',
              flatten: true,
              filter: 'isFile'
             },
            {
             expand: true,
              cwd: 'static/js/',
              src: '*',
              dest: 'build/js/',
              flatten: true,
              filter: 'isFile'
             },
            {
              expand: true,
              cwd: 'static/images/',
              src: '**',
              dest: 'build/images/',
              flatten: true,
              filter: 'isFile'
            }
          ]
        },
        release: {
          expand: true, 
          src: ['build/*.html'], 
          dest: 'html/',
          flatten: true,
          filter: 'isFile'
        },
      },
      filerev: {//下面三个都是表示在原文件上直接修改
        css: {
          src: ['build/static/all.css'],
        },
        js: {
          src: ['build/static/all.js'],
        },
        image: {
          src: ['build/images/*'],
        }
      },
      cdn: {
        options: {
          /** @required - root URL of your CDN (may contains sub-paths as shown below) */
          cdn: setting.cdnDomain,
          /** @optional  - if provided both absolute and relative paths will be converted */
          flatten: true,
          /** @optional  - if provided will be added to the default supporting types */
          //ejs is nodejs template, if you don't ejs, just ignore 
          supportedTypes: { 'ejs': 'html' }
        },
        dist: {
          /** @required  - string (or array of) including grunt glob variables */
          src: ['build/*.html', 'build/static/*.css'],
        }
      },
      imagemin: {
        image: {
          options: {
            progressive: true
          },
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'build/images/',          // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'build/images/'          // Destination path prefix
          }]
        }
      }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 默认任务
    grunt.registerTask('build', ['clean', 'copy:build', 'imagemin', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'cdn', 'copy:release']);
    grunt.registerTask('upload', 'Upload files to cdn', function() {
      var done = this.async();
      
      var cdn = require('./cdn');
       
      cdn.upload();
    });
}
