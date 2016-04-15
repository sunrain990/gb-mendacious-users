/**
 * Created by kevin on 15/12/23.
 */

var Mysql = require('../db/myf');
var moment = require('moment');
var trans = require('transliteration');
var qs = require('querystring');
var http = require('http');
var rsf = require('../../qiniu/rsf');
var logger = require('../../logs/log4j');

var uparr = [
    17,
    24,
    46,
    13,
    47,
    41,
    26,
    41,
    40,
    100,
    107,
    128,
    136,
    158,
    70,
    49,
    57,
    79,
    46,
    80,
    73,
    58,
    73,
    71,
    78,
    100,
    67,
    101,
    94,
    69,
    76,
    98,
    86,
    93,
    115,
    82,
    116,
    109,
    94,
    109,
    122,
    129,
    151,
    118,
    152,
    146,
    130,
    146,
    64,
    71,
    93,
    113,
    120,
    142,
    137,
    144,
    166,
    133,
    167,
    161,
    145,
    161,
    159,
    89,
    97,
    52,
    59,
    150,
    157,
    179,
    146,
    180,
    174,
    74,
    82,
    104,
    122,
    129,
    151,
    118,
    152,
    145,
    130,
    145,
    144,
    153,
    160,
    182,
    149,
    183,
    176,
    161,
    116,
    123,
    68,
    75,
    97,
    64,
    98,
    92,
    92,
    99,
    121,
    67,
    74,
    96,
    65,
    72,
    94,
    61,
    95,
    89,
    74,
    89,
    88,
    62,
    59,
    66,
    88,
    55,
    89,
    67,
    74,
    96,
    63,
    97,
    91,
    75,
    69,
    76,
    98,
    65,
    99,
    144,
    151,
    173,
    75,
    82,
    104,
    66,
    73,
    95,
    62,
    96,
    89,
    74,
    89,
    90,
    97,
    119,
    86,
    120,
    114,
    99,
    114,
    113,
    87,
    54,
    62,
    84,
    51,
    85,
    78,
    63,
    78,
    77,
    81,
    38,
    45,
    52,
    74,
    41,
    75,
    69,
    54,
    69,
    67,
    42,
    40,
    48,
    70,
    37,
    71,
    64,
    49,
    64,
    63,
    38,
    92,
    99,
    121,
    88,
    122,
    116,
    100,
    115,
    114,
    109,
    116,
    138,
    105,
    139,
    132,
    117,
    132,
    131,
    106,
    47,
    54,
    76,
    43,
    77,
    71,
    56,
    99,
    107,
    129,
    96,
    130,
    123,
    108,
    123,
    122,
    97,
    57,
    42,
    49,
    71,
    38,
    72,
    66,
    51,
    66,
    96,
    103,
    125,
    92,
    126,
    120,
    104,
    57,
    64,
    86,
    53,
    87,
    72,
    79,
    101,
    68,
    102,
    95,
    80,
    95,
    94,
    69,
    43,
    50,
    72,
    39,
    59,
    66,
    88,
    55,
    43,
    50,
    72,
    123,
    131,
    152,
    120,
    154,
    147,
    132,
    147,
    65,
    72,
    94,
    92,
    100,
    122,
    89,
    123,
    116,
    101,
    116,
    111,
    118,
    140,
    66,
    73,
    74,
    81,
    103,
    70,
    104,
    136,
    128,
    53,
    60,
    82,
    49,
    57,
    36,
    43,
    65,
    32,
    66,
    59,
    44,
    102,
    109,
    131,
    83,
    90,
    112,
    79,
    113,
    107,
    92,
    107,
    106,
    80
];

function dooneday(){
    rsf.listPrefix('avatars', null, null, 105, function(err, ret) {
        var starttime = moment('2015-12-24');
        var nowtime = moment();
        var startsecond = starttime.unix();
        var nowtimesecond = nowtime.unix();
        var days = moment.duration(nowtime.diff(starttime)).get('day');
        var array = [];
        array.push(uparr[days]);
        var avatars = [];
        for (var i in ret.items) {
            //console.log('http://7xpb9j.com2.z0.glb.qiniucdn.com/'+ret.items[i]['key']);
            avatars.push('http://7xpb9j.com2.z0.glb.qiniucdn.com/'+ret.items[i]['key']);
        }

        var prost={
            state:4
        };
        //获取项目ids
        Mysql.ecp.query('select id from project.project where ?',prost,function(err,res){
            if(!err){
                var projects = res.map(function(i){
                    return i.id;
                });

                //获取课程ids
                var cpost = {
                    status:'published'
                };

                Mysql.ecp.query('select id from ecp.course where ?',cpost,function(err,res){
                    var courses = res.map(function(i){
                        return i.id;
                    });

                    avalon(avatars,projects,courses,nowtimesecond,array);
                });
            }else{
                console.log(err);
                logger.error(err);
            }
        });
    });
}



