'use strict';

// 引入包
var redis = require("redis");
var uuid = require("node-uuid");

// 瓶子类型
var type = {male:0,female:1};

/* 
 *@param {obj} bottle 漂流瓶对象
 *@param {function} callback 回调函数
 */
function throwBottle(bottle,callback) {
	// 创建redis连接
	var client = redis.createClient();
	// 生成漂流瓶id
	var bottleId = uuid.v4();
	// 漂流瓶的创建时间
	bottle.time = bottle.time || Date.now();

	// 根据漂流瓶类型选择数据库
	// male 类型存在0
	// famale 存在1
	client.select(type[bottle.type],function() {
		client.hmset(bottleId,bottle,function(err,result){
			// 扔瓶子失败
			if(err) {
				return callback({code:0,msg:"等下再试"});
			}
			// 设置生存期为一天
			// 一天内没人捡 就删除
			client.expire(bottleId,86400,function(){
				client.quit();
			});
			// 返回结果
			callback({code:1,msg:"你成功丢出一个漂流瓶！"});
		})
	});
}

/**
 *捡漂流瓶
 *@param { obj} [info] [捡瓶子的用户对象]
 *@param { function } [callback] [回调函数]
 */
function pickBottle(info,callback) {
	// 创建redis连接
	var client = redis.createClient();

	// 根据用户性别选择数据库
	// male 选择0号数据库
	// famele 选择1号数据库
	client.select(type[info.type],function() {
		// 从redis数据库中随机取出一个瓶子
		client.randomkey(function(err,bottleId) {
			// 出错了
			if(err) {
				return callback({code:0,msg:err});
			}

			// 没有取到时
			// 返回海星
			if(!bottleId) {
				return callback({code:1,msg:"你捞到一个海星^_^"});
			}

			// 取到了瓶子
			client.hgetall(bottleId,function(err,bottle) {
				// 读内容出错
				if(err) {
					return callback({code:0,msg:"这个瓶子破损了"+bottleId});
				}

				// 读瓶子内容成功
				// 从redis数据库删除此瓶子
				client.del(bottleId,function(){
					client.quit();
				});
				// 返回结果
				callback({code:1,msg:bottle});
			});
		});
	});
}

// 导出扔瓶子的方法
exports.throw = function(bottle,callback) {
	throwBottle(bottle,function(result) {
		callback(result);
	});
};

// 导出捡瓶子的方法
exports.pick = function(info,callback) {
	if(Math.random() <= 0.2) {
		return callback({code:1,msg:"你捞到一个海星~"});
	}
	pickBottle(info,function(result) {
		callback(result);
	});
}