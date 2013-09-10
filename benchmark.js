var Benchmark = require( "benchmark" ),
    apiParse = require( "./queryparser" ).parse,
    nativeParse = require( "querystring" ).parse,
    query = "foo=%20&bar=B+A+Z&cyr=%D1%82%D0%B5%D1%81%D1%82",
    suite = new Benchmark.Suite;

suite

  .add( "My parser API ", function(){
    !!apiParse( query );
  })
  .add( "native querystring.parse (as nativeParse)", function(){
    !!nativeParse( query );
  })

// add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })

// run async
  .run({ 'async': true });