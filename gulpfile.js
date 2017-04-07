// Import gulp & plugins
var fs = require("fs");
var path = require("path");
var gulp = require("gulp");
var del = require("del");
var uglify = require("gulp-uglify");
var cleancss = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var less = require("gulp-less");
var concat = require("gulp-concat");
var csslint = require("gulp-csslint");
var gulpif = require("gulp-if");
var browserify = require("browserify");
var stream = require("vinyl-source-stream");
var streamify = require("gulp-streamify");
var buffer = require("vinyl-buffer");
var globby = require("globby");
var filterProperties = require("gulp-filter-java-properties2");
// var imagemin = require('gulp-imagemin');
// var imageminPngquant = require('imagemin-pngquant');
var args = require("args");
var replace = require("gulp-replace");

//命令行参数
args
  .option("minify", "minify html css js files (default is false, do not minify code.)", false)
  .option("env", "env properties file path (default is env/dev.properties)", "env/dev.properties")
  .option("output", "the output directory of building (default is dist)", "dist");
 
var options = args.parse(process.argv)

console.log("==== command options ====");
console.log(options);

//if true, minify resources, used in production.
//if false, no minify reources, used in development.
var minify = options.minify;
//env file path
var envFile = options.env;
//output directory
var outputDir = options.output;

//gulp-filter-java-properties config
var filterDelimiters = ["${*}"] ;
//dynamic properties
var extraProperties = {version: new Date().getTime()};

//paths
var paths = {
    //source  path
    src: "src",

    libs: [
        //hold dependencies that not managed by bower
        { src: "libs/**", dest: "" }
    ],

    //build target directory
    dist: outputDir
};

//vendor js libs will be merge into vendor.js
var vendorLibs = ["vue", "vue-resource", "vue-touch"];


// default task
gulp.task("default", ["watch"]);

//note: only watch the files maybe changed frequently
gulp.task("watch", ["clean", "build"], function() {
    var commonFiles = [
        "src/common/**/*.js",
        "src/common/**/*.less"
    ];

    var componentsFiles = [
        "src/components/**/*.vue"
    ];

    var pageFiles = [
        "src/pages/**/*.js",
        "src/pages/**/*.less",
        "src/pages/**/*.html"
    ];

    var imageFiles = [
        "src/images/**"
    ];

    gulp.watch(commonFiles, ["common"]);
    gulp.watch(componentsFiles, ["pages"]);
    gulp.watch(imageFiles, ["images"]);
    // gulp.watch(pageFiles, ["pages"]);
    gulp.watch(pageFiles, function (event) {
        //skip process delete file event
        if (event.type == "deleted") {
            return;
        }

        var filePath = event.path;
        var ext = path.extname(filePath);
        console.log("Compile file: "  + filePath);

        if (ext == ".js") {
            compileJs(filePath, getPageFileDistPath(filePath), path.basename(filePath), minify);
        } else if (ext == ".less") {
            compileLess(filePath, getPageFileDistPath(filePath), path.basename(filePath, ".less") + ".css", minify);
        } else if (ext == ".html") {
            compileHtml(filePath, getPageFileDistPath(filePath), minify);
        }
    });

});

function getPageFileDistPath(filePath) {
    var pagePath = path.join(__dirname, paths.src + "/pages");
    var relatedPath = path.dirname(filePath.substr(pagePath.length+1));
    return path.join(paths.dist, relatedPath);
}

//build all project
gulp.task("build", ["images",'fonts', "libs", "vendorjs", "common", "components", "pages"]);

gulp.task("clean", function() {
    del.sync(paths.dist);
});

//process custom libs and bower managed libs
gulp.task("libs", function() {
    var lib;

    for (var i = 0; i < paths.libs.length; i++) {
        lib = paths.libs[i];
        
        gulp.src(lib.src)
            .pipe(gulp.dest(paths.dist + "/libs/" + lib.dest));
    }

});

//copy images
gulp.task("images", function() {
    gulp.src(paths.src + "/images/**")
        // .pipe(gulpif(minify, imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imageminPngquant(), imagemin.svgo()])))
        .pipe(gulp.dest(paths.dist + "/images"));
});

// copy fonts
gulp.task("fonts", function() {
    gulp.src(paths.src + "/common/styles/fonts/**")
        .pipe(gulp.dest(paths.dist + "/fonts"));
});



