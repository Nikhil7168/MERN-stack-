const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin')


const HttpError = require('../utils/http-error');

const adminSignup = async(req, res, next) => {
    

    const { firstName,lastName, email, password } = req.body;    
    

    let admin;
    try {
        admin = await Admin.findOne({ email: email });

    } catch (err) {
        const error = new HttpError("signup failed ,try again later!", 500);
        return next(error);
    }
    if (admin) {
        const error = new HttpError("Email already in use!!!", 450);
        return next(error);
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (err) {
        const error = new HttpError("Password encryption failed", 303);
        return next(error);
      }
     //    user create
     const createdAdmin = new Admin({
        firstName: firstName,
        lastName : lastName,
        email: email,
        password: hashedPassword,
        role:'Admin'
        });
        try{
            await createdAdmin.save();
        }catch(err){
            console.log(err);
            const error = new HttpError("Signup failed,Please try later!!",500);
            return next(error);
        }
 
        let token;
        try {
                
                token = jwt.sign(
                    {
                     Adminid:createdAdmin.id,
                     firstName:createdAdmin.firstName,
                     email: createdAdmin.email,
                  
                    }, 
                    "adminSecretKey",
                     { expiresIn: "1h" }
                );
                
            }catch(err) 
                {
                const error = new HttpError("invalid credentials",403 );
                return next(error);
                }
                return res.json(
            {
                "Admin-id":createdAdmin.id,
                'firstName':createdAdmin.firstName,
                'email': createdAdmin.email,
                'token':token
            }
           
        )
    };



const adminLogin = async(req, res, next) => {
    const { email, password } = req.body;
    let existingAdmin
    try {
        existingAdmin = await Admin.findOne({ email: email },);
    }
    catch (err) {
        const error = new HttpError("login failed", 500)
        return next(error);
    }
    if (!existingAdmin) {
        const error = new HttpError("Account doesn't exist!!First signup", 403);
        return next(error);
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingAdmin.password);
    } catch(err) {
        const error = new HttpError("Password encryption failed", 403);
        return next(error);
    }
    if (!isValidPassword) {
        const error = new HttpError("Invalid credentials", 403);
        return next(error);
    }
        
    let token;
    try {
            
            token = jwt.sign(
                { 
                    Adminid:existingAdmin.id,
                    firstName:existingAdmin.firstName, 
                    email: existingAdmin.email,
               
                }, 
                "adminSecretKey",
                 { expiresIn: "1h" }
            );
            
        }catch(err)
            {
            const error = new HttpError("invalid credentials", 500);
            return next(error);
            }
    res.status(200).json({
            "Admin-id":existingAdmin.id,
            'firstName':existingAdmin.firstName,
            'email': existingAdmin.email,
            'token':token
        });
};
exports.adminSignup = adminSignup;
exports.adminLogin = adminLogin;