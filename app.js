const express = require("express");
const app = express();
const user = require('./api/user');
const db = require('./config/index').db;
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const passport = require('passport');



// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

// 接口测试
app.get("/",(req,res)=>{
    res.send('hello world');
})

// 用户接口
app.use('/user',user);

app.listen(port,()=>{
    console.log(`app is running at port ${port}`);
});