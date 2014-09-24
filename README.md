# grunt-i18n-require

> Plugin to convert RequireJS' i18n f plugin strings from JSON to .properties files and vice-versa.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18n-require --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18n-require');
```

## The "i18n" task

### Overview
In your project's Gruntfile, add a section named `i18n` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  i18n: {
    main: {
      json: {   // json to properties
        rootJson: 'base',
        files: [
          { src: 'path/to/i18n.js', dest: 'folder/i18n', split: false, isRoot: true }
          { src: 'path/to/another/i18n.js', folder: 'folder/', split: true }
        ]
      }
    },
    your_target: {
      props: {   // properties to json
        rootProp: 'base',
        languages: ['en-us', 'en-en'],
        files: [
          { src: 'locales/EN/en/**/*.properties', dest: 'public/js/nls/i18n', isRoot: true },
          { src: 'locales/EN/us/**/*.properties', dest: 'public/js/nls/pt-pt/i18n' }
        ]
      }
    },
  },
});
```

### Options

#### json
The `json` option has the following options:

##### rootJson
The parser always assumes that the JSON object inside the define is wrapped around a root key. E.g.: for a `rootJson: 'rootKey'`:

```js
define({
  rootKey: {
    // i18n values
  }
});

```

or if the file is the root i18n:

```js
define({
  root: {
    rootKey: {
      // i18n values
    }
  }
});
```

##### files
An array of objects with the following format:

```js
{
  src:    'file.js',   // the filename (always expects a file)

  dest:   'file',      // the name of the file. Use dest if the split option is set to true,
                       // otherwise use folder (will always be .properties)

  folder: 'folder/',   // the folder where the splitted strings will be put (explained later on).
                       // Use dest if split is false (will always be .properties)

  split:  true,        // if the i18n file should be splitted into
                       // multiple files or just one (default: false)

  isRoot: true         // if the i18n file is the root one (default: false)
}
```

The parser works as follows:
 1. if the JSON inside the define(); statement is supposed to be split into multiple files, it will take the keys (no recursion) of the rootJson key from the object and create those files. E.g.: taking the following file as an example

```js
define({
  rootKey: {
    key_one: {
      // i18n values
    },

    key_two: {
      // i18n values
    }
  }
})
```

The values inside `key_one` will be put in a file named `<folder>/key_one.properties` of a given folder in the following format:
```
rootKey.key_one.<another>.<property>=<value>
```

The same applies for `key_two`.
 2. if the JSON inside the define(); statement is not supposed to be split, then it will create one file (the `dest` option) with each property in the format mentioned earlier.


#### props
The `props` option has the following options:

##### rootProp
Like the `json` option, the `props` option expects the properties strings to be wrapped around a given key. So the inverse of the previous example should be its main behaviour.

##### languages
An array containing the supported languages. This will allow to create the root file and automatically add the supported languages, i.e.:

```js
define({
  'lang':  true,
  'lang2': true,
  root: {
    rootKey: {
      // the i18n values
    }
  }
});
```

##### files
An array of objects with the following format:

```js
{
  src: 'locales/EN/en/**/*.properties', // the source files
  dest: 'public/js/nls/i18n',           // the destination file
                                        // (will always be .js)

  isRoot: true                          // if it is the root file
}
```

## Contributing
To contribute, just open an issue in the issue tracker, create a feature branch using the following format `<issue-number>-<name>`, code and open a pull request.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - 0.1.5: Bug fixes
