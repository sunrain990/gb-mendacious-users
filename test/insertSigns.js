/**
 * Created by kevin on 16/3/18.
 */
var rf=require("fs");
var Mysql = require('../config/db/my-bb');
var data=rf.readFileSync("签名.txt","utf-8");
var arr = data.split('\n');
var async = require('async');


async.each(arr, function(item, callback) {
    var sql = "insert into signs values(null,'"+item+"')";
    console.log('--',sql);
    Mysql.ecp.query(sql,function(err,res){
        if(!err){
            console.log(res.insertId);
        }else{
            console.log(err);
        }
    });

}, function(err) {
    if(!err){
        console.log('> done2');
    }else{
        console.log('> done1');
    }
});

console.log("READ FILE SYNC END");