function avalon(avatars,projects,courses,startsecond,array){
    //var daysecond = 86400000;
    var daysecond = 86400;
//var startsecond = 1441036800000;
//    var startsecond = 1441036800;
//    var array = [100];
    var str = 'insert into user set ?';
    var daytime;
    var post;
    var firstName =["赵","钱","孙","李","周","吴","郑","王","冯","陈","褚","卫","蒋","沈","韩","杨","朱","秦","尤","许",
        "何","吕","施","张","孔","曹","严","华","金","魏","陶","姜","戚","谢","邹","喻","柏","水","窦","章","云","苏","潘","葛","奚","范","彭","郎",
        "鲁","韦","昌","马","苗","凤","花","方","俞","任","袁","柳","酆","鲍","史","唐","费","廉","岑","薛","雷","贺","倪","汤","滕","殷",
        "罗","毕","郝","邬","安","常","乐","于","时","傅","皮","卞","齐","康","伍","余","元","卜","顾","孟","平","黄","和",
        "穆","萧","尹","姚","邵","湛","汪","祁","毛","禹","狄","米","贝","明","臧","计","伏","成","戴","谈","宋","茅","庞","熊","纪","舒",
        "屈","项","祝","董","梁","杜","阮","蓝","闵","席","季","麻","强","贾","路","娄","危","江","童","颜","郭","梅","盛","林","刁","钟",
        "徐","邱","骆","高","夏","蔡","田","樊","胡","凌","霍","虞","万","支","柯","昝","管","卢","莫","经","房","裘","缪","干","解","应",
        "宗","丁","宣","贲","邓","郁","单","杭","洪","包","诸","左","石","崔","吉","钮","龚","程","嵇","邢","滑","裴","陆","荣","翁","荀",
        "羊","于","惠","甄","曲","家","封","芮","羿","储","靳","汲","邴","糜","松","井","段","富","巫","乌","焦","巴","弓","牧","隗","山",
        "谷","车","侯","宓","蓬","全","郗","班","仰","秋","仲","伊","宫","宁","仇","栾","暴","甘","钭","厉","戎","祖","武","符","刘","景",
        "詹","束","龙","叶","幸","司","韶","郜","黎","蓟","溥","印","宿","白","怀","蒲","邰","从","鄂","索","咸","籍","赖","卓","蔺","屠",
        "蒙","池","乔","阴","郁","胥","能","苍","双","闻","莘","党","翟","谭","贡","劳","逄","姬","申","扶","堵","冉","宰","郦","雍","却",
        "璩","桑","桂","濮","牛","寿","通","边","扈","燕","冀","浦","尚","农","温","别","庄","晏","柴","瞿","阎","充","慕","连","茹","习",
        "宦","艾","鱼","容","向","古","易","慎","戈","廖","庾","终","暨","居","衡","步","都","耿","满","弘","匡","国","文","寇","广","禄",
        "阙","东","欧","殳","沃","利","蔚","越","夔","隆","师","巩","厍","聂","晁","勾","敖","融","冷","訾","辛","阚","那","简","饶","空",
        "曾","毋","沙","乜","养","鞠","须","丰","巢","关","蒯","相","查","后","荆","红","游","郏","竺","权","逯","盖","益","桓","公","仉",
        "督","岳","帅","缑","亢","况","郈","有","琴","归","海","晋","楚","闫","法","汝","鄢","涂","钦","商","牟","佘","佴","伯","赏","墨",
        "哈","谯","篁","年","爱","阳","佟","言","福","南","火","铁","迟","漆","官","冼","真","展","繁","檀","祭","密","敬","揭","舜","楼",
        "疏","冒","浑","挚","胶","随","高","皋","原","种","练","弥","仓","眭","蹇","覃","阿","门","恽","来","綦","召","仪","风","介","巨",
        "木","京","狐","郇","虎","枚","抗","达","杞","苌","折","麦","庆","过","竹","端","鲜","皇","亓","老","是","秘","畅","邝","还","宾",
        "闾","辜","纵","侴","万俟","司马","上官","欧阳","夏侯","诸葛","闻人","东方","赫连","皇甫","羊舌","尉迟","公羊","澹台","公冶","宗正",
        "濮阳","淳于","单于","太叔","申屠","公孙","仲孙","轩辕","令狐","钟离","宇文","长孙","慕容","鲜于","闾丘","司徒","司空","兀官","司寇",
        "南门","呼延","子车","颛孙","端木","巫马","公西","漆雕","车正","壤驷","公良","拓跋","夹谷","宰父","谷梁","段干","百里","东郭","微生",
        "梁丘","左丘","东门","西门","南宫","第五","公仪","公乘","太史","仲长","叔孙","屈突","尔朱","东乡","相里","胡母","司城","张廖","雍门",
        "毋丘","贺兰","綦毋","屋庐","独孤","南郭","北宫","王孙"];
    var girl = "秀娟英华慧巧美娜静淑惠珠翠雅芝玉萍红娥玲芬芳燕彩春菊兰凤洁梅琳素云莲真环雪荣爱妹霞香月莺媛艳瑞凡佳嘉琼" +
        "勤珍贞莉桂娣叶璧璐娅琦晶妍茜秋珊莎锦黛青倩婷姣婉娴瑾颖露瑶怡婵雁蓓纨仪荷丹蓉眉君琴蕊薇菁梦岚苑婕" +
        "馨瑗琰韵融园艺咏卿聪澜纯毓悦昭冰爽琬茗羽希宁欣飘育滢馥筠柔竹霭凝晓欢霄枫芸菲寒伊亚宜可姬舒影荔枝思丽";
    var boy = "伟刚勇毅俊峰强军平保东文辉力明永健世广志义兴良海山仁波宁贵福生龙元全国胜学祥才发武新利清飞彬富" +
        "顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博诚先敬震振壮会思群豪心邦承乐绍功松善厚庆磊民友裕河哲江超浩亮政" +
        "谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏泽晨辰士以建家致树炎德行时泰盛雄琛钧冠策腾楠榕风航弘";

    function gailv(){
        var rand = Math.random();
        //console.log(rand);
        if(rand>0.8){
            return 0.8;
        }else if(rand>0.6&&rand<0.8){
            return 0.6;
        }else if(rand>0.4&&rand<0.6){
            return 0.4;
        }else if(rand>0.1&&rand<0.4){
            return 0.1;
        }else{
            return 0;
        }
    }

    function getavatar(){
        var ran = Math.floor(Math.random()*(avatars.length));
        return avatars[ran];
    }

    function getprojectid(){

        //随机项目
        var ranprojects = Math.random();
        var projects1;
        if(ranprojects<0.62){
            projects1 = projects.filter(function(i){
                return i%4==0;
            });
        }else if(ranprojects>0.62&&ranprojects<0.73){
            projects1 = projects.filter(function(i){
                return (i+1)%4==0;
            })
        }else if(ranprojects>0.73&&ranprojects<0.81){
            projects1 = projects.filter(function(i){
                return (i+2)%4==0;
            })
        }else if(ranprojects>0.81){
            projects1 = projects.filter(function(i){
                return (i+3)%4==0;
            })
        }

        var ran = Math.floor(Math.random()*(projects1.length));

        return projects1[ran];
    }

    function getcourseid(){
        var ran = Math.floor(Math.random()*(courses.length));
        return courses[ran];
    }

    function getonename(who){
        return who[Math.floor((who.length)*Math.random())];
    }


    function createschedule(uid){
        var data = {
            projectid: getprojectid(),
            uid: uid
        };

        data = qs.stringify(data);
        var opt = {
            method: "POST",
            host: "www.geminno.cn",
            port: 80,
            path: "/project/index.php/api/schedule/create",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Content-Length": data.length
            }
        };

        var req = http.request(opt, function (serverFeedback) {
            if (serverFeedback.statusCode == 200) {
                var body = "";
                serverFeedback.on('data', function (data) { body += data; })
                    .on('end', function () {
                        console.log('end',body);
                        logger.info('end',body);
                    });
            }
            else {
                console.log('else');
            }
        });
        req.write(data + "\n");
        req.on('err',function(e){
            console.log(e);
        })
        req.end();
    }

    var getcname = function(){
        var ran = gailv();
        if(ran==0.8){
            return getonename(firstName)+getonename(boy);
        }else if(ran==0.6){
            return getonename(firstName)+getonename(boy)+getonename(boy);
        }else if(ran==0.4){
            return getonename(firstName)+getonename(girl)+getonename(girl);
        }else if(ran==0.1){
            return getonename(firstName)+getonename(girl);
        }else{
            return getonename(firstName)+getonename(girl)+getonename(girl)+getonename(girl);
        }
    };
