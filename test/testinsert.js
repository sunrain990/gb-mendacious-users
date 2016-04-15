/**
 * Created by kevin on 15/12/16.
 */
var Mysql = require('../config/db/my');
var crypto = require('crypto');
var moment = require('moment');
//var x = [1,2,3,4];
//var y = 1.5495*x[1]+38.856;
//console.log(y);
//
//var b = Math.floor(Math.random()*4);
//console.log(b);

//1----99天 每天固定

var time = moment('2015-09-01').valueOf();
//var time1 = moment().valueOf();
var time2 = moment('2015-09-02').valueOf();
console.log(time,time2,time2-time);
console.log(moment(time));



var Num = [68,
124,
115,
39,
89,
111,
71,
86,
154,
210,
201,
125,
175,
198,
157,
241,
296,
287,
211,
261,
284,
243,
259,
228,
283,
274,
198,
248,
271,
230,
246,
154,
210,
201,
125,
175,
198,
157,
172,
160,
215,
207,
130,
180,
203,
162,
178,
234,
225,
149,
362,
417,
409,
332,
382,
405,
365,
380,
224,
279,
271,
194,
244,
267,
226,
242,
199,
270,
326,
317,
240,
291,
313,
273,
144,
136,
192,
183,
107,
157,
180,
139,
154,
112,
148,
366,
422,
413,
337,
387,
410,
308,
364,
355,
293,
349,
340,
281,
254,
309,
301,
224,
274,
297,
256,
272,
229,
233,
289,
280,
204,
254,
276,
216,
272,
263,
187,
237,
259,
406,
461,
453,
376];


//id email password salt qq_openid uri nickname realname title tags type point coin smallAvatar mediumAvatar largeAvatar
//verifyEmail emailVerified setup roles promoted promotedTime locked loginTime loginIp loginSessionId approvalTime
//approvalStatus newMessageNum newNotificationNum createdIp createdTime schoolId isExpert rmb rmb_accumulated gold

var pass = 'password';
var md5 = crypto.createHash('md5');
md5.update(pass);
var d = md5.digest('hex');

var str = 'insert into user set ?';
var post = {
    id:0,
    email:'409747494@qq.com',
    password:'annanana',
    salt:'aa',
    //qq_openid:'',
    //uri:'',
    nickname:'bb',
    realname:'dd',
    title:'hi',
    //tags:'',
    type:'default',
    //point:'',
    //coin:'',
    smallAvatar:'sm',
    mediumAvatar:'md',
    largeAvatar:'lg',
    //verifyEmail:'',
    //emailVerified:'',
    //setup:'',
    roles:'|ROLE_USER|',
    //promoted:'',
    //promotedTime:'',
    //locked:'',
    loginTime:1450164971,
    loginIp:'221.224.10.50',
    //loginSessionId:'',
    //approvalTime:'',
    //approvalStatus:'',
    //newMessageNum:'',
    //newNotification:'',
    //createdIp:'',
    createdTime:1450164971,
    //schoolId:'',
    isExpert:1,
    rmb:12,
    rmb_accumulated:12,
    gold:'1000'
};
Mysql.ecp.query(str,post,function(err,res){
    if(!err){
        console.log(res);
    }else{
        console.log(err);
    }
});