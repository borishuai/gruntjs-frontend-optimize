# GruntJS with CDN Example

GruntJS进行前端自动化处理。主要有图片的压缩，JS和CSS的合并、压缩，对所有静态文件的文件根据其内容加上hash，然后把CSS、HTML等文件中对所有的静态文件名替换成加上hash的新文件名。对所有的静态内容的路径上加上CDN的URL，最后将所有的静态文件上传到七牛CDN上去。最篮球的mobile版本是一个基于NodeJS项目，实现了整个过程。这个例子没有使用RequireJS，如果需要使用RequireJS，请看[Grunt with RequireJS](http://git.augmentum.com.cn/frontend/gruntjs-with-requirejs/tree/master)。下面详细讲解每个步骤。

## 图片压缩
许多图片尤其是png图片有时候含有大量无意义的填充，增加图片的大小。我们可以通过contrib-imagemin对所有的图片进行压缩优化，从而减小图片的大小。根据我们使用经验来看，一般可以压缩5％到10％左右。

## JS和CSS的文件的合并压缩
合并JS和CSS可以大量的减少HTTP请求，达到优化前端性能的目的。同时CSS和JS文件是静态文件，可以压缩到非常小的大小。GruntJS官方提供了contrib-concat, contrib-cssmin, contrib-uglify等对应的插件来做对应的事情。我们这里因为要文件名的替换，使用了usemin插件，它会自动调用上述几个插件的，所以在我们的Gruntfile.js里并没有这3个插件的配置信息，而只是在task列表里调用了这几个插件。具体请参考：https://github.com/yeoman/grunt-usemin。

## 静态文件缓存处理
为了最大程度的提高浏览器的加载速度，最好的方法是让浏览器将所有的静态文件都缓存在客户端，这里的缓存是指expire和cache-control的max-age，而不是Last-Modified，因为使用Last-Modified 和 If-Modified-Since还是会发出请求的，只是没有更新就返回304状态码而max-age则是不会发出请求的，而是直接使用本地的缓存。使用缓存的面临的一个比较在的问题是如果文件有更新如果清理缓存或者如果让用户下载最新的文件。一种做法是静态文件加上版本号，例如 style.css?v=1.1。这种做法可以达到清除缓存的目的，但是维护起来相对麻烦，比较版本号没有办法怎么化，没有办法判断文件是否有更新。另外一种做法是对文件内容进行hash，然后将hash值加入到文件名中，例如style.abd1q2.css。这样就很容易进行自动化处理，我们这里使用了yeoman开发的filerev插件。它可以和usemin进行完美的配合。

## Hash处理后文件名的替换
对CSS和JS进行压缩合并以及对所有静态资源进行filerev处理后，原来HTML、CSS、JS等静态资源的引用文件名就需要替换成新的文件名了。例如HTML中对CSS和JS的引用，CSS中对图片的引用。我们使用了Yeoman开发的usemin进行替换。它的工作原理是，对需要处理的文件中的静态资源，在指定的文件夹中查找经过filerev处理过的对应文件，如果找到则替换成相应的文件。具体请参考：https://github.com/yeoman/grunt-usemin。

## CDN路径的替换
开发过程中对所有静态资源的引用都是指向项目自己的domain。如果要使用CDN，则需要将所有静态资源的引用Domain指向CDN的domain。这里使用GruntJS插件cdn来进行全局替换。

## 上传静态资源到CDN
当以上步骤完成后就可以将所有的静态文件上传到CDN了。七牛官方提供了NodeJS的SDK,但是貌似比较难用。我们例子里使用了第三方开发的NodeJS模块qn，非常简单，详见： https://github.com/node-modules/qn。我的做法是将图片和CSS／JS所在的目录分别遍历上传，对图片和CSS／JS分别加上不同的前缀。因为七牛是不提供在里面建文件夹的。详见cdn.js文件。

## 用法
1. grunt build
2. grunt upload

我本来是想将2个步骤合成一个步骤执行的，但是貌似因为执行cdn上传是用的异步操作，导致合并失败。
