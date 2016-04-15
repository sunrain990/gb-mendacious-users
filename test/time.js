/**
 * Created by kevin on 15/12/18.
 */
var moment = require('moment');

var daysecond = 86400;
var startsecond = 1441036800;
var array = [1,2,3,4];
var str = 'insert into user set ?';
var daytime;
var post;

console.log(moment(1441036800000));

//var generateoneday = function(arr){
//    arr.forEach(function(l,m){
//        for(var loop=0;loop<l;loop++){
//            daytime = startsecond+m*daysecond+Math.round(daysecond*Math.random());
//
//
//            post = {
//                id:0,
//                email:'409747494@qq.com',
//                password:'C3Jl6QPmohsF0E3aJkyMwT0uvCEmPl/PhoQFye71hH0=',
//                salt:'kvi33hcwbz4gcc440sgkgwws0gck8oc',
//                nickname:'bb',
//                realname:'dd',
//                //title:'hi',
//                type:'default',
//                //point:'',
//                //coin:'',
//                //smallAvatar:'sm',
//                //mediumAvatar:'md',
//                //largeAvatar:'lg',
//                //verifyEmail:'',
//                //emailVerified:'',
//                //setup:'',
//                roles:'|ROLE_USER|',
//                //promoted:'',
//                //promotedTime:'',
//                //locked:'',
//                loginTime:1450164971,
//                loginIp:'221.224.10.50f',
//                //loginSessionId:'',
//                //approvalTime:'',
//                //approvalStatus:'',
//                //newMessageNum:'',
//                //newNotification:'',
//                //createdIp:'',
//                createdTime:1450164971,
//                //schoolId:'',
//                //isExpert:0,
//                //rmb:0,
//                //rmb_accumulated:0,
//                //gold:''
//            };
//            Mysql.ecp.query(str,post,function(err,res){
//                if(!err){
//                    console.log(res);
//                }else{
//                    console.log(err);
//                }
//            });
//        }
//    });
//};

//generateoneday(array);