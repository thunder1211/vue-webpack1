var express = require('express')

var isOk = 1
var Mock = require('mockjs')
var apiRouter = express.Router()

//获取news数据
apiRouter.get('/news', function (req, res) {
    var data = Mock.mock({
        'categorys|1-3': [{
            'id|10': 1,
            "url": "@url",
            "domain": "@domain",
            "email": "@email",
            "paragraph": "@paragraph",
            "sentence": "@sentence"
        }]
   })
    var net = JSON.stringify(data, null, 4)
    res.json({
        ok: isOk,
        data: net
    })
})

//获取dailies数据
apiRouter.get('/dailies', function (req, res) {
    var data = Mock.mock({
        'categorys|1-3': [{
            'id|10': 1,
            "url": "@url",
            "domain": "@domain",
            "email": "@email",
            "paragraph": "@paragraph",
            "sentence": "@sentence"
        }]
    })
    var net = JSON.stringify(data)
    res.json({
        ok: isOk,
        data: net
    })
})

//登录
apiRouter.post('/login', function (req, res) {
    var msg = ''
    var data = {}
    if (req.body.id == 'admin' && req.body.pw =='admin') {
        isOk = 1
        msg = '登录成功'
    } else {
        isOk = 0
        msg = '登录失败!'
    }
    res.cookie('SESSIONID', '1234567890ABVDEFGHI', { expires: new Date(Date.now() + 60 * 60 * 1000)})
    res.json({
        ok: isOk,
        msg: msg,
        data: data
    })
})

module.exports = apiRouter