// Import gulp & plugins
var fs = require("fs");
var path = require("path");
var args = require("args");
var gulp = require("gulp");
var mkdirp = require('mkdirp');
var zip = require('zip-folder');
var md5 = require("md5");

//usage: node pack-project.js

args
  .option("output", "the build output directory (default is dist)", "dist")
  .option("target", "target directory that store package (default is '.')", ".")
  .option("name", "the package base name (default is project nmae)");

var options = args.parse(process.argv)

//package base name
var name = options.name || require("./package.json").name;
var output = options.output || "dist";
var packName = name  + "-" + getPackTime() + ".zip"
var target = options.target || ".";
var targetFile = path.join(target, packName);
var md5File = path.join(target, packName + ".md5");


//make sure the target folder exists
mkdirp(target, function (err) {
    if (err) {
         console.error(err);
    } else {
        zipFolder();
    }
});


//zip folder
function zipFolder() {
    zip(output, targetFile, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("=================================");
            console.log('package: ' + targetFile);
            console.log("=================================");
            createMd5File();
        }
    });
}

//生成指定文件的md5文件
function createMd5File() {
    fs.readFile(targetFile, function(err, buf) {
        var value = md5(buf) + "  " + packName;
        fs.writeFileSync(md5File, value)
        console.log("create md5 file: " + md5File);
        console.log(value);
    });
}

//2016-10-08 -> 20161008
function getPackTime() {
    var now = new Date();
    var arr = [];
    //year
    arr.push(now.getFullYear());
    //month
    arr.push(fmtTime(now.getMonth() + 1));
    //date
    arr.push(fmtTime(now.getDate()));

    return arr.join("");
}

function fmtTime(t) {
    return t > 9 ? t : ('0' + t);
}