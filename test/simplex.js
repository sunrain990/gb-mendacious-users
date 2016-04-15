/**
 * Created by kevin on 15/12/17.
 */
var SimplexNoise = require('simplex-noise');
simplex = newSimplexNoise(Math.random());
value2d = simplex.noise(1,200);
console.log(value2d);