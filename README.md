# grunt-of-ocamlbuild

> Compile OCaml code to JavaScript with ocamlbuild and js_of_ocaml


## Getting Started

### Requirements

* Grunt

* ocamlbuild

* Findlib (ocamlfind)

* js_of_ocaml


### Installation

Install this plugin:

```shell
$ npm install grunt-of-ocamlbuild --save-dev
```


Include the task in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-of-ocamlbuild');
```


## ocamlbuild task

_Run this task with the `grunt ocamlbuild` command._

### Options

#### ocamlbuild
Type: `String array`

Additional options to be passed to `ocamlbuild`.


#### js_of_ocaml
Type: `String array`

Additional options to be passed to `js_of_ocaml`.


### Usage Examples

```js
ocamlbuild: {
  main: {
    files: {
      'lib/': 'ocaml/main.ml'
    },
    options:
      ocamlbuild: [],
      js_of_ocaml: ['source-map']
  },
},
```

This task supports all the file mapping format Grunt supports. Please read [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.


##License

Copyright (c) 2017 Lemoine Automation Technologies

Licensed under the MIT license.