//compile common resources
gulp.task("common", function() {
    var commonDir = path.join(paths.src, "common");

    var lessFiles = [//调整文件顺序
        commonDir + "/**/frozenui-custom.less",
        commonDir + "/**/common.less",
        "!" + commonDir + "/variables.less"
    ];

    var jsFiles = [
        commonDir + "/**/sessionStorage.js",
        commonDir + "/**/localStorage.js",
        commonDir + "/**/cookie.js",
        commonDir + "/**/auth.js",
        commonDir + "/**/browser.js",
        commonDir + "/**/utils.js",
        commonDir + "/**/api-request.js",
        commonDir + "/**/mall-setting.js",
        commonDir + "/**/session-id.js",
        commonDir + "/**/*.js",
        //exclue test files
        "!" + commonDir + "/**/*.test.js"
    ];

    compileLess(lessFiles, paths.dist, "common.css", minify);
    compileJs(jsFiles, paths.dist, "common.js", minify);
});

//compile vendorjs
gulp.task("vendorjs", function() {
    compileVendorJs(minify);
});

//compile components js file 
gulp.task("components", function() {
    compileJs("src/components/components.js", paths.dist, "components.js", minify);
});

//build application
gulp.task("pages", function() {
    compilePages(paths.src + "/pages", paths.dist, minify);

});

//compile page dir - support sub directory
function compilePages(srcDir, destDir, minify) {
    //
    fs.readdirSync(srcDir).filter(function(file) {
        if (excludeFile(file)) {
            console.log("skip process file/directory: " + file);
            return;
        }

        var filePath = path.join(srcDir, file);
        var fileStats = fs.lstatSync(filePath);

        //treat directory as dir
        if (fileStats.isDirectory()) {
            //
            compilePages(filePath, path.join(destDir, file), minify);

        } else if (fileStats.isFile()) {
            //normal file
            var ext = path.extname(file);

            switch (ext) {
                case ".html":
                    compileHtml(filePath, destDir, minify);
                    break;
                case ".less":
                    compileLess(filePath, destDir, path.basename(file, ".less") + ".css", minify);
                    break;
                case ".js":
                    //skip test file
                    if (file.lastIndexOf(".test.js") < 0) {
                        compileJs(filePath, destDir, file, minify);
                    }
                    break;
                default:
                    //just copy resources
                    gulp.src(path.join(srcDir, file)).pipe(gulp.dest(destDir));
                    break;
            }
        }

    });

}

//Some special file or directory not need process
function excludeFile(file) {
    var c = file.charAt(0);
    return c === "." || c === "_";
}

//common functions
function compileHtml(source, destination, minify) {
    return gulp.src(source)
        .pipe(filterProperties({
            propertiesPath: envFile,
            extraProperties: extraProperties,
            delimiters: filterDelimiters 
        }))
        .pipe(gulpif(minify, htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(destination));
}

function compileLess(source, destination, concatName, minify, hideErrors) {
    var lessc = less();
    lessc.on("error", function (e) {
        console.log(e);
        lessc.end();
    });

    return gulp.src(source)
        .pipe(filterProperties({
            propertiesPath: envFile,
            extraProperties: extraProperties,
            delimiters: filterDelimiters 
        }))
        .pipe(lessc)
        // .pipe(csslint("csslintrc.json"))
        // .pipe(gulpif(!hideErrors, csslint.reporter()))
        .pipe(gulpif(minify, cleancss()))
        .pipe(concat(concatName))
        .pipe(gulp.dest(destination));
}

function compileVendorJs(minify) {
    // create a browserify bundle
    var b = browserify();
    //vue2默认引用的是runtime的版本，这里替换为完全版本(支持模板等特性)
    var vueLib = "vue/dist/vue.common.js";

    // make vendor js available from outside
    vendorLibs.forEach(function (lib) {
        if (lib == "vue")  {
            lib = vueLib;
        }
        b.require(lib);
    });
    
    // start bundling
    b.bundle()
        .pipe(stream("vendor.js"))
        .pipe(buffer())
        //将上一步替换的路径在改回来（不改变项目的引用）
        .pipe(replace(vueLib, "vue"))
        .pipe(gulpif(minify, uglify()))
        .pipe(gulp.dest(paths.dist + "/libs"));
}

function compileJs(source, destination, concatName, minify, hideErrors) {
    globby(source).then(function (entries) {
        var b = browserify({
            entries: entries,
            debug: false
        });

        //-x external module
        vendorLibs.forEach(function (lib) {
            b.external(require.resolve(lib));
        });
        
        b.bundle()
            .pipe(stream(concatName)) 
            .pipe(buffer())
            .pipe(filterProperties({
                propertiesPath: envFile,
                extraProperties: extraProperties,
                delimiters: filterDelimiters 
            }))
            .pipe(gulpif(minify, uglify()))
            .pipe(gulp.dest(destination));

    });
}

