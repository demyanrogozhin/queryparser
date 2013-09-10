var assert = require( "assert" );

describe( "Query parser", function(){
    var parse,
      simple = {
        query: "foo=1&bar=2&baz=3",
        result: { foo: "1", bar: "2", baz: "3" }
      },
      complex = {
        query: "foo&foo=1&bar&foo=2&=test&foo=3",
        result: { "": "test", foo: [ "", "1", "2", "3" ], bar: "" }
      },
      escape = {
        query: "foo=%20&bar=B+A+Z&cyr=%D1%82%D0%B5%D1%81%D1%82",
        result: {foo:" ", bar:"B A Z", cyr:"тест"}
      };

  describe( "module API", function(){

    it( "should exports 'parse' function", function(){
      parse = require( "./queryparser" ).parse;
      assert.equal( typeof parse, "function" );
    });
    
    it( "should parse simple query " + simple.query, function(){
      assert.deepEqual( parse( simple.query ), simple.result ); 
    });
    
    it( "should parse complex query " + complex.query, function(){
      assert.deepEqual( parse( complex.query ), complex.result ); 
    });
    
    it( "should parse unescape URL encoded strings " + escape.query, function(){
      assert.deepEqual( parse( escape.query ), escape.result ); 
    });

  });
  
});