//getcname();

    var count = 0;
    var failnums = 0;
    //var avatar = getavatar();

    var generateoneday = function(arr){
        arr.forEach(function(l,m){
            for(var loop=0;loop<l;loop++){
                daytime = startsecond+m*daysecond+Math.round(daysecond*Math.random());
                //console.log(daytime);
                var name = getcname();
                var trname = trans(name).replace(/\s+/g,'')+Math.floor(100*(Math.random()));
                var email = trname+'@geminno.cn';
                var avatar = getavatar();
                post = {
                    id:0,
                    email:email,
                    password:'C3Jl6QPmohsF0E3aJkyMwT0uvCEmPl/PhoQFye71hH0=',
                    salt:'kvi33hcwbz4gcc440sgkgwws0gck8oc',
                    nickname:name,
                    realname:name,
                    type:'default',
                    roles:'|ROLE_USER|',
                    smallAvatar:avatar,
                    mediumAvatar:avatar,
                    largeAvatar:avatar,
                    loginTime:daytime,
                    createdIp:'221.224.10.50f',
                    createdTime:daytime,
                };
                Mysql.ecp.query(str,post,function(err,res){
                    if(!err){
                        var uid = res.insertId;
                        count++;
                        console.log('insert success!','第'+count+'条');
                        logger.info('insert success!','第'+count+'条');
                        Mysql.ecp.query('insert into user_profile set id='+uid,function(err,res){
                            if(!err){
                                console.log('----------------------->insert success!');
                                logger.info('----------------------->insert success!');
                                //随机启动项目0-3个项目
                                var ran = Math.floor(Math.random()*6);
                                console.log(ran,'this is ran');
                                logger.info(ran,'this is ran');
                                for(var i=0;i<ran;i++){
                                    createschedule(uid);
                                }

                                //购买课程,创建后15天内购买
                                function perchase(){
                                    var spost = {
                                        courseId:getcourseid(),
                                        userId:uid,
                                        remark:'f',
                                        createdTime:daytime+Math.round(5*daysecond*Math.random())
                                    };
                                    var sql = 'insert into course_member set ?';
                                    Mysql.ecp.query(sql,spost,function(err,res){
                                        if(!err){
                                            var courseid = spost.courseId;
                                            console.log('用户'+uid,':perchase',courseid,'success!');
                                            logger.info('用户'+uid,':perchase',courseid,'success!');

                                            //获取该课程下的微课
                                            Mysql.ecp.query('select id from course_lesson where courseId='+courseid,function(err,res){
                                                var lessons = res.map(function(i){
                                                    return i.id;
                                                });

                                                console.log(lessons,'----->this is lessons!');
                                                logger.info(lessons,'----->this is lessons!');

                                                //观看课程
                                                var ran = Math.floor(Math.random()*8)+1;

                                                var coupost;
                                                for(var i=1;i<=ran;i++){
                                                    var ranstatus = Math.random();
                                                    var status;
                                                    if(ranstatus<0.7){
                                                        status = 'finished';
                                                    }else{
                                                        status = 'learning';
                                                    }
                                                    coupost= {
                                                        userId:uid,
                                                        courseId:courseid,
                                                        lessonId:lessons[i],
                                                        status:status,
                                                        startTime:spost.createdTime+Math.round(1*daysecond*Math.random())
                                                    };
                                                    Mysql.ecp.query('insert into course_lesson_learn set ?',coupost,function(err,res){
                                                        console.log('用户',uid,'观看',coupost.courseId,'成功！');
                                                        logger.info('用户',uid,'观看',coupost.courseId,'成功！');
                                                    });
                                                }

                                            });
                                        }else{
                                            console.log('用户'+uid,':perchase',spost.courseId,'error!');
                                            logger.info('用户'+uid,':perchase',spost.courseId,'error!');
                                        }
                                    });
                                }
                                var ranp = Math.floor(Math.random()*5);
                                console.log(ranp,'this is ranp');
                                logger.info(ranp,'this is ranp');
                                for(var i=0;i<ranp;i++){
                                    perchase();
                                }

                            }else{
                                console.log(err);
                            }
                        });
                    }else{
                        console.log(err);
                        failnums++;
                    }
                });
            }
        });
    };

    generateoneday(array);
}


var Cron = function(){
    var CronJob = require('cron').CronJob;

    new CronJob({
        cronTime: '0 1 * * *',
        onTick: function() {
            dooneday();
        },
        start: true,
        timeZone: 'Asia/Shanghai'
    });

    //new CronJob({
    //    cronTime: '*/20 * * * *',
    //    onTick: function() {
    //        useraddops();
    //    },
    //    start: true,
    //    timeZone: 'Asia/Shanghai'
    //});
};

Cron();