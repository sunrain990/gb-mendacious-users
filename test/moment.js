/**
 * Created by kevin on 15/12/23.
 */
var moment = require('moment');
//var a = moment(1450924137000);
//console.log(a);
//
//var b = Math.random();
//console.log(b);

var starttime = moment('2015-12-25');
var nowtime = moment();
var startsecond = starttime.unix();
var nowtimesecond = nowtime.unix();

var dd = moment.duration(starttime.diff(nowtime))

console.log(startsecond,nowtimesecond,dd.get('day'));

console.log(moment(1451103735000).format('YYYY-MM-DD HH:mm:ss'));