/**
 * Created by kevin on 15/12/18.
 */
var trans = require('transliteration');
console.log(trans('张萌').replace(/\s+/g,'')+Math.floor(100*(Math.random())));