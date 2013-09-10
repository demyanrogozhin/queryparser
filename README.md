## queryparser

Module for parsing http query string into parameters. 
Parser is RFC 3986 complatable
Bit faster than node's querystring.parse (see benchmark.js)

## Install

```bash
$ npm install queryparser
```

## Usage

 ```js
var parse = require( "queryparser" ).parse;
console.log( parse( "foo=1&baz=3" ) ); // => { foo: "1", baz: "3" }
```
