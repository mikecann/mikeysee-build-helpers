import * as gulp from "gulp";
import * as _ from "lodash";
import * as watch from "gulp-watch";
import * as run from "gulp-sequence";
import * as webp from "webpack";
import * as gutil from "gulp-util";

export function copy(src: string[] | string, dest: string) {
    gulp.src(src).pipe(gulp.dest(dest));
}

export function watchAndRun(files: any, tasks: string | string[]) {
    watch(files, () => run(tasks));
}

export function webpack(config: any, options: any) {
    if (!options)
        options = {};

    var conf = Object.create(config);
    var compiler = webp(conf);
    function handler(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log(stats.toString({
            colors: true,
            chunks: false
        }));

        // process.env.NODE_ENV = 'production';

        if (options.callback) {
            options.callback();
            options.callback = null;
        }
    }
    if (options.watch)
        compiler.watch({}, handler);
    else
        compiler.run(handler);
}

// var webpack = require("webpack");
// var gutil = require("gulp-util");
// var gulp = require("gulp");
// var spawn = require('child_process').spawn;
// var _ = require('lodash');
// var watch = require("gulp-watch");
// var runSequence = require("run-sequence");
// var clean = require("gulp-clean");

// var node;

// module.exports = {


//     serve: (index, options) => {

//         if (!options)
//             options = {};

//         function run() {
//             console.log('Startig node..', {index});
//             node = spawn('node', [index], { stdio: 'inherit', env: options.env })
//             node.on('close', (code) => {
//                 if (code === 8) {
//                     console.log('Error detected, waiting for changes...');
//                 }
//             });
//         }

//         if (options.reloadOnChangeOf) {
//             watch(options.reloadOnChangeOf, _.debounce(() => {
//                 console.log('Detected changes to server, restarting node..');
//                 node.kill();
//                 run();
//             },200));
//         }

//         run();
//     },

//     clean: (files) => {
//         return gulp.src(files)
//         .pipe(clean({ force: true }));
//     }
// }