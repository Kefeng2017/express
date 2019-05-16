const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
/**
 * @desc user login,public
 * @params email,passwd
 * @port /user/login
 */
router.post('/login', (req, res) => {
    try{
        const data = req.body;
        // console.log(data);

        User.findOne({email:data.email},(err,user)=>{
            if(!user){
                return res.send({msg:'user is not exist.'});
            }else{
                bcrypt.compare(data.passwd,user.passwd,(err,result)=>{
                    if(result){
                        const rule = {
                            id:user.id,
                            name:user.name,
                            email:user.email
                        };
                        jwt.sign(rule,config.salt,{expiresIn:3600},(err,token)=>{
                            return res.send({msg:'login success',user,token:'Bearer '+token});
                        });
                    }else{
                        return res.send({msg:'login failed'});
                    }
                })
            }
        })
    }catch(e){
        res.send({msg:'error'});
    }
})


/**
 * @desc user register,public
 * @params email,name,phone,password
 * @port /user/register
 */
router.post('/register', async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        // 验证数据，把data作为参数传出去验证，此处省略。
        
        // checkout the new email if exist.
        User.findOne({email:data.email},(err,user)=>{
            if(user){
                return res.send({msg:'this email is already existed.'});
            }else{
                const newUser = new User({
                    name:data.name,
                    email:data.email,
                    phone:data.phone,
                    passwd:data.passwd
                })
                // 密码加密
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(data.passwd,salt,(err,hash)=>{
                        if(err) throw err;
                        console.log(hash);
                        newUser.passwd = hash;
                        console.log(newUser);
                        newUser.save();
                        return res.send({msg:'register success.',newUser});
                    })
                })
            }
        })
    } catch (e) {
        res.status(500).send({msg:'error'});
    }
})

/**
 * @desc token valid,private
 * @port /user/valid
 */
router.get('/valid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send({msg:'success',user:req.user});
})

module.exports = router;