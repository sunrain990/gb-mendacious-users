/**
 * Created by kevin on 15/12/17.
 */
var a=[
    {index:1,name:'aa'},
    {index:2,name:'bb'},
    {index:3,name:'cc'}
];

var hasIndex = function(arr,index){
    var returnval = false;
    arr.forEach(function(i){
        //if(i.index =){
        //
        //}
        if(i.index == index){
            returnval = true;
        }
    });
    return returnval;
};

if(hasIndex(a,3)){
    console.log('66666');
}