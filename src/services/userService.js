//cac ham xu ly email passworld bi trung lap
import db from "../models/index"
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);
let handleUserlogin = (email,password) =>{
    return new Promise(async (resolve,reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes:['email','roleId','password'],// chir hien email, roleId va password
                    raw: true
                })
                if(user)
                {
                    //let check1 = await hashUserPassword(password)
                    let check =  await bcrypt.compareSync(password, user.password); // false
                    
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage =`ok`,
                        delete user.password;// khong hien pass vi hien nguoi dung cos the lay dc pass
                        userData.user = user;
                    }
                    else{
                        userData.errCode = 3;
                        
                        console.log(check1)
                        console.log(password)
                        userData.errMessage =`worng password`;
                    }
                }
                else{
                    userData.errCode = 2;
                    
                    userData.errMessage =` user not found`;
                    
                }
               
                resolve(userData)
            }else{
                 userData.errCode = 1;
                 userData.errMessage =` Email không tồn tại`;
                 resolve(userData)
            }
        }catch(e){
            reject(e)
        }
    })
}

// hash password dung packe bcrypt
let hashUserPassword = (password) =>{
    return new Promise(async (resolve,reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            console.log(password)
           console.log(hashPassword)
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
    })
}

let getAllUser = ()=>{
    return new Promise(async (resolve,reject) =>{
        try{
            let users = db.User.findAll({raw: true,})
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let getUserInfoById = (id)=>{
}
//khi kiem tra email co hay khong roi thi kiem tra email cos trung voi data hay khong
let checkUserEmail = (userEmail) =>{
    return new Promise(async (resolve,reject) => {
        try{

            let user = await db.User.findOne({where: {email: userEmail}})
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e)
        }

    })
}
module.exports = {
    handleUserlogin: handleUserlogin,
    //checkUserEmail: checkUserEmail
}