"use strict"; /*jslint node: true */

// Parser API method
// `querystring` is required
// `separator` and `equivalency` are optional

exports.parse = function( querystring, separator, equivalency ) {
  var parser = new Parser( separator, equivalency );
  return parser.parse( querystring ).result;
};

var Parser = exports.Parser = function( sep, eq ){
  this.sep = sep || "&";
  this.eq = eq || "=";
};

// Main parser method, returns object with `result` property
Parser.prototype.parse = function( querystring ){
  this.result = {};
  querystring
    .split( this.sep )
    .forEach( this.param, this );
  return this;
};

// Parse parameter string in key=value and add to `result` object
Parser.prototype.param = function( param ){
  var key, value, valueWas, pos = param.indexOf( this.eq );
  
  if( pos === -1 ){
    
    key = this.unescape( param );
    value = "";
    
  } else {

    key = this.unescape( param.substring( 0, pos ) );
    value = this.unescape( param.substring( pos + 1 ) );

  }
  
  // Query-string has more than one appearance of some key
  if( this.result.hasOwnProperty( key )) {

    valueWas = this.result[ key ];
    if( valueWas.push )
      valueWas.push( value );
    else
      this.result[ key ] = [ valueWas, value ];
  
  } else {

    this.result[ key ] = value;

  }
};

Parser.prototype.unescape = function( str ){
  // SPACE may be encoded as "+"
  ~str.indexOf( "+" )
    && ( str = str.replace( /\+/g, " " ) ); // only one regexp here
  // Query contains percent-encoded reserved charsets
  ~str.indexOf( "%" )
    && ( str = decodeURI( str ) );

  return str;
};