var co = require('co');
var http = require('../lib/axios');
var querystring = require('querystring');
var request = require('request');
var appId = require('../config/appid.json').appId;

var expiresTime = 3 * 24 * 60 * 60 * 1000;
function auth_url(appId, redirect_url) {
  redirect_url = encodeURIComponent(redirect_url);
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_base#wechat_redirect`
}

module.exports = function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  co(function *() {
    var token = req.cookies['x-auth-token'];
    // console.log(token,'-------token');
    if(!token) {
      // TODO 没有token 获取 url的code
      var code = req.query.code;
      if(!code) {
        //TODO 重定向到授权页面
        res.status(302).redirect(auth_url(appId, fullUrl));
        return;
      }
      //TODO 调用java获取token??
      var ret = yield http.post('/token', {
        data: `code=${code}`
      });
      //TODO res设置cookie.x-auth-token =
      res.cookie('x-auth-token',ret.data.token, {
        path: '/',
        domain: '.', // ??
        maxAge: expiresTime,
        // httpOnly: true,
      });
      //TODO 渲染页面
      req['x-auth-token'] = ret.data.token;
      next();
      return;
    }
    // TODO 有token 发送请求验证是否过期??
    var isExpired = yield http.post('/token/check',{
      data: `token=${token}`
    });

    if(isExpired.data.msg) {
      // TODO 过期 重定向
      res.status(302).redirect(auth_url(appId, fullUrl))
    } else {
      // TODO 没过期渲染页面
      req['x-auth-token'] = token;
      next();
    }

  }).catch(function(err) {
    console.error(err,' -------check.token -----error');
  });
};