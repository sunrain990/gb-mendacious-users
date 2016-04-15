/**
 * Created by kevin on 15/12/18.
 */
var moment = require('moment');
var Mysql = require('../config/db/my');
var trans = require('transliteration');

var rsf = require('../qiniu/rsf');

rsf.listPrefix('avatars', null, null, 105, function(err, ret) {
    var avatars = [];
    for (var i in ret.items) {
        //console.log('http://7xpb9j.com2.z0.glb.qiniucdn.com/'+ret.items[i]['key']);
        avatars.push('http://7xpb9j.com2.z0.glb.qiniucdn.com/'+ret.items[i]['key']);
    }
    var post={
        gold:0
    }
    Mysql.ecp.query('select id from user where ?',post,function(err,res){
        if(!err){
            var mapedres = res.map(function(i){
                return i.id;
            });
            console.log(mapedres);
            console.log('select success!');
        }else{
            console.log(err);
        }
    });
    //avalon(avatars);
});


function avalon(avatars,projects){
    //var daysecond = 86400000;
    var daysecond = 86400;
//var startsecond = 1441036800000;
    var startsecond = 1441036800;
//var array = [68,
//    124,
//    115,
//    39,
//    89,
//    111,
//    71,
//    86,
//    154,
//    210,
//    201,
//    125,
//    175,
//    198,
//    157,
//    241,
//    296,
//    287,
//    211,
//    261,
//    284,
//    243,
//    259,
//    228,
//    283,
//    274,
//    198,
//    248,
//    271,
//    230,
//    246,
//    154,
//    210,
//    201,
//    125,
//    175,
//    198,
//    157,
//    172,
//    160,
//    215,
//    207,
//    130,
//    180,
//    203,
//    162,
//    178,
//    234,
//    225,
//    149,
//    362,
//    417,
//    409,
//    332,
//    382,
//    405,
//    365,
//    380,
//    224,
//    279,
//    271,
//    194,
//    244,
//    267,
//    226,
//    242,
//    199,
//    270,
//    326,
//    317,
//    240,
//    291,
//    313,
//    273,
//    144,
//    136,
//    192,
//    183,
//    107,
//    157,
//    180,
//    139,
//    154,
//    112,
//    148,
//    366,
//    422,
//    413,
//    337,
//    387,
//    410,
//    308,
//    364,
//    355,
//    293,
//    349,
//    340,
//    281,
//    254,
//    309,
//    301,
//    224,
//    274,
//    297,
//    256,
//    272,
//    229,
//    233,
//    289,
//    280,
//    204,
//    254,
//    276,
//    216,
//    272,
//    263,
//    187,
//    237,
//    259,
//    406,
//    461,
//    453,
//    376];
    var array = [1];
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
        var ran = Math.round(Math.random()*(avatars.length));
        console.log('this is ',ran);
        return avatars[ran];
    }

    function getonename(who){
        return who[Math.floor((who.length)*Math.random())];
    }

    function getprojectid(){
        var ran = Math.round(Math.random()*(projects.length));
        console.log('this is ',ran);
        return projects[ran];
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

    var generateoneday = function(arr){
        arr.forEach(function(l,m){
            for(var loop=0;loop<l;loop++){
                daytime = startsecond+m*daysecond+Math.round(daysecond*Math.random());
                //console.log(daytime);
                var name = getcname();
                var avatar = getavatar();
                var trname = trans(name).replace(/\s+/g,'')+Math.floor(100*(Math.random()));
                var email = trname+'@geminno.cn';
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
                        count++;
                        //Mysql.ecp.query('insert into user_profile set id='+res.insertId,function(err,res){
                        //    if(!err){
                        //        console.log('----------------------->insert success!');
                        //    }else{
                        //        console.log(err);
                        //    }
                        //});
                        console.log(res);
                        console.log('insert success!','第'+count+'条');
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
