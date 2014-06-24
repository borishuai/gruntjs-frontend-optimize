var qn = require('qn');
var fs = require('fs');
var setting = require('./setting');
var path = require('path');
var buildPath = path.resolve('./build');

var client = qn.create({
  accessKey: setting.accessKey,
  secretKey: setting.secretKey,
  bucket: setting.bucket,
  domain: setting.cdnDomain,
});


exports.upload = function() {
  uploadStatic();
  uploadImages();
};

function uploadStatic() {
  var dir = fs.readdirSync('./build/static');

  dir.forEach(function(filename) {
    uploadFile('static/' + filename);
  });
}

function uploadImages() {
  var dir = fs.readdirSync('./build/images');

  dir.forEach(function(filename) {
    uploadFile('images/' + filename);
  });
}


function uploadFile(key) {
  var filepath = buildPath + '/' + key;
  // upload a file with custom key
  client.uploadFile(filepath, {key: key}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    
  });
};

