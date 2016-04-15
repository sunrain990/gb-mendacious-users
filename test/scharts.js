/**
 * Created by kevin on 15/12/16.
 */
//
var PerlinGenerator = require("proc-noise");
var Perlin = new PerlinGenerator();
var logger = require('./logs/log4j');
//for(var i=0;i<10;i++){
//    console.log(Perlin.noise(i));
//}

//var days=90;
//var rand = Math.floor(Math.random()*40)+1;
//var rand1 = Math.floor(Math.random()*10)+1;
//var rand2 = Math.floor(Math.random()*10)+1;
//var rand3 = Math.floor(Math.random()*10)+1;
//var rand4 = Math.floor(Math.random()*10)+1;
//var rand5 = Math.floor(Math.random()*10)+1;
//var rand6 = Math.floor(Math.random()*10)+1;
//var rand7 = Math.floor(Math.random()*10)+1;
//var rand8 = Math.floor(Math.random()*10)+1;
//var tempi = [];
//var tempj = [];
//var tempk = [];
//var templ = [];
//var tempm = [];
//var tempn = [];
//var tempo = [];
//var tempp = [];
//var tempq = [];
//
//for(var i=0;i<rand;i++){
//    var tempinoise = Perlin.noise(i);
//    tempi.push(tempinoise);
//    console.log(tempinoise);
//}
//for(var j=0;j<rand1;j++){
//    var tempjnoise = Perlin.noise(j);
//    tempj.push(tempjnoise);
//    //tempjnoise,
//    console.log(tempjnoise+tempi[tempi.length-1]);
//}
//for(var k=0;k<rand2;k++){
//    var tempknoise = Perlin.noise(k);
//    tempk.push(tempjnoise);
//    //tempjnoise,
//    console.log(tempknoise+tempj[tempj.length-1]);
//}
//for(var l=0;l<rand3;l++){
//    var templnoise = Perlin.noise(l);
//    templ.push(templnoise);
//    //tempjnoise,
//    console.log(templnoise+tempk[tempk.length-1]);
//}
//for(var m=0;m<rand4;m++){
//    var tempmnoise = Perlin.noise(m);
//    tempm.push(tempmnoise);
//    //tempjnoise,
//    console.log(tempmnoise+templ[templ.length-1]);
//}


var genenoise = function(num){
    var rand = Math.floor(Math.random()*num)+1;
    var temparr=[];
    for(var j=0;j<rand;j++){
        var tempj = Perlin.noise(j);
        temparr.push(tempj);
    }
    return temparr;
};

//genenoise(10).forEach(function(i){
//    console.log(i);
//});

var noisearr = [];
var concated = [];
//var noiseuparr = [
//    1,
//    3,
//    6,
//    7,
//    8,
//    9,
//    10,
//    11,
//    12,
//    13,
//    14,
//    15,
//    16,
//    17,
//    18,
//    19,
//    20];
//var noiseuparr = [
//    {index:1,enhence:0},
//    {index:2,enhence:0},
//    {index:3,enhence:1},
//    {index:4,enhence:1},
//    {index:5,enhence:0},
//    {index:6,enhence:2},
//    {index:7,enhence:1},
//    {index:8,enhence:2},
//    {index:9,enhence:1},
//    {index:10,enhence:2},
//    {index:11,enhence:1},
//    {index:12,enhence:0},
//    {index:13,enhence:2},
//    {index:14,enhence:1},
//    {index:15,enhence:2},
//    {index:16,enhence:2},
//    {index:17,enhence:2},
//    {index:18,enhence:2},
//    {index:19,enhence:2},
//    {index:20,enhence:2}
//];

var noiseuparr = [];
for(var i=0;i<60;i++){
    var tempindex = {
        index:i,
        enhence:Math.random()*2
    }
    noiseuparr.push(tempindex);
}
console.log(noiseuparr);

var lastarr = [];

//noisearr.push(genenoise(20));
//noisearr.push(genenoise(20));

for(var i=0;i<60;i++){
    noisearr.push(genenoise(10));
}


var hasIndex = function(arr,index){
    var returnval = false;
    for(var i=0;i<arr.length;i++){
        if(arr[i].index == index){
            returnval = true;
            break;
        }
    }
    return returnval;
};

for(var i=0;i<noisearr.length;i++){
    //noisearr[i].forEach(function(noise){
    //    if(totalarr.length==0){
    //        totalarr.concat(noisearr[i]);
    //    }
    //    noise.push();
    //});


    if(concated.length==0&&i==0){
        concated = concated.concat(noisearr[i]);
    }else{
        //noisearr.length;
        var enhanced = (noiseuparr[i].enhence)*Math.random();
        var lastarrval = noisearr[i-1][noisearr[i-1].length-1];
        lastarr.push(lastarrval);

        var noise = noisearr[i].map(function(noise){
            //if(i in noiseuparr){
            //    console.log(i,'i am  enhanced!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            //    noise =noise+0.5*Math.random();
            //}

            if(hasIndex(noiseuparr,i)){
                //console.log(i,enhanced,'i am  enhanced!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                noise =noise+enhanced;
            }


            //if(noiseuparr.indexOf(i)!=-1){
            //    console.log(i,enhanced,'i am  enhanced!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            //    noise =noise+enhanced;
            //}
            //console.log(i,'<-----------');
            //var lastarrval = noisearr[i-1][noisearr[i-1].length-1];
            //console.log(i,lastarrval,noise,'<-----------');
            return lastarrval+noise;
        });

        concated = concated.concat(noise);
    }
}

//concated.forEach(function(i){
//    console.log(i);
//});
//console.log('*****************');
//lastarr.forEach(function(i){
//    console.log(i);
//});
//console.log('*****************');
console.log(concated.length,'个数字');

var sum = 0;
concated.forEach(function(i){
    sum+=i;
});
console.log(sum,'总共值');
concatedNum = concated.map(function(i){
    return Math.round(30000/sum*i);
});
concatedNum.forEach(function(i){
    console.log(i);
});


//for(var i=0;i<10;i++){
//    var rand = Math.floor(Math.random()*10)+1;
//
//    for(var j=0;j<rand;j++){
//        if(totalarr.length==0){
//            var tempj = Perlin.noise(j);
//            totalarr.push(tempj);
//        }else{
//            var tempj = Perlin.noise(j);
//            lastarrlastindexcontent = totalarr[totalarr.length-1];
//            totalarr.push(tempj+lastarrlastindexcontent);
//        }
//    }
//}
//console.log(totalarr.length);
//
//totalarr.forEach(function(i){
//    console.log(i);
//});


//var a = 1;
//
//for(var i=0;i<100;i++){
//    var num = Math.ceil(Math.random()*5*i);
//    console.log(num);
//}