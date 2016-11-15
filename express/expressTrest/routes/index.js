var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'aqua首页',cssPath:"/stylesheets/test.css"});
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' ,cssPath:"/stylesheets/test.css"});
});


router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '注册' ,cssPath:"/stylesheets/test.css"});
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: '联系我们',cssPath:"/stylesheets/test.css" });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: '关于我们',cssPath:"/stylesheets/test.css" });
});

module.exports = router;
