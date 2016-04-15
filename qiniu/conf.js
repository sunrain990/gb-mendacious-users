var fs = require('fs');
var path = require('path');
var os = require('os');

exports.ACCESS_KEY = 'IEnRwqovf--MWYbgsVFZuWgWcsLw-B0k442PB7OJ';
exports.SECRET_KEY = 'yG59rt6ci8WRFGaI6OLDjtx8zRxtGZZcqb7bFX0V';

var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'package.json')));
var ua = function() {
    return 'QiniuNodejs/' + pkg.version + ' (' + os.type() + '; ' + os.platform() + '; ' + os.arch() + '; )';
}

exports.USER_AGENT = ua();

exports.UP_HOST = 'http://upload.qiniu.com';
exports.RS_HOST = 'http://rs.qbox.me';
exports.RSF_HOST = 'http://rsf.qbox.me';
exports.API_HOST = 'http://api.qiniu.com';
exports.RPC_TIMEOUT = 3600000; // default rpc timeout: one hour
