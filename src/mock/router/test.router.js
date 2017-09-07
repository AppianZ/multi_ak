var express = require('express');
var router = express.Router();

// index.html
router.get('/', function (req, res, next) {
	res.json({
		status: 0, // 0:enabled-启动, 1:disabled-停用, 2:canceled-注销, 3:deleted-删除
		nickName: 'Tom',
		list: [{
			id: '111',
			title: '1今天我要完成10个仰卧起坐',
			isFinish: false,
		}, {
			id: '222',
			title: '2今天我要喝八杯水',
			isFinish: true,
		}]
	});
});

// index2.html
router.get('/index2', function (req, res, next) {
	res.json(require('./../test/index2').data);
});

module.exports = function (app) {
	app.use('/test', router);
};
