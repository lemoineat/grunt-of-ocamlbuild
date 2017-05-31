/*
 * grunt-of-ocamlbuild
 *
 * Copyright (c) 2017 Nicolas Relange, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  grunt.registerMultiTask('jsofocamlbuild', 'Copy OCaml code to JavaScript with ocamlbuild and js_of_ocaml', function() {
    var done = this.async ();

    var options = this.options();

    var compile = function (jsFile, destination) {
      var byteFile = jsFile.replace (/\.js$/, '.byte');
      var jsPath = path.join (destination, jsFile);

      var ocamlbuildDone = function (error, result, code) {
        grunt.verbose.writeln('ocamlbuild done');
        if (error) {
          grunt.log.writeln (result);
          grunt.fail.warn ('ocamlbuild error ' + error);
        }
        else {
          grunt.verbose.ok('ocamlbuild successful');
          grunt.verbose.writeln(result);
          jsOfOCaml (jsPath, byteFile);
        }
      }

      grunt.verbose.writeln('Byte file is  ' + byteFile);
      grunt.log.writeln('Compiling ' + jsFile + ' into ' + destination);
      var ocamlbuild_args = options.ocamlbuild.concat (['-use-ocamlfind', byteFile]);
      grunt.log.writeln('ocamlbuild ' + ocamlbuild_args.join(' '));
      grunt.util.spawn({
        cmd: 'ocamlbuild',
        args: ocamlbuild_args
      }, ocamlbuildDone);
    }

    var jsOfOCaml = function (jsPath, byteFile) {
      var jsOfOCamlDone = function (error, result, code) {
        if (error) {
          grunt.log.writeln(result);
          grunt.fail.warn ('js_of_ocaml error ' + error);
        }
        else {
          grunt.log.ok (jsPath + ' was successfully created');
          grunt.verbose.writeln(result);
          done ();
        }
      }

      var js_of_ocaml_args = options.js_of_ocaml.concat (['-o', jsPath, byteFile]);
      grunt.log.writeln('js_of_ocaml ' + js_of_ocaml_args.join(' '));
      grunt.util.spawn({
        cmd: 'js_of_ocaml',
        args: js_of_ocaml_args
      }, jsOfOCamlDone);
    }

    this.files.forEach(function(f) {
      var destDirectory = f.dest;
      var jsFiles = f.src.filter (function(filepath) { return true; })
      
      jsFiles.forEach (function (source) {
        var jsFile = path.basename (source).replace (/\.ml$/, '.js');
        grunt.verbose.writeln('Compile ' + jsFile + ' into ' + destDirectory);
        compile (jsFile, destDirectory);
      })
    });

  });


  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};